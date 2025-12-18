import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  rotating?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary',
  className = '',
  type = 'button',
  rotating = false
}) => {
  const baseClasses = 'relative px-6 py-3 rounded-lg font-orbitron font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden';
  
  const variantClasses = {
    primary: 'bg-purple-accent/80 text-white hover:bg-purple-600',
    secondary: 'bg-hologram-green/80 text-space-dark hover:bg-green-500',
    outline: 'border border-hologram-blue text-hologram-blue hover:bg-hologram-blue/20',
    ghost: 'bg-transparent border-white/10 text-gray-400 hover:text-white hover:border-white/30'
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className} group`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Rotating Ring Effect */}
      {rotating && (
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[300%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,#3b82f6_360deg)] animate-spin-slow opacity-40 group-hover:opacity-100 group-hover:animate-spin transition-all duration-500" />
          <div className="absolute inset-[2px] bg-inherit rounded-[inherit] z-10" />
        </div>
      )}
      
      <span className="relative z-20 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};
