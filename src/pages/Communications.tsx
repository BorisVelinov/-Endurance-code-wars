import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Card } from '../components/Card';
import { StatusIndicator } from '../components/StatusIndicator';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  type: 'incoming' | 'outgoing';
}

export const Communications: React.FC = () => {
  const [signalStrength, setSignalStrength] = useState(78);
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
    },
    {
      id: 4,
      sender: 'Д-р Бранд',
      content: 'Научните данни от последното сканиране са готови за предаване.',
      timestamp: '14:26:34',
      type: 'outgoing'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSignalStrength(prev => Math.max(65, Math.min(85, prev + (Math.random() - 0.5) * 5)));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <PageLayout>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-orbitron font-bold mb-4 text-glow">
            Комуникационна Система
          </h1>
          <p className="text-xl text-gray-300">
            Връзка със Земята и координация между модулите
          </p>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <Card>
            <StatusIndicator status="warning" label="Дълги Разстояния" />
          </Card>
          <Card>
            <StatusIndicator status="operational" label="Вътрешна Комуникация" />
          </Card>
          <Card>
            <StatusIndicator status="operational" label="Аварийни Канали" />
          </Card>
        </motion.div>

        {/* Signal Strength */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <Card>
            <h2 className="text-3xl font-orbitron font-bold mb-6 text-hologram-green">
              Сила на Сигнала
            </h2>
            <div className="flex items-center gap-8">
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Земя</span>
                  <span className="font-orbitron font-bold text-warning-orange">
                    {Math.round(signalStrength)}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <motion.div
                    className="bg-warning-orange h-4 rounded-full"
                    animate={{ width: `${signalStrength}%` }}
                    transition={{ duration: 0.5 }}
                    style={{ boxShadow: '0 0 10px #f59e0b' }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Забавяне: ~23 часа (поради разстоянието)
                </p>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((bar) => (
                  <motion.div
                    key={bar}
                    className={`w-3 rounded ${
                      bar <= Math.floor(signalStrength / 20)
                        ? 'bg-warning-orange'
                        : 'bg-gray-700'
                    }`}
                    style={{
                      height: `${bar * 12}px`,
                      boxShadow: bar <= Math.floor(signalStrength / 20)
                        ? '0 0 8px #f59e0b'
                        : 'none'
                    }}
                    animate={{
                      opacity: bar <= Math.floor(signalStrength / 20) ? [0.7, 1, 0.7] : 0.3
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: bar * 0.1
                    }}
                  />
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Message Log */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <Card>
            <h3 className="text-2xl font-orbitron font-bold mb-6 text-hologram-green">
              Дневник на Съобщенията
            </h3>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: message.type === 'incoming' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`flex ${message.type === 'outgoing' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-md p-4 rounded-lg ${
                      message.type === 'incoming'
                        ? 'bg-deep-blue/50 border border-blue-500/30'
                        : 'bg-purple-accent/30 border border-purple-accent/50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-orbitron font-semibold text-sm">
                        {message.sender}
                      </span>
                      <span className="text-xs text-gray-400 ml-4">
                        {message.timestamp}
                      </span>
                    </div>
                    <p className="text-gray-200">{message.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Communication Channels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Active Channels */}
          <Card>
            <h3 className="text-2xl font-orbitron font-bold mb-6 text-hologram-green">
              Активни Канали
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-hologram-green rounded-full animate-pulse-glow" />
                  <span className="text-gray-300">Канал 1 - NASA</span>
                </div>
                <span className="text-hologram-green font-orbitron text-sm">АКТИВЕН</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-hologram-green rounded-full animate-pulse-glow" />
                  <span className="text-gray-300">Канал 2 - Вътрешен</span>
                </div>
                <span className="text-hologram-green font-orbitron text-sm">АКТИВЕН</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gray-500 rounded-full" />
                  <span className="text-gray-300">Канал 3 - Резервен</span>
                </div>
                <span className="text-gray-500 font-orbitron text-sm">НЕАКТИВЕН</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-warning-orange rounded-full animate-pulse-glow" />
                  <span className="text-gray-300">Канал 4 - Аварийен</span>
                </div>
                <span className="text-warning-orange font-orbitron text-sm">ГОТОВ</span>
              </div>
            </div>
          </Card>

          {/* Transmission Stats */}
          <Card>
            <h3 className="text-2xl font-orbitron font-bold mb-6 text-hologram-green">
              Статистика на Предаването
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 mb-1">Изпратени съобщения:</p>
                <p className="text-3xl font-orbitron font-bold">1,247</p>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Получени съобщения:</p>
                <p className="text-3xl font-orbitron font-bold">1,189</p>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Средно забавяне:</p>
                <p className="text-3xl font-orbitron font-bold text-warning-orange">23.4 ч</p>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Качество на връзката:</p>
                <p className="text-3xl font-orbitron font-bold text-warning-orange">78%</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </PageLayout>
  );
};
