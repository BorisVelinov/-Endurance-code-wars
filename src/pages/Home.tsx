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
      icon: '💨',
      path: '/life-support'
    },
    {
      name: 'Комуникационна Система',
      description: 'Връзка със Земята и координация между модулите на Endurance.',
      icon: '📡',
      path: '/communications'
    }
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-orbitron font-bold mb-6 text-glow">
            ENDURANCE
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            Контролен Панел на Космическия Кораб
          </p>
          <p className="text-lg text-purple-accent font-rajdhani italic">
            "Човечеството е родено на Земята. Не е предназначено да остане тук завинаги."
          </p>
        </motion.div>

        {/* Spaceship Image Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-16 flex justify-center"
        >
          <div className="glass-card p-8 max-w-3xl w-full">
            <div className="aspect-video bg-gradient-to-br from-deep-blue to-purple-accent rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🚀</div>
                <p className="text-gray-300">Изображение на Endurance</p>
                <p className="text-sm text-gray-500 mt-2">(Ще бъде добавено)</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mission Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16"
        >
          <Card className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-orbitron font-bold mb-4 text-hologram-green">
              Мисия Endurance
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Космическият кораб Endurance е човешката последна надежда за оцеляване. 
              Нашата мисия е да преминем през червеевата дупка близо до Сатурн и да 
              изследваме три потенциално обитаеми планети в друга галактика.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Екипажът се състои от най-добрите астронавти и учени на човечеството, 
              подкрепени от усъвършенствани роботи CASE и TARS. Заедно ще се изправим 
              пред предизвикателствата на времето, пространството и гравитацията.
            </p>
          </Card>
        </motion.div>

        {/* Key Systems Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-orbitron font-bold text-center mb-12">
            Ключови Системи
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {systems.map((system, index) => (
              <motion.div
                key={system.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              >
                <Card className="h-full flex flex-col">
                  <div className="text-5xl mb-4 text-center">{system.icon}</div>
                  <h3 className="text-xl font-orbitron font-bold mb-3 text-hologram-green">
                    {system.name}
                  </h3>
                  <p className="text-gray-300 mb-6 flex-grow">
                    {system.description}
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => navigate(system.path)}
                    className="w-full"
                  >
                    Повече Информация
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mb-16"
        >
          <Button
            variant="primary"
            onClick={() => navigate('/ship-status')}
            className="text-lg px-8 py-4"
          >
            Разгледай Панела
          </Button>
        </motion.div>
      </div>
    </PageLayout>
  );
};
