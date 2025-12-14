import React from 'react';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Card } from '../components/Card';
import { Gauge } from '../components/Gauge';
import { StatusIndicator } from '../components/StatusIndicator';

export const ShipStatus: React.FC = () => {
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
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-orbitron font-bold mb-4 text-glow">
            Статус на Кораба
          </h1>
          <p className="text-xl text-gray-300">
            Текущо състояние на всички системи на Endurance
          </p>
        </motion.div>

        {/* Current Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card>
            <h2 className="text-3xl font-orbitron font-bold mb-6 text-hologram-green">
              Текуща Локация
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-gray-400 mb-2">Система:</p>
                <p className="text-2xl font-orbitron font-bold">Гаргантюа</p>
              </div>
              <div>
                <p className="text-gray-400 mb-2">Разстояние от Земята:</p>
                <p className="text-2xl font-orbitron font-bold">10 млрд. св. год.</p>
              </div>
              <div>
                <p className="text-gray-400 mb-2">Статус на Мисията:</p>
                <p className="text-2xl font-orbitron font-bold text-hologram-green">АКТИВНА</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* System Status Overview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-orbitron font-bold mb-6 text-center">
            Преглед на Системите
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {systemStatuses.map((system, index) => (
              <motion.div
                key={system.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="text-center">
                  <Gauge
                    value={system.value}
                    max={100}
                    label={system.name}
                    unit="%"
                    status={system.status}
                    size={100}
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Detailed Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Primary Systems */}
          <Card>
            <h3 className="text-2xl font-orbitron font-bold mb-6 text-hologram-green">
              Основни Системи
            </h3>
            <div className="space-y-4">
              <StatusIndicator status="operational" label="Двигателна Система" />
              <StatusIndicator status="operational" label="Навигация" />
              <StatusIndicator status="operational" label="Жизнена Поддръжка" />
              <StatusIndicator status="warning" label="Комуникации" />
            </div>
          </Card>

          {/* Secondary Systems */}
          <Card>
            <h3 className="text-2xl font-orbitron font-bold mb-6 text-hologram-green">
              Допълнителни Системи
            </h3>
            <div className="space-y-4">
              <StatusIndicator status="operational" label="Защитни Щитове" />
              <StatusIndicator status="operational" label="Енергийна Система" />
              <StatusIndicator status="operational" label="Сензорен Масив" />
              <StatusIndicator status="operational" label="Докинг Система" />
            </div>
          </Card>
        </motion.div>

        {/* Resource Levels */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Card>
            <h3 className="text-2xl font-orbitron font-bold mb-6 text-hologram-green">
              Нива на Ресурсите
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Гориво</span>
                  <span className="font-orbitron font-bold">87%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <motion.div
                    className="bg-hologram-green h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '87%' }}
                    transition={{ duration: 1, delay: 1.2 }}
                    style={{ boxShadow: '0 0 10px #10b981' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Кислород</span>
                  <span className="font-orbitron font-bold">95%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <motion.div
                    className="bg-hologram-green h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '95%' }}
                    transition={{ duration: 1, delay: 1.3 }}
                    style={{ boxShadow: '0 0 10px #10b981' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Вода</span>
                  <span className="font-orbitron font-bold">82%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <motion.div
                    className="bg-hologram-green h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '82%' }}
                    transition={{ duration: 1, delay: 1.4 }}
                    style={{ boxShadow: '0 0 10px #10b981' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Провизии</span>
                  <span className="font-orbitron font-bold">76%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <motion.div
                    className="bg-warning-orange h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '76%' }}
                    transition={{ duration: 1, delay: 1.5 }}
                    style={{ boxShadow: '0 0 10px #f59e0b' }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </PageLayout>
  );
};
