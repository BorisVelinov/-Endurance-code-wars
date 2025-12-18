import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = true, style, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className={`glass-card p-6 ${className} ${onClick ? 'cursor-pointer' : ''}`}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { scale: 1.02, boxShadow: '0 0 20px rgba(109, 40, 217, 0.3)' } : {}}
    >
      {children}
    </motion.div>
  );
};
