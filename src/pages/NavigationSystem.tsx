import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Card } from '../components/Card';
import { StatusIndicator } from '../components/StatusIndicator';

export const NavigationSystem: React.FC = () => {
  const [coordinates, setCoordinates] = useState({
    x: 1247.89,
    y: -3456.12,
    z: 8901.34
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCoordinates(prev => ({
        x: prev.x + (Math.random() - 0.5) * 0.1,
        y: prev.y + (Math.random() - 0.5) * 0.1,
        z: prev.z + (Math.random() - 0.5) * 0.1
      }));
    }, 1000);

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
            Навигационна Система
          </h1>
          <p className="text-xl text-gray-300">
            Прецизно управление на траекторията и позиционирането
          </p>
        </motion.div>

        {/* Status Overview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <Card>
            <StatusIndicator status="operational" label="Навигационна Система" />
          </Card>
          <Card>
            <StatusIndicator status="operational" label="Гиростабилизатори" />
          </Card>
          <Card>
            <StatusIndicator status="operational" label="Сензорен Масив" />
          </Card>
        </motion.div>

        {/* Star Map Visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <Card>
            <h2 className="text-3xl font-orbitron font-bold mb-6 text-hologram-green">
              Звездна Карта
            </h2>
            <div className="aspect-video bg-gradient-to-br from-space-dark via-deep-blue to-purple-accent/20 rounded-lg relative overflow-hidden">
              {/* Simulated star field */}
              {[...Array(100)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
              
              {/* Endurance position */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-8 h-8 border-2 border-hologram-green rounded-full flex items-center justify-center"
                     style={{ boxShadow: '0 0 20px #10b981' }}>
                  <div className="w-4 h-4 bg-hologram-green rounded-full" />
                </div>
              </motion.div>

              {/* Target destination */}
              <motion.div
                className="absolute top-1/4 right-1/4"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-6 h-6 border-2 border-warning-orange rounded-full"
                     style={{ boxShadow: '0 0 15px #f59e0b' }} />
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Coordinates and Trajectory */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Current Coordinates */}
          <Card>
            <h3 className="text-2xl font-orbitron font-bold mb-6 text-hologram-green">
              Текущи Координати
            </h3>
            <div className="space-y-4 font-mono">
              <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                <span className="text-gray-400">X:</span>
                <span className="text-hologram-green text-xl">{coordinates.x.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                <span className="text-gray-400">Y:</span>
                <span className="text-hologram-green text-xl">{coordinates.y.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                <span className="text-gray-400">Z:</span>
                <span className="text-hologram-green text-xl">{coordinates.z.toFixed(2)}</span>
              </div>
            </div>
          </Card>

          {/* Trajectory Data */}
          <Card>
            <h3 className="text-2xl font-orbitron font-bold mb-6 text-hologram-green">
              Данни за Траекторията
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 mb-1">Скорост:</p>
                <p className="text-2xl font-orbitron font-bold">0.55c</p>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Посока:</p>
                <p className="text-2xl font-orbitron font-bold">247.8°</p>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Разстояние до цел:</p>
                <p className="text-2xl font-orbitron font-bold text-warning-orange">2.3 млн. км</p>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Очаквано време:</p>
                <p className="text-2xl font-orbitron font-bold">14 часа 23 мин</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Navigation Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <h3 className="text-2xl font-orbitron font-bold mb-6 text-hologram-green">
              Контроли за Навигация
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="glass-card p-4 hover:bg-white/10 transition-all border-glow border-hologram-green">
                <div className="text-3xl mb-2">⬆️</div>
                <p className="text-sm">Нагоре</p>
              </button>
              <button className="glass-card p-4 hover:bg-white/10 transition-all border-glow border-hologram-green">
                <div className="text-3xl mb-2">⬇️</div>
                <p className="text-sm">Надолу</p>
              </button>
              <button className="glass-card p-4 hover:bg-white/10 transition-all border-glow border-hologram-green">
                <div className="text-3xl mb-2">⬅️</div>
                <p className="text-sm">Наляво</p>
              </button>
              <button className="glass-card p-4 hover:bg-white/10 transition-all border-glow border-hologram-green">
                <div className="text-3xl mb-2">➡️</div>
                <p className="text-sm">Надясно</p>
              </button>
            </div>
            <p className="text-center text-gray-500 text-sm mt-4">
              * Визуални контроли - само за демонстрация
            </p>
          </Card>
        </motion.div>
      </div>
    </PageLayout>
  );
};
