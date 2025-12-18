import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const systems = [
    {
      name: 'Навигационна Система',
      description: 'Прецизно управление на траекторията и позиционирането на кораба в космическото пространство.',
      icon: '🧭',
      path: '/navigation'
    },
    {
      name: 'Жизнена Поддръжка',
      description: 'Мониторинг и контрол на кислорода, температурата и атмосферните условия.',
      icon: '🌬️',
      path: '/life-support'
    },
    {
      name: 'Комуникационен Център',
      description: 'Управление на сигналите и връзка с планетарните бази и орбиталните станции.',
      icon: '📡',
      path: '/communications'
    }
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-8xl font-orbitron font-bold mb-4 tracking-[0.1em] text-white">
            ENDURANCE
          </h1>
          <div className="subtitle-readout mb-6">
            Main Control Interface :: Vessel Hub
          </div>
          <p className="text-lg text-blue-400 font-rajdhani italic opacity-80 max-w-2xl mx-auto">
            "Човечеството е родено на Земята. Не е предназначено да остане тук завинаги."
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-16 flex justify-center"
        >
          <div className="glass-card p-1 max-w-5xl w-full overflow-hidden relative group border-hologram-green/30">
            <div className="absolute inset-0 bg-gradient-to-t from-space-dark to-transparent z-10 opacity-60" />
            <img 
              src="/images/download.jpg" 
              alt="Endurance Vessel" 
              className="w-full h-[400px] object-cover rounded-lg group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute bottom-8 left-8 z-20">
              <div className="flex items-center gap-4 mb-2">
                <span className="w-3 h-3 rounded-full bg-hologram-green animate-pulse" />
                <span className="text-hologram-green font-orbitron text-xs tracking-widest uppercase">VESSEL STATUS: OPTIMAL</span>
              </div>
              <h2 className="text-3xl font-orbitron font-bold text-white mb-2">ENDURANCE COMMAND HUB</h2>
              <p className="text-sm text-gray-400 font-rajdhani max-w-md">
                Добре дошли в централния интерфейс на Endurance. Оттук можете да управлявате всички критични системи на кораба.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {systems.map((system, index) => (
            <motion.div
              key={system.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Card 
                className="h-full hover:border-hologram-blue transition-colors cursor-pointer group"
                onClick={() => navigate(system.path)}
              >
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{system.icon}</div>
                <h3 className="text-xl font-orbitron font-bold mb-4 text-white group-hover:text-hologram-blue transition-colors">
                  {system.name}
                </h3>
                <p className="text-gray-400 font-rajdhani text-sm leading-relaxed">
                  {system.description}
                </p>
                <div className="mt-6 flex items-center text-[10px] font-orbitron text-hologram-blue tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  ДОСТЪП ДО СИСТЕМАТА →
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="mt-16 border-t border-white/5 pt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-orbitron font-bold text-white mb-6 uppercase tracking-wider">
                Дневник на Мисията
              </h2>
              <p className="text-gray-400 font-rajdhani text-lg mb-8 leading-relaxed">
                Всички записи от пътуването, откритията и телеметрията се архивират тук за бъдещ анализ и връзка с Командването.
              </p>
              <Button 
                onClick={() => navigate('/mission-log')}
                className="px-8 bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20"
              >
                ОТВОРИ ДНЕВНИК
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square glass-card overflow-hidden bg-white/5 border-white/10 group">
                   <div className="w-full h-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-orbitron text-[10px] tracking-tighter opacity-30 group-hover:opacity-100 transition-opacity">
                      DATA_SLICE_{i}
                   </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mt-24 pb-12 border-t border-white/5 pt-8 flex justify-between items-center text-gray-500 font-rajdhani text-xs uppercase tracking-[0.3em]">
          <span>Endurance Mission Control // Hub Access</span>
          <span>Earth Time: {new Date().toLocaleDateString('bg-BG')}</span>
        </div>
      </div>
    </PageLayout>
  );
};
