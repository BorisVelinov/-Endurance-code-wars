import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Card } from '../components/Card';
import { HolographicSlider, HolographicToggle } from '../components/HolographicControls';
import { Button } from '../components/Button';

export const NavigationSystem: React.FC = () => {
  const [coordinates, setCoordinates] = useState({ x: 1247.89, y: -3456.12, z: 8901.34 });
  const [thrusterPower, setThrusterPower] = useState(45);
  const [stabilization, setStabilization] = useState(true);
  const [activeIgnition, setActiveIgnition] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCoordinates(prev => ({
        x: prev.x + (Math.random() - 0.5) * (activeIgnition ? 0.5 : 0.05),
        y: prev.y + (Math.random() - 0.5) * (activeIgnition ? 0.5 : 0.05),
        z: prev.z + (Math.random() - 0.5) * (activeIgnition ? 0.5 : 0.05)
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [activeIgnition]);

  return (
    <PageLayout>
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-1 border border-hologram-green/30 rounded-full mb-4 bg-hologram-green/5">
            <span className="text-hologram-green font-orbitron text-[10px] tracking-[0.4em] uppercase">NAV.COMPUTER_LINK_v3.1</span>
          </div>
          <h1 className="text-5xl font-orbitron font-bold mb-4 text-white">
            Навигационна Система
          </h1>
          <div className="subtitle-readout">
            Celestial Mechanics & Trajectory Projection :: Bridge Console
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Controls Panel */}
          <Card className="lg:col-span-2">
            <h2 className="text-2xl font-orbitron font-bold mb-8 text-hologram-green flex items-center gap-3">
               <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
               УПРАВЛЕНИЕ НА ТЯГАТА
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
               <div className="space-y-6">
                 <HolographicSlider 
                    label="МОЩНОСТ НА ДВИГАТЕЛИТЕ" 
                    value={thrusterPower} 
                    onChange={setThrusterPower} 
                    color="#6d28d9"
                 />
                 <HolographicToggle 
                    label="АВТО-СТАБИЛИЗАЦИЯ" 
                    active={stabilization} 
                    onToggle={setStabilization}
                    color="#10b981"
                 />
               </div>
               
               <div className="flex flex-col justify-center items-center gap-4 border-l border-white/5 pl-8">
                  <div className="text-[10px] font-orbitron text-gray-400 tracking-tighter uppercase mb-2">Manual Directional Jets</div>
                  <div className="grid grid-cols-3 gap-2">
                     <div />
                     <Button rotating className="p-3 !px-4" variant="outline">⬆️</Button>
                     <div />
                     <Button rotating className="p-3 !px-4" variant="outline">⬅️</Button>
                     <Button rotating className="p-3 !px-4" variant="outline">CORE</Button>
                     <Button rotating className="p-3 !px-4" variant="outline">➡️</Button>
                     <div />
                     <Button rotating className="p-3 !px-4" variant="outline">⬇️</Button>
                     <div />
                  </div>
               </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex gap-4">
              <Button 
                variant="secondary" 
                rotating={activeIgnition} 
                className="flex-1"
                onClick={() => setActiveIgnition(!activeIgnition)}
              >
                {activeIgnition ? 'ИЗКЛЮЧИ ТЯГАТА' : 'АКТИВИРАЙ ДВИГАТЕЛИ'}
              </Button>
              <Button variant="outline" className="flex-1">ИЗЧИСЛИ ТРАЕКТОРИЯ</Button>
            </div>
          </Card>

          {/* Local Coordinates */}
          <Card>
            <h2 className="text-xl font-orbitron font-bold mb-6 text-blue-400 tracking-widest uppercase">Telemetry</h2>
            <div className="space-y-6">
               {Object.entries(coordinates).map(([axis, val]) => (
                 <div key={axis} className="relative py-2 border-b border-white/5">
                    <span className="absolute -left-2 top-0 text-[10px] font-orbitron text-gray-600">{axis.toUpperCase()} AXIS</span>
                    <div className="text-2xl font-mono text-white flex justify-between">
                       <span>{Math.floor(val)}</span>
                       <span className="text-blue-400 opacity-50">.{(val % 1).toFixed(2).split('.')[1]}</span>
                    </div>
                 </div>
               ))}
            </div>
            <div className="mt-8 text-center bg-space-dark/40 p-3 rounded-lg border border-white/5">
               <div className="text-[10px] text-gray-500 font-orbitron uppercase mb-1">Target System</div>
               <div className="text-hologram-green font-orbitron text-xs">PANTAGRUEL SYSTEM</div>
            </div>
          </Card>
        </div>

        {/* Navigation Visualizer */}
        <Card className="mb-12 !p-2 overflow-hidden bg-black/40 border-blue-500/20">
          <div className="aspect-[21/9] relative bg-gradient-to-br from-space-dark via-deep-blue to-purple-accent/10">
             {/* Star Field */}
             {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-white rounded-full"
                  style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                  animate={{ opacity: [0.2, 0.8, 0.2] }}
                  transition={{ duration: 1 + Math.random() * 2, repeat: Infinity }}
                />
              ))}

              {/* Grid Lines */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" 
                   style={{ background: 'linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
              
              {/* Ship Indicator */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                 <div className="relative">
                    <div className="absolute inset-0 w-32 h-32 -m-8 border border-blue-500/30 rounded-full animate-spin-slow" />
                    <div className="absolute inset-0 w-48 h-48 -m-16 border border-blue-500/10 rounded-full animate-reverse-spin-slow" />
                    <div className="w-16 h-16 bg-blue-500/10 backdrop-blur-sm border-2 border-blue-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                       <div className="w-4 h-4 bg-white rounded-sm rotate-45" />
                    </div>
                 </div>
              </div>

              {/* HUD Overlays */}
              <div className="absolute top-4 left-4 font-mono text-[10px] text-blue-400 space-y-1">
                 <div>FLT MODE: {activeIgnition ? 'IMPULSE' : 'INERTIAL'}</div>
                 <div>VELOCITY: {activeIgnition ? '1,245.89' : '0.55'} c</div>
              </div>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
};
