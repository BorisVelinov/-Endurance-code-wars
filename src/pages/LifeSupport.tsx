import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Card } from '../components/Card';
import { Gauge } from '../components/Gauge';
import { HolographicSlider, HolographicToggle, VerticalEqualizer } from '../components/HolographicControls';
import { Button } from '../components/Button';

export const LifeSupport: React.FC = () => {
  const [oxygenLevel, setOxygenLevel] = useState(95);
  const [temperature, setTemperature] = useState(21);
  const [humidity, setHumidity] = useState(45);
  
  // New interactive states
  const [scrubberActive, setScrubberActive] = useState(true);
  const [ventilationMode, setVentilationMode] = useState(true);
  const [emergencyO2, setEmergencyO2] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Slow drift if no user input
      setOxygenLevel(prev => Math.max(90, Math.min(100, prev + (Math.random() - 0.5) * 0.1)));
      setTemperature(prev => Math.max(18, Math.min(24, prev + (Math.random() - 0.5) * 0.05)));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <PageLayout>
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-1 border border-hologram-green/30 rounded-full mb-4 bg-hologram-green/5">
            <span className="text-hologram-green font-orbitron text-xs tracking-[0.3em]">ATMOSPHERE CONTROL UNIT</span>
          </div>
          <h1 className="text-5xl font-orbitron font-bold mb-4 text-glow">
            Жизнена Поддръжка
          </h1>
          <p className="text-xl text-gray-300 font-rajdhani">
            Мониторинг и интерактивен контрол на атмосферните условия
          </p>
        </motion.div>

        {/* Control Console */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Controls */}
          <Card className="lg:col-span-2">
            <h2 className="text-2xl font-orbitron font-bold mb-8 text-hologram-green flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-hologram-green animate-pulse" />
              КОНТРОЛЕН ПАНЕЛ
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              <HolographicSlider 
                label="НИВО НА КИСЛОРОД" 
                value={oxygenLevel} 
                onChange={setOxygenLevel} 
                color="#10b981"
              />
              <HolographicSlider 
                label="ТЕМПЕРАТУРА СЕКТОР" 
                value={temperature} 
                onChange={setTemperature} 
                min={15} 
                max={30} 
                unit="°C"
                color="#f59e0b"
              />
              <HolographicSlider 
                label="ВЛАЖНОСТ" 
                value={humidity} 
                onChange={setHumidity} 
                color="#3b82f6"
              />
              
              <div className="space-y-4 pt-2">
                <HolographicToggle 
                  label="CO2 СКРУБЕР" 
                  active={scrubberActive} 
                  onToggle={setScrubberActive}
                />
                <HolographicToggle 
                  label="ВЕНТИЛАЦИЯ" 
                  active={ventilationMode} 
                  onToggle={setVentilationMode}
                  color="#3b82f6"
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex gap-4">
              <Button variant="secondary" rotating className="flex-1">ОПТИМИЗИРАЙ ПОТОКА</Button>
              <Button variant="outline" className="flex-1" rotating={emergencyO2} onClick={() => setEmergencyO2(!emergencyO2)}>
                {emergencyO2 ? 'АВАРИЕН РЕЖИМ: ВКЛ' : 'АВАРИЕН РЕЖИМ'}
              </Button>
            </div>
          </Card>

          {/* Quick Stats / Visualizer */}
          <Card>
            <h2 className="text-xl font-orbitron font-bold mb-6 text-blue-400">СЪСТАВ НА ГАЗОВЕТЕ</h2>
            <div className="flex justify-around items-end h-64 pb-8">
               <VerticalEqualizer value={78} label="N2 (78%)" color="#3b82f6" />
               <VerticalEqualizer value={21} label="O2 (21%)" color="#10b981" />
               <VerticalEqualizer value={15} label="COR (0.4%)" color="#f59e0b" />
               <VerticalEqualizer value={8} label="OTH (0.6%)" color="#6d28d9" />
            </div>
            <div className="mt-4 p-3 bg-white/5 rounded border border-white/10">
               <div className="text-[10px] text-gray-500 font-orbitron mb-1">STABILITY INDEX</div>
               <div className="text-lg font-mono text-hologram-green">99.98% NOMINAL</div>
            </div>
          </Card>
        </div>

        {/* Real-time Gauges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          <Card className="flex flex-col items-center p-8">
              <Gauge
                value={Math.round(oxygenLevel)}
                max={100}
                label="КИСЛОРОД"
                unit="%"
                status={oxygenLevel < 92 ? 'warning' : 'operational'}
                size={140}
              />
          </Card>
          <Card className="flex flex-col items-center p-8">
              <Gauge
                value={Math.round(temperature)}
                max={30}
                label="ТЕМПЕРАТУРА"
                unit="°C"
                status="operational"
                size={140}
              />
          </Card>
          <Card className="flex flex-col items-center p-8">
              <Gauge
                value={Math.round(humidity)}
                max={100}
                label="ВЛАЖНОСТ"
                unit="%"
                status="operational"
                size={140}
              />
          </Card>
        </motion.div>

        {/* Module Status Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
           {['СЕКТОР A', 'СЕКТОР B', 'СЕКТОР C', 'СЕКТОР D'].map((sector, i) => (
             <Card key={i} className="p-4 flex items-center justify-between border-l-4 border-hologram-green/50">
                <span className="text-xs font-orbitron text-gray-400">{sector}</span>
                <div className="flex gap-1">
                   {[1,2,3].map(dot => (
                     <div key={dot} className="w-1.5 h-1.5 rounded-full bg-hologram-green shadow-[0_0_5px_#10b981]" />
                   ))}
                </div>
             </Card>
           ))}
        </div>
      </div>
    </PageLayout>
  );
};
