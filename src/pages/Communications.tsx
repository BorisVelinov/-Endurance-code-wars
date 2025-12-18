import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Card } from '../components/Card';
import { HolographicSlider, HolographicToggle, VerticalEqualizer } from '../components/HolographicControls';
import { Button } from '../components/Button';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  type: 'incoming' | 'outgoing';
}

export const Communications: React.FC = () => {
  const [signalStrength, setSignalStrength] = useState(78);
  const [frequency, setFrequency] = useState(433.5);
  const [encryption, setEncryption] = useState(true);
  const [broadcasting, setBroadcasting] = useState(false);
  const [messages] = useState<Message[]>([
    {
      id: 1,
      sender: 'NASA Контрол',
      content: 'Endurance, това е Хюстън. Потвърдете получаване на последните данни.',
      timestamp: '14:23:45',
      type: 'incoming'
    },
    {
      id: 2,
      sender: 'Командир Купър',
      content: 'Хюстън, данните са получени. Всички системи оперативни.',
      timestamp: '14:24:12',
      type: 'outgoing'
    },
    {
      id: 3,
      sender: 'NASA Контрол',
      content: 'Разбрахме, Endurance. Следващата комуникационна сесия е планирана за 18:00.',
      timestamp: '14:25:03',
      type: 'incoming'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSignalStrength(prev => Math.max(65, Math.min(85, prev + (Math.random() - 0.5) * 2)));
    }, 4000);

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
          <div className="inline-block px-4 py-1 border border-blue-500/30 rounded-full mb-4 bg-blue-500/5">
            <span className="text-blue-400 font-orbitron text-xs tracking-[0.3em]">LONG-RANGE COMMS ARRAY v2.4</span>
          </div>
          <h1 className="text-5xl font-orbitron font-bold mb-4 text-glow">
            Комуникационна Система
          </h1>
          <p className="text-xl text-gray-300 font-rajdhani">
            Връзка със Земята и координация между модулите
          </p>
        </motion.div>

        {/* Console & Signal controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Signal Tuning */}
          <Card className="lg:col-span-2">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-orbitron font-bold text-hologram-green flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                НАСТРОЙКА НА СИГНАЛА
              </h2>
              <div className="flex gap-2">
                 <div className="w-1 h-1 bg-blue-400 rounded-full animate-ping" />
                 <div className="w-1 h-1 bg-blue-400 rounded-full animate-ping delay-75" />
                 <div className="w-1 h-1 bg-blue-400 rounded-full animate-ping delay-150" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              <HolographicSlider 
                label="РЕДУНДАНТНА ЧЕСТОТА" 
                value={frequency} 
                onChange={setFrequency} 
                min={400} 
                max={500} 
                unit=" MHz"
                color="#60a5fa"
              />
              <HolographicSlider 
                label="УСИЛВАНЕ НА АНТЕНАТА" 
                value={signalStrength} 
                onChange={setSignalStrength} 
                color="#f59e0b"
              />
              
              <div className="space-y-4 pt-2">
                <HolographicToggle 
                  label="ШИФРОВАНЕ НА ВРЪЗКАТА" 
                  active={encryption} 
                  onToggle={setEncryption}
                />
                <HolographicToggle 
                  label="АКТИВНО ПРЕДАВАНЕ" 
                  active={broadcasting} 
                  onToggle={setBroadcasting}
                  color="#ec4899"
                />
              </div>
              
              <div className="flex flex-col justify-end pb-3">
                 <Button variant="primary" rotating={broadcasting} className="w-full">
                    {broadcasting ? 'ПРЕДАВАНЕ В ХОД...' : 'ИЗПРАТИ СИГНАЛ'}
                 </Button>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/5 flex gap-4">
              <Button variant="ghost" className="flex-1 text-[10px]" rotating>ТЪРСЕНЕ НА NASA ГОВОР</Button>
              <Button variant="ghost" className="flex-1 text-[10px]" rotating>СИНХРОНИЗИРАЙ ТЕЛЕМЕТРИЯ</Button>
            </div>
          </Card>

          {/* Bandwidth Monitor */}
          <Card>
            <h2 className="text-xl font-orbitron font-bold mb-6 text-purple-400">ПРИЕМАНЕ (BW)</h2>
            <div className="flex justify-around items-end h-64 pb-8">
               <VerticalEqualizer value={30 + Math.sin(Date.now() * 0.01) * 20} label="VOICE" color="#3b82f6" />
               <VerticalEqualizer value={70 + Math.sin(Date.now() * 0.02) * 10} label="DATA" color="#10b981" />
               <VerticalEqualizer value={15 + Math.random() * 10} label="PING" color="#f59e0b" />
            </div>
          </Card>
        </div>

        {/* Messages and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Channel Status */}
          <div className="flex flex-col gap-4">
             {['NASA PRIMARY', 'ENDURANCE INT', 'ROVER LINK', 'EMERGENCY'].map((chan, i) => (
               <Card key={i} className="p-4 border-l-2" style={{ borderLeftColor: i === 3 ? '#f59e0b' : '#10b981' }}>
                  <div className="text-[10px] font-orbitron text-gray-400 mb-1">{chan}</div>
                  <div className="flex justify-between items-center text-xs font-bold text-white">
                     <span>{i === 3 ? 'READY' : 'LINKED'}</span>
                     <div className={`w-2 h-2 rounded-full ${i === 3 ? 'bg-warning-orange' : 'bg-hologram-green'} animate-pulse`} />
                  </div>
               </Card>
             ))}
          </div>

          {/* Message Log */}
          <Card className="lg:col-span-3">
            <h3 className="text-2xl font-orbitron font-bold mb-6 text-hologram-green">ДНЕВНИК НА СЪОБЩЕНИЯТА</h3>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'outgoing' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] p-4 rounded-lg relative ${
                    message.type === 'incoming' ? 'bg-blue-900/40 border border-blue-500/30' : 'bg-purple-900/40 border border-purple-500/30'
                  }`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-orbitron text-xs font-bold text-hologram-green">{message.sender}</span>
                      <span className="text-[10px] text-gray-400">{message.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-200 rajdhani">{message.content}</p>
                    {/* Visual deco */}
                    <div className="absolute top-0 bottom-0 left-0 w-1 bg-blue-500 opacity-20" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};
