import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { crewMembers } from '../data/crewData';

export const CrewMemberPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const member = crewMembers.find(m => m.id === id);

  if (!member) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-orbitron font-bold mb-4">Членът на екипажа не е намерен</h1>
          <Button onClick={() => navigate('/crew')}>Обратно към екипажа</Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            variant="outline"
            onClick={() => navigate('/crew')}
            className="mb-8"
          >
            ← Обратно към екипажа
          </Button>

          <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="w-full aspect-square rounded-lg overflow-hidden shadow-lg border border-hologram-green/30 relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-space-dark/60 to-transparent z-10" />
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Basic Info */}
              <div className="flex flex-col justify-center">
                <h1 className="text-4xl font-orbitron font-bold mb-4 text-hologram-green">
                  {member.name}
                </h1>
                <p className="text-2xl text-purple-accent font-semibold mb-6">
                  {member.role}
                </p>
                <div className="mb-6">
                  <h3 className="text-lg font-orbitron font-semibold mb-3 text-warning-orange">
                    Умения:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-accent/20 border border-purple-accent rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Bio */}
            <div className="mb-8">
              <h2 className="text-2xl font-orbitron font-bold mb-4 text-hologram-green">
                Биография
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {member.detailedBio}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                onClick={() => navigate('/crew')}
                className="flex-1"
              >
                Виж Останалия Екипаж
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate('/ship-status')}
                className="flex-1"
              >
                Статус на Кораба
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </PageLayout>
  );
};
