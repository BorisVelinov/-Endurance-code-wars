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
  const baseClasses = 'relative px-6 py-2.5 rounded-lg font-orbitron text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden border';
  
  const variantClasses = {
    primary: 'bg-purple-accent/20 border-purple-accent/50 text-white hover:bg-purple-accent/40 hover:border-purple-accent',
    secondary: 'bg-hologram-green/10 border-hologram-green/40 text-hologram-green hover:bg-hologram-green/30 hover:border-hologram-green',
    outline: 'bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/40',
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
      {/* Precision Rotating Ring Effect */}
      {rotating && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,#60a5fa_360deg)] animate-spin-slow opacity-30 group-hover:opacity-100 group-hover:animate-spin transition-all duration-500" />
          <div className="absolute inset-[1.5px] bg-[#0a0f1a] rounded-[7px] z-10" />
        </div>
      )}
      
      {/* Background Glow during rotation */}
      {rotating && (
        <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors duration-500" />
      )}
      
      <span className="relative z-20 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};
