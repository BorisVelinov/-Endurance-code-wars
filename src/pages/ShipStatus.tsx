import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Card } from '../components/Card';
import { Gauge } from '../components/Gauge';
import { SpaceshipScene } from '../components/SpaceshipScene';
import { HolographicSlider, HolographicToggle } from '../components/HolographicControls';
import { Button } from '../components/Button';

export const ShipStatus: React.FC = () => {
  const [rotationSpeed, setRotationSpeed] = useState(0.5);
  const [gravityControl, setGravityControl] = useState(true);
  const [isDiagnostic, setIsDiagnostic] = useState(false);

  const systemStatuses = [
    { name: 'Двигателна Система', status: 'operational' as const, value: 98 },
    { name: 'Навигация', status: 'operational' as const, value: 100 },
    { name: 'Жизнена Поддръжка', status: 'operational' as const, value: 95 },
    { name: 'Комуникации', status: 'warning' as const, value: 78 },
    { name: 'Защитни Щитове', status: 'operational' as const, value: 92 },
    { name: 'Енергийна Система', status: 'operational' as const, value: 88 },
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-1 border border-hologram-green/30 rounded-full mb-4 bg-hologram-green/5">
            <span className="text-hologram-green font-orbitron text-[10px] tracking-[0.4em] uppercase">SYSTEM.STATUS_v2.0</span>
          </div>
          <h1 className="text-5xl font-orbitron font-bold mb-4 text-white">
            Статус на Кораба
          </h1>
          <div className="subtitle-readout">
            Live Synchronized Telemetry :: Endurance Core
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-3 h-[600px] w-full glass-card rounded-lg overflow-hidden border border-white/5 relative">
            <SpaceshipScene />
          </div>
          
          <div className="space-y-6">
             <Card className="flex flex-col gap-6">
                <h3 className="text-sm font-orbitron font-bold text-blue-400">КОРАБНИ КОНТРОЛИ</h3>
                <HolographicSlider 
                  label="СКОРОСТ НА ВЪРТЕНЕ" 
                  value={rotationSpeed * 100} 
                  onChange={(v) => setRotationSpeed(v / 100)} 
                  color="#3b82f6"
                />
                <HolographicToggle 
                  label="ГРАВИТАЦИОНЕН КОНТРОЛ" 
                  active={gravityControl} 
                  onToggle={setGravityControl}
                />
                <div className="pt-4 mt-auto">
                   <Button 
                      variant="secondary" 
                      className="w-full text-xs" 
                      rotating={isDiagnostic}
                      onClick={() => {
                        setIsDiagnostic(true);
                        setTimeout(() => setIsDiagnostic(false), 3000);
                      }}
                   >
                     {isDiagnostic ? 'ДИАГНОСТИКА...' : 'ПЪЛНА ДИАГНОСТИКА'}
                   </Button>
                </div>
             </Card>
             
             <Card className="bg-space-dark/50 p-4">
                <div className="text-[10px] font-orbitron text-gray-500 mb-2 uppercase">Core Power Distribution</div>
                <div className="flex gap-2 h-20 items-end justify-between px-4">
                   <div className="w-2 bg-hologram-green h-[80%] rounded-full shadow-[0_0_10px_#10b981]" />
                   <div className="w-2 bg-hologram-green h-[95%] rounded-full shadow-[0_0_10px_#10b981]" />
                   <div className="w-2 bg-blue-500 h-[60%] rounded-full shadow-[0_0_10px_#3b82f6]" />
                   <div className="w-2 bg-purple-500 h-[40%] rounded-full shadow-[0_0_10px_#6d28d9]" />
                </div>
             </Card>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-orbitron font-bold mb-10 text-center text-white/80 tracking-[0.2em] uppercase">
            Оперативен Статус на Модулите
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {systemStatuses.map((system, index) => (
              <motion.div
                key={system.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Card className="text-center p-4">
                  <Gauge
                    value={system.value}
                    max={100}
                    label={system.name}
                    unit="%"
                    status={system.status}
                    size={90}
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <h3 className="text-2xl font-orbitron font-bold mb-6 text-hologram-green">ОСНОВНИ РЕСУРСИ</h3>
            <div className="space-y-6">
               {[
                 { label: 'ГОРИВО (ISOTOPE)', val: 87, color: '#10b981' },
                 { label: 'КИСЛОРОД (O2)', val: 95, color: '#3b82f6' },
                 { label: 'ВОДА (H2O)', val: 82, color: '#60a5fa' },
                 { label: 'ПРОВИЗИИ', val: 76, color: '#f59e0b' },
               ].map((res, i) => (
                 <div key={i}>
                    <div className="flex justify-between items-end mb-1">
                       <span className="text-[10px] font-orbitron text-gray-400">{res.label}</span>
                       <span className="font-mono text-white text-sm">{res.val}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                       <motion.div 
                          className="h-full" 
                          initial={{ width: 0 }} 
                          animate={{ width: `${res.val}%` }} 
                          style={{ backgroundColor: res.color, boxShadow: `0 0 10px ${res.color}` }} 
                       />
                    </div>
                 </div>
               ))}
            </div>
          </Card>
          
          <Card className="flex flex-col justify-center items-center relative overflow-hidden">
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent" />
             <div className="text-hologram-green font-orbitron text-xs mb-2 tracking-widest">SYSTEM INTEGRITY</div>
             <div className="text-6xl font-orbitron font-bold text-white mb-2">94<span className="text-2xl opacity-50">%</span></div>
             <div className="text-gray-500 font-rajdhani text-sm uppercase">All modules pressurized</div>
             <div className="mt-8 flex gap-2">
                {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
                   <div key={i} className={`w-1 h-4 rounded-full ${i < 11 ? 'bg-hologram-green' : 'bg-gray-700'} shadow-[0_0_5px_currentColor]`} />
                ))}
             </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};
