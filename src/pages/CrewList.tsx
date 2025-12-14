import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { crewMembers } from '../data/crewData';

export const CrewList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-orbitron font-bold mb-4 text-glow">
            Екипаж на Endurance
          </h1>
          <p className="text-xl text-gray-300">
            Запознайте се с храбрите души, които ще спасят човечеството
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {crewMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <div className="w-full aspect-square mb-4 overflow-hidden rounded-lg relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-space-dark/80 to-transparent z-10" />
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <h3 className="text-2xl font-orbitron font-bold mb-2 text-hologram-green">
                  {member.name}
                </h3>
                <p className="text-purple-accent font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-gray-300 mb-6 flex-grow">
                  {member.description}
                </p>
                <Button
                  variant="outline"
                  onClick={() => navigate(`/crew/${member.id}`)}
                  className="w-full"
                >
                  Повече Информация
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};
