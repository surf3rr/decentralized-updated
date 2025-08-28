;; title: freelance-escrow
;; version: 1.0.0
;; summary: A decentralized freelance marketplace with escrow functionality
;; description: Built on Stacks blockchain using Clarity v2

;; constants
(define-constant ERR-NOT-FOUND (err u404))
(define-constant ERR-UNAUTHORIZED (err u401))
(define-constant ERR-INVALID-STATUS (err u400))
(define-constant ERR-INSUFFICIENT-FUNDS (err u402))
(define-constant ERR-ALREADY-EXISTS (err u409))
(define-constant ERR-DEADLINE-PASSED (err u410))

;; project status constants
(define-constant STATUS-OPEN u0)
(define-constant STATUS-ASSIGNED u1)
(define-constant STATUS-IN-PROGRESS u2)
(define-constant STATUS-SUBMITTED u3)
(define-constant STATUS-COMPLETED u4)
(define-constant STATUS-DISPUTED u5)
(define-constant STATUS-CANCELLED u6)

;; data vars
(define-data-var project-counter uint u0)

;; data maps

;; Project data structure
(define-map projects
  { project-id: uint }
  {
    client: principal,
    freelancer: (optional principal),
    title: (string-ascii 100),
    description: (string-ascii 500),
    budget: uint,
    deadline: uint,
    status: uint,
    created-at: uint,
    completed-at: (optional uint)
  }
)

;; Escrow balances
(define-map escrow-balances
  { project-id: uint }
  { amount: uint }
)

;; Dispute data
(define-map disputes
  { project-id: uint }
  {
    reason: (string-ascii 300),
    created-by: principal,
    created-at: uint
  }
)

;; User ratings
(define-map user-ratings
  { user: principal }
  {
    total-rating: uint,
    completed-projects: uint
  }
)

;; private functions

(define-private (is-project-client (project-id uint) (caller principal))
  (match (map-get? projects { project-id: project-id })
    project (is-eq (get client project) caller)
    false
  )
)

(define-private (is-project-freelancer (project-id uint) (caller principal))
  (match (map-get? projects { project-id: project-id })
    project (match (get freelancer project)
      freelancer-principal (is-eq freelancer-principal caller)
      false
    )
    false
  )
)

(define-private (is-project-participant (project-id uint) (caller principal))
  (or 
    (is-project-client project-id caller)
    (is-project-freelancer project-id caller)
  )
)

;; Update user rating (private helper)
(define-private (update-user-rating (user principal))
  (let
    (
      (current-rating (default-to { total-rating: u0, completed-projects: u0 }
        (map-get? user-ratings { user: user })))
    )
    (map-set user-ratings
      { user: user }
      {
        total-rating: (+ (get total-rating current-rating) u5), ;; 5-star rating for now
        completed-projects: (+ (get completed-projects current-rating) u1)
      }
    )
    (ok true)
  )
)

;; public functions

;; Create a new project
(define-public (create-project 
    (title (string-ascii 100))
    (description (string-ascii 500))
    (budget uint)
    (deadline uint))
  (let
    (
      (project-id (+ (var-get project-counter) u1))
      (current-time stacks-block-height)
    )
    (asserts! (> budget u0) ERR-INSUFFICIENT-FUNDS)
    (asserts! (> deadline current-time) ERR-DEADLINE-PASSED)
    (try! (stx-transfer? budget tx-sender (as-contract tx-sender)))
    
    (map-set projects
      { project-id: project-id }
      {
        client: tx-sender,
        freelancer: none,
        title: title,
        description: description,
        budget: budget,
        deadline: deadline,
        status: STATUS-OPEN,
        created-at: current-time,
        completed-at: none
      }
    )
    
    (map-set escrow-balances
      { project-id: project-id }
      { amount: budget }
    )
    
    (var-set project-counter project-id)
    (ok project-id)
  )
)

;; Accept a project as a freelancer
(define-public (accept-project (project-id uint) (freelancer principal))
  (let
    (
      (project (unwrap! (map-get? projects { project-id: project-id }) ERR-NOT-FOUND))
    )
    (asserts! (is-eq (get client project) tx-sender) ERR-UNAUTHORIZED)
    (asserts! (is-eq (get status project) STATUS-OPEN) ERR-INVALID-STATUS)
    (asserts! (> (get deadline project) stacks-block-height) ERR-DEADLINE-PASSED)
    
    (map-set projects
      { project-id: project-id }
      (merge project {
        freelancer: (some freelancer),
        status: STATUS-ASSIGNED
      })
    )
    
    (ok true)
  )
)

;; Start working on a project
(define-public (start-work (project-id uint))
  (let
    (
      (project (unwrap! (map-get? projects { project-id: project-id }) ERR-NOT-FOUND))
    )
    (asserts! (is-project-freelancer project-id tx-sender) ERR-UNAUTHORIZED)
    (asserts! (is-eq (get status project) STATUS-ASSIGNED) ERR-INVALID-STATUS)
    
    (map-set projects
      { project-id: project-id }
      (merge project { status: STATUS-IN-PROGRESS })
    )
    
    (ok true)
  )
)

;; Submit completed work
(define-public (submit-work (project-id uint))
  (let
    (
      (project (unwrap! (map-get? projects { project-id: project-id }) ERR-NOT-FOUND))
    )
    (asserts! (is-project-freelancer project-id tx-sender) ERR-UNAUTHORIZED)
    (asserts! (is-eq (get status project) STATUS-IN-PROGRESS) ERR-INVALID-STATUS)
    
    (map-set projects
      { project-id: project-id }
      (merge project { status: STATUS-SUBMITTED })
    )
    
    (ok true)
  )
)

;; Approve work and release payment
(define-public (approve-work (project-id uint))
  (let
    (
      (project (unwrap! (map-get? projects { project-id: project-id }) ERR-NOT-FOUND))
      (escrow (unwrap! (map-get? escrow-balances { project-id: project-id }) ERR-NOT-FOUND))
      (freelancer (unwrap! (get freelancer project) ERR-NOT-FOUND))
    )
    (asserts! (is-project-client project-id tx-sender) ERR-UNAUTHORIZED)
    (asserts! (is-eq (get status project) STATUS-SUBMITTED) ERR-INVALID-STATUS)
    
    ;; Transfer payment to freelancer
    (try! (as-contract (stx-transfer? (get amount escrow) tx-sender freelancer)))
    
    ;; Update project status
    (map-set projects
      { project-id: project-id }
      (merge project {
        status: STATUS-COMPLETED,
        completed-at: (some stacks-block-height)
      })
    )
    
    ;; Remove from escrow
    (map-delete escrow-balances { project-id: project-id })
    
    ;; Update ratings
    (unwrap-panic (update-user-rating freelancer))
    
    (ok true)
  )
)

;; Create a dispute
(define-public (dispute-project (project-id uint) (reason (string-ascii 300)))
  (let
    (
      (project (unwrap! (map-get? projects { project-id: project-id }) ERR-NOT-FOUND))
    )
    (asserts! (is-project-participant project-id tx-sender) ERR-UNAUTHORIZED)
    (asserts! (or 
      (is-eq (get status project) STATUS-IN-PROGRESS)
      (is-eq (get status project) STATUS-SUBMITTED)
    ) ERR-INVALID-STATUS)
    
    (map-set disputes
      { project-id: project-id }
      {
        reason: reason,
        created-by: tx-sender,
        created-at: stacks-block-height
      }
    )
    
    (map-set projects
      { project-id: project-id }
      (merge project { status: STATUS-DISPUTED })
    )
    
    (ok true)
  )
)

;; Resolve dispute (admin function)
(define-public (resolve-dispute (project-id uint) (award-to-freelancer bool))
  (let
    (
      (project (unwrap! (map-get? projects { project-id: project-id }) ERR-NOT-FOUND))
      (escrow (unwrap! (map-get? escrow-balances { project-id: project-id }) ERR-NOT-FOUND))
      (freelancer (unwrap! (get freelancer project) ERR-NOT-FOUND))
      (client (get client project))
    )
    ;; For now, anyone can resolve disputes. In production, this should be restricted to admin/arbitrators
    (asserts! (is-eq (get status project) STATUS-DISPUTED) ERR-INVALID-STATUS)
    
    (if award-to-freelancer
      ;; Award to freelancer
      (try! (as-contract (stx-transfer? (get amount escrow) tx-sender freelancer)))
      ;; Refund to client
      (try! (as-contract (stx-transfer? (get amount escrow) tx-sender client)))
    )
    
    (map-set projects
      { project-id: project-id }
      (merge project {
        status: (if award-to-freelancer STATUS-COMPLETED STATUS-CANCELLED),
        completed-at: (some stacks-block-height)
      })
    )
    
    (map-delete escrow-balances { project-id: project-id })
    (map-delete disputes { project-id: project-id })
    
    (if award-to-freelancer
      (unwrap-panic (update-user-rating freelancer))
      true
    )
    (ok true)
  )
)

;; Cancel project (only by client before assignment)
(define-public (cancel-project (project-id uint))
  (let
    (
      (project (unwrap! (map-get? projects { project-id: project-id }) ERR-NOT-FOUND))
      (escrow (unwrap! (map-get? escrow-balances { project-id: project-id }) ERR-NOT-FOUND))
    )
    (asserts! (is-project-client project-id tx-sender) ERR-UNAUTHORIZED)
    (asserts! (is-eq (get status project) STATUS-OPEN) ERR-INVALID-STATUS)
    
    ;; Refund to client
    (try! (as-contract (stx-transfer? (get amount escrow) tx-sender tx-sender)))
    
    (map-set projects
      { project-id: project-id }
      (merge project { status: STATUS-CANCELLED })
    )
    
    (map-delete escrow-balances { project-id: project-id })
    
    (ok true)
  )
)

;; read only functions

;; Get project details
(define-read-only (get-project (project-id uint))
  (map-get? projects { project-id: project-id })
)

;; Get project escrow balance
(define-read-only (get-project-escrow (project-id uint))
  (map-get? escrow-balances { project-id: project-id })
)

;; Get dispute details
(define-read-only (get-dispute (project-id uint))
  (map-get? disputes { project-id: project-id })
)

;; Get user rating
(define-read-only (get-user-rating (user principal))
  (map-get? user-ratings { user: user })
)

;; Get current project counter
(define-read-only (get-project-counter)
  (var-get project-counter)
)

;; Get project status
(define-read-only (get-project-status (project-id uint))
  (match (map-get? projects { project-id: project-id })
    project (ok (get status project))
    ERR-NOT-FOUND
  )
)

