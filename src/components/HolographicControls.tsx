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
    <div className="mb-6 w-full group/slider">
      <div className="flex justify-between items-end mb-2 tracking-wider">
        <span className="text-gray-400 font-orbitron text-[10px] uppercase opacity-70">{label}</span>
        <span className="text-white font-mono text-sm font-bold" style={{ textShadow: `0 0 10px ${color}` }}>
          {value.toFixed(1)}<span className="text-[10px] opacity-50 ml-0.5">{unit}</span>
        </span>
      </div>
      
      <div className="relative h-8 flex items-center group cursor-pointer">
        {/* Technical Track */}
        <div className="absolute inset-0 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm overflow-hidden flex items-center">
          {/* Tick Marks */}
          <div className="absolute inset-0 flex justify-between px-2 opacity-20 pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-px h-full bg-white/40" />
            ))}
          </div>

          {/* Progress Fill */}
          <motion.div 
            className="h-full relative overflow-hidden" 
            initial={false}
            animate={{ width: `${percentage}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ 
              background: `linear-gradient(90deg, ${color}22, ${color}cc)`,
              boxShadow: `inset -10px 0 20px -10px ${color}`
            }} 
          >
            {/* Scanning Line Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,white_2px,white_3px)] animate-[pulse_2s_infinite]" />
          </motion.div>
        </div>

        {/* Real Input Range (Functional Layer) */}
        <input 
          type="range"
          min={min}
          max={max}
          step={0.1}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 appearance-none"
          style={{ WebkitAppearance: 'none' }}
        />

        {/* Tactical Thumb (Inside the bar) */}
        <motion.div 
          className="absolute w-7 h-7 bg-white rounded-md border-2 z-10 pointer-events-none flex items-center justify-center p-1"
          style={{ 
            left: `calc(${percentage}% - 14px)`,
            borderColor: color,
            boxShadow: `0 0 15px ${color}, inset 0 0 5px ${color}`,
            marginLeft: percentage < 5 ? `${(5-percentage)*2}px` : percentage > 95 ? `-${(percentage-95)*2}px` : 0
          }}
          animate={{ x: 0 }}
        >
          <div className="w-full h-full rounded-sm opacity-80" style={{ backgroundColor: color }} />
          {/* Vertical Lens Line */}
          <div className="absolute h-full w-px bg-white/50 left-1/2 -translate-x-1/2" />
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
