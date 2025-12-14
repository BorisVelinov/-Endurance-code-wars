import React from 'react';
import { motion } from 'framer-motion';

interface GaugeProps {
  value: number;
  max?: number;
  label: string;
  unit: string;
  status?: 'operational' | 'warning' | 'critical';
  size?: number;
}

export const Gauge: React.FC<GaugeProps> = ({ 
  value, 
  max = 100, 
  label, 
  unit,
  status = 'operational',
  size = 120
}) => {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const statusColors = {
    operational: '#10b981',
    warning: '#f59e0b',
    critical: '#ef4444'
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r="45"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r="45"
            stroke={statusColors[status]}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              filter: `drop-shadow(0 0 8px ${statusColors[status]})`
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-orbitron font-bold">{value}</span>
          <span className="text-xs text-gray-400">{unit}</span>
        </div>
      </div>
      <p className="text-sm text-center font-rajdhani">{label}</p>
    </div>
  );
};
