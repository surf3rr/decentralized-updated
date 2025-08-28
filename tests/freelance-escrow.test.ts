/**
 * Freelance Escrow Contract Test Documentation
 * 
 * This contract implements a decentralized freelance marketplace with escrow functionality.
 * 
 * Key Features:
 * - Project creation with STX escrow
 * - Freelancer assignment by clients
 * - Work submission and approval workflow
 * - Dispute resolution system
 * - User rating system
 * 
 * To test the contract:
 * 1. Run 'clarinet check' to validate syntax
 * 2. Run 'clarinet console' for interactive testing
 * 3. Use 'clarinet devnet start' for full blockchain testing
 * 
 * Example manual tests in Clarinet console:
 * 
 * ;; Create a project
 * (contract-call? .freelance-escrow create-project 
 *   "Web Development" 
 *   "Build a React website" 
 *   u1000000 
 *   u1000)
 * 
 * ;; Accept project (as client)
 * (contract-call? .freelance-escrow accept-project u1 'ST1J4G6RR643BCG8G8SR6M2D9Z9KXT2NJDRK3FBTK)
 * 
 * ;; Submit work (as freelancer)
 * (contract-call? .freelance-escrow submit-work u1)
 * 
 * ;; Approve work (as client)
 * (contract-call? .freelance-escrow approve-work u1)
 * 
 * ;; Get project details
 * (contract-call? .freelance-escrow get-project u1)
 */

export const contractInfo = {
  name: "freelance-escrow",
  functions: {
    public: [
      "create-project",
      "accept-project", 
      "start-work",
      "submit-work",
      "approve-work",
      "dispute-project",
      "resolve-dispute",
      "cancel-project"
    ],
    readOnly: [
      "get-project",
      "get-project-escrow",
      "get-dispute", 
      "get-user-rating",
      "get-project-counter",
      "get-project-status"
    ]
  }
};
