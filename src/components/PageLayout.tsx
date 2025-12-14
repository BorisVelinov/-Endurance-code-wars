import React from 'react';
import { Navigation } from './Navigation';
import { ParticleBackground } from './ParticleBackground';

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <Navigation />
      <main className="pt-20 pb-10">
        {children}
      </main>
    </div>
  );
};
