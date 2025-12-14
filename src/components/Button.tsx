import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary',
  className = '',
  type = 'button'
}) => {
  const baseClasses = 'px-6 py-3 rounded-lg font-orbitron font-semibold uppercase tracking-wider transition-all duration-300';
  
  const variantClasses = {
    primary: 'bg-purple-accent text-white glow-button hover:bg-purple-700',
    secondary: 'bg-hologram-green text-space-dark glow-button hover:bg-green-600',
    outline: 'border-2 border-purple-accent text-purple-accent glow-button hover:bg-purple-accent hover:text-white'
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};
