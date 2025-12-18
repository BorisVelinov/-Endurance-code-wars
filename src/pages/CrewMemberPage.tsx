import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageLayout } from '../components/PageLayout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { crewMembers } from '../data/crewData';
import { AstronautScene } from '../components/AstronautScene';

// Helper to generate consistent "biometrics" based on member ID
const getMemberBiometrics = (id: string) => {
  const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return {
    bpm: 65 + (seed % 20),
    spo2: 97 + (seed % 3),
    temp: 36.3 + ((seed % 10) / 10),
    stress: id === 'mann' ? 'HIGH' : 'NORMAL'
  };
};

export const CrewMemberPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const member = crewMembers.find(m => m.id === id);
  const biometrics = member ? getMemberBiometrics(member.id) : undefined;
  
  // CASE and TARS are robots, they don't need a human astronaut model or biometrics
  const isRobot = member?.id === 'case' || member?.id === 'tars';

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
      <div className="container mx-auto px-4 max-w-6xl">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Conditional Visualization: 3D for humans, Photo for robots */}
              <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg border border-hologram-green/30 relative group bg-space-dark/20">
                {!isRobot ? (
                  <AstronautScene biometrics={biometrics} />
                ) : (
                  <div className="w-full h-full relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-space-dark to-transparent z-10 opacity-60" />
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-6 left-6 z-20">
                      <div className="text-hologram-green font-orbitron text-sm mb-1 tracking-widest">UNIT IDENTIFIER</div>
                      <div className="text-white font-orbitron text-2xl font-bold tracking-[0.2em]">{member.name}</div>
                    </div>
                  </div>
                )}
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
