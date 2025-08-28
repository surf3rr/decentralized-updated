import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Briefcase } from 'lucide-react';

interface DashboardStatsProps {
  userAddress: string;
}

interface StatCard {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ElementType;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ userAddress: _userAddress }) => {
  const stats: StatCard[] = [
    {
      title: "TOTAL PORTFOLIO",
      value: "$124,297",
      change: "+57.03%",
      isPositive: true,
      icon: DollarSign
    },
    {
      title: "APY",
      value: "8.7%",
      change: "+4.17%",
      isPositive: true,
      icon: TrendingUp
    },
    {
      title: "TOTAL REWARDS",
      value: "$7,307",
      change: "+14.58%",
      isPositive: true,
      icon: Briefcase
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="relative overflow-hidden"
        >
          {/* Card Background with Orange Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-orange-600/15 to-orange-700/20 backdrop-blur-xl rounded-2xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-2xl"></div>
          
          {/* Content */}
          <div className="relative z-10 p-6 border border-orange-500/20 rounded-2xl backdrop-blur-xl">
            {/* Header with Icon */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-orange-300/80 uppercase tracking-wider">
                {stat.title}
              </span>
              <stat.icon className="w-5 h-5 text-orange-400" />
            </div>

            {/* Main Value */}
            <div className="mb-2">
              <span className="text-3xl font-bold text-white">
                {stat.value}
              </span>
            </div>

            {/* Change Indicator */}
            <div className="flex items-center space-x-1">
              {stat.isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400" />
              )}
              <span className={`text-sm font-medium ${
                stat.isPositive ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.change}
              </span>
            </div>

            {/* Mini Chart Simulation */}
            <div className="mt-4 h-8 flex items-end space-x-1">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: Math.random() * 32 + 4 }}
                  transition={{ delay: 0.5 + i * 0.05, duration: 0.3 }}
                  className={`w-1 rounded-t-sm ${
                    stat.isPositive ? 'bg-green-400/60' : 'bg-orange-400/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
