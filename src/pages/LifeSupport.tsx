import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Card } from '../components/Card';
import { Gauge } from '../components/Gauge';
import { StatusIndicator } from '../components/StatusIndicator';

export const LifeSupport: React.FC = () => {
  const [oxygenLevel, setOxygenLevel] = useState(95);
  const [temperature, setTemperature] = useState(21);
  const [humidity, setHumidity] = useState(45);

  useEffect(() => {
    const interval = setInterval(() => {
      setOxygenLevel(prev => Math.max(90, Math.min(100, prev + (Math.random() - 0.5) * 2)));
      setTemperature(prev => Math.max(18, Math.min(24, prev + (Math.random() - 0.5) * 0.5)));
      setHumidity(prev => Math.max(40, Math.min(60, prev + (Math.random() - 0.5) * 2)));
    }, 2000);

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
            Жизнена Поддръжка
          </h1>
          <p className="text-xl text-gray-300">
            Мониторинг и контрол на атмосферните условия
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
            <StatusIndicator status="operational" label="Кислороден Генератор" />
          </Card>
          <Card>
            <StatusIndicator status="operational" label="Климатичен Контрол" />
          </Card>
          <Card>
            <StatusIndicator status="operational" label="Филтрация на Въздух" />
          </Card>
        </motion.div>

        {/* Main Gauges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <Card>
            <h2 className="text-3xl font-orbitron font-bold mb-8 text-hologram-green text-center">
              Основни Параметри
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
              <Gauge
                value={Math.round(oxygenLevel)}
                max={100}
                label="Ниво на Кислород"
                unit="%"
                status="operational"
                size={150}
              />
              <Gauge
                value={Math.round(temperature)}
                max={30}
                label="Температура"
                unit="°C"
                status="operational"
                size={150}
              />
              <Gauge
                value={Math.round(humidity)}
                max={100}
                label="Влажност"
                unit="%"
                status="operational"
                size={150}
              />
            </div>
          </Card>
        </motion.div>

        {/* Atmospheric Composition */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <Card>
            <h3 className="text-2xl font-orbitron font-bold mb-6 text-hologram-green">
              Атмосферен Състав
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Кислород (O₂)</span>
                  <span className="font-orbitron font-bold">21%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <motion.div
                    className="bg-hologram-green h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '21%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{ boxShadow: '0 0 10px #10b981' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Азот (N₂)</span>
                  <span className="font-orbitron font-bold">78%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <motion.div
                    className="bg-blue-500 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '78%' }}
                    transition={{ duration: 1, delay: 0.6 }}
                    style={{ boxShadow: '0 0 10px #3b82f6' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Въглероден Диоксид (CO₂)</span>
                  <span className="font-orbitron font-bold">0.4%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <motion.div
                    className="bg-warning-orange h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '4%' }}
                    transition={{ duration: 1, delay: 0.7 }}
                    style={{ boxShadow: '0 0 10px #f59e0b' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Други Газове</span>
                  <span className="font-orbitron font-bold">0.6%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <motion.div
                    className="bg-purple-accent h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '6%' }}
                    transition={{ duration: 1, delay: 0.8 }}
                    style={{ boxShadow: '0 0 10px #6d28d9' }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Module Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Oxygen Systems */}
          <Card>
            <h3 className="text-2xl font-orbitron font-bold mb-6 text-hologram-green">
              Кислородни Системи
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                <span className="text-gray-300">Резервоар 1</span>
                <span className="text-hologram-green font-orbitron font-bold">98%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                <span className="text-gray-300">Резервоар 2</span>
                <span className="text-hologram-green font-orbitron font-bold">96%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                <span className="text-gray-300">Резервоар 3</span>
                <span className="text-hologram-green font-orbitron font-bold">94%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                <span className="text-gray-300">Генератор</span>
                <span className="text-hologram-green font-orbitron font-bold">АКТИВЕН</span>
              </div>
            </div>
          </Card>

          {/* Temperature Control */}
          <Card>
            <h3 className="text-2xl font-orbitron font-bold mb-6 text-hologram-green">
              Температурен Контрол
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                <span className="text-gray-300">Модул 1</span>
                <span className="text-hologram-green font-orbitron font-bold">21°C</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                <span className="text-gray-300">Модул 2</span>
                <span className="text-hologram-green font-orbitron font-bold">20°C</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                <span className="text-gray-300">Модул 3</span>
                <span className="text-hologram-green font-orbitron font-bold">22°C</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                <span className="text-gray-300">Охладителна Система</span>
                <span className="text-hologram-green font-orbitron font-bold">АКТИВНА</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </PageLayout>
  );
};
