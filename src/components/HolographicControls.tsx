import React from 'react';
import { motion } from 'framer-motion';

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  color?: string;
  unit?: string;
}

export const HolographicSlider: React.FC<SliderProps> = ({ 
  label, 
  value, 
  onChange, 
  min = 0, 
  max = 100,
  color = '#3b82f6',
  unit = '%'
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="mb-6 w-full">
      <div className="flex justify-between items-end mb-2">
        <span className="text-gray-400 font-orbitron text-xs tracking-widest">{label}</span>
        <span className="text-white font-mono text-sm" style={{ color }}>{value.toFixed(1)}{unit}</span>
      </div>
      
      <div className="relative h-6 flex items-center group cursor-pointer">
        {/* Track Background */}
        <div className="absolute inset-0 bg-white/5 rounded-full border border-white/5 overflow-hidden">
          {/* Progress Fill with Gradient */}
          <div 
            className="h-full transition-all duration-300" 
            style={{ 
              width: `${percentage}%`,
              background: `linear-gradient(to right, transparent, ${color})`,
              boxShadow: `0 0 15px ${color}44`
            }} 
          />
        </div>

        {/* Real Input Range (Invisible but Functional) */}
        <input 
          type="range"
          min={min}
          max={max}
          step={0.1}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
        />

        {/* Visual Thumb */}
        <motion.div 
          className="absolute w-8 h-8 bg-white rounded-full border-2 shadow-[0_0_15px_rgba(255,255,255,0.5)] z-0 pointer-events-none flex items-center justify-center transform -translate-y-1/2"
          style={{ 
            left: `calc(${percentage}% - 16px)`,
            borderColor: color,
            top: '50%'
          }}
          whileHover={{ scale: 1.1 }}
          animate={{ x: 0 }}
        >
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
        </motion.div>
      </div>
    </div>
  );
};

interface ToggleProps {
  label: string;
  active: boolean;
  onToggle: (active: boolean) => void;
  color?: string;
}

export const HolographicToggle: React.FC<ToggleProps> = ({ 
  label, 
  active, 
  onToggle,
  color = '#10b981'
}) => {
  return (
    <div className="flex items-center justify-between p-4 glass-card rounded-lg border border-white/5 group hover:border-white/10 transition-all">
      <span className="text-gray-400 font-orbitron text-xs tracking-widest">{label}</span>
      
      <button 
        onClick={() => onToggle(!active)}
        className="relative w-14 h-7 rounded-full transition-all duration-300 overflow-hidden"
        style={{ 
          backgroundColor: active ? `${color}22` : 'rgba(255,255,255,0.05)',
          border: `1px solid ${active ? color : 'rgba(255,255,255,0.1)'}`
        }}
      >
        <motion.div 
          className="absolute top-0.5 w-5.5 h-5.5 rounded-full shadow-lg"
          animate={{ 
            left: active ? 'calc(100% - 24px)' : '4px',
            backgroundColor: active ? color : '#4b5563',
            boxShadow: active ? `0 0 10px ${color}` : 'none'
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
        <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
          <span className={`text-[8px] font-bold ${active ? 'opacity-0' : 'opacity-40'} text-white`}>OFF</span>
          <span className={`text-[8px] font-bold ${active ? 'opacity-100' : 'opacity-0'} text-white transition-opacity`}>ON</span>
        </div>
      </button>
    </div>
  );
};

interface VerticalBarProps {
  value: number;
  label: string;
  color?: string;
}

export const VerticalEqualizer: React.FC<VerticalBarProps> = ({ value, label, color = '#ec4899' }) => {
  return (
    <div className="flex flex-col items-center gap-2 h-48">
      <div className="relative w-8 flex-1 bg-white/5 rounded-full border border-white/5 overflow-hidden flex flex-col justify-end">
        <motion.div 
          className="w-full rounded-t-full"
          initial={{ height: 0 }}
          animate={{ height: `${value}%` }}
          style={{ 
            background: `linear-gradient(to top, transparent, ${color})`,
            boxShadow: `0 0 15px ${color}33`
          }}
        />
        {/* Glowing cap */}
        <div 
          className="absolute w-6 h-6 bg-white rounded-full border-2 transform -translate-x-1/2 left-1/2 z-10"
          style={{ 
            bottom: `calc(${value}% - 12px)`,
            borderColor: color,
            boxShadow: `0 0 10px ${color}`
          }}
        >
          <div className="absolute inset-1 rounded-full bg-white opacity-50 animate-pulse" />
        </div>
      </div>
      <span className="text-[10px] text-gray-500 font-orbitron rotate-90 translate-y-4 whitespace-nowrap">{label}</span>
    </div>
  );
};
