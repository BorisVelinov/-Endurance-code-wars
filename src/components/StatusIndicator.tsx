import React from 'react';
import { motion } from 'framer-motion';

interface StatusIndicatorProps {
  status: 'operational' | 'warning' | 'critical';
  label: string;
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, label, className = '' }) => {
  const statusClasses = {
    operational: 'status-operational',
    warning: 'status-warning',
    critical: 'status-critical'
  };

  const statusText = {
    operational: 'ОПЕРАТИВЕН',
    warning: 'ВНИМАНИЕ',
    critical: 'КРИТИЧНО'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.div
        className={`status-indicator ${statusClasses[status]}`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.7, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className={`font-orbitron font-semibold ${
          status === 'operational' ? 'text-hologram-green' :
          status === 'warning' ? 'text-warning-orange' :
          'text-red-500'
        }`}>
          {statusText[status]}
        </p>
      </div>
    </div>
  );
};
