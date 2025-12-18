import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Stars, ContactShadows } from '@react-three/drei';
import { EnduranceModel } from './EnduranceModel';
import { ThreeErrorBoundary } from './ThreeErrorBoundary';

export type ViewType = 'overview' | 'engines' | 'life-support' | 'comms' | 'gravity';

export const SpaceshipScene: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('overview');

  const menuItems: { id: ViewType; label: string; icon: string }[] = [
    { id: 'overview', label: 'ОБЩ ПРЕГЛЕД', icon: '🌐' },
    { id: 'engines', label: 'ДВИГАТЕЛИ', icon: '🚀' },
    { id: 'life-support', label: 'ЖИЗНЕНА СРЕДА', icon: '🌱' },
    { id: 'comms', label: 'КОМУНИКАЦИИ', icon: '📡' },
    { id: 'gravity', label: 'ГРАВИТАЦИЯ', icon: '⚓' },
  ];

  return (
    <div className="w-full h-full min-h-[500px] glass-card rounded-lg overflow-hidden relative border border-hologram-green/20">
      {/* HUD Header */}
       <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <h3 className="text-sm font-orbitron text-white/70 tracking-[0.2em]">
          VISUAL FEED
        </h3>
        <p className="text-hologram-green/60 text-[10px] flex items-center font-mono tracking-widest mt-1 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-hologram-green animate-pulse mr-2 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
          LIVE TELEMETRY LNK:01
        </p>
      </div>
      
      {/* HUD Accents (Simplified) */}
      <div className="absolute bottom-6 left-6 z-10 h-0.5 w-8 bg-hologram-green/30 pointer-events-none" />
      <div className="absolute bottom-6 left-6 z-10 w-0.5 h-8 bg-hologram-green/30 pointer-events-none" />

      {/* Telemetry Control Menu */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-wrap justify-center gap-2 px-4 w-full max-w-2xl">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`px-4 py-2 rounded-lg border backdrop-blur-md font-orbitron text-[10px] font-bold transition-all duration-300 flex items-center gap-2 ${
              activeView === item.id 
                ? 'bg-hologram-green/20 border-hologram-green text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' 
                : 'bg-black/60 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/30'
            }`}
          >
            <span>{item.icon}</span>
            <span className="tracking-widest uppercase">{item.label}</span>
          </button>
        ))}
      </div>

      <ThreeErrorBoundary
        fallback={
          <div className="w-full h-full flex flex-col items-center justify-center bg-space-black relative z-0">
             <div className="absolute inset-0 opacity-30">
                <img src="/public/images/download.jpg" alt="Endurance Visual" className="w-full h-full object-cover" />
             </div>
             <div className="bg-black/80 border border-warning-orange p-6 rounded-lg text-center backdrop-blur-md z-10 max-w-md">
                <div className="text-warning-orange text-4xl mb-4">⚠️</div>
                <h3 className="text-xl font-orbitron text-warning-orange mb-2">VISUALS OFFLINE</h3>
                <p className="text-gray-300 font-rajdhani mb-4">
                  Connection to visual sensors lost. 
                  Please reboot system (Restart Browser) to restore 3D feed.
                </p>
                <div className="text-xs font-mono text-gray-500">ERROR: WEBGL_CONTEXT_LOST</div>
             </div>
          </div>
        }
      >
        <Canvas dpr={[1, 2]} shadows gl={{ preserveDrawingBuffer: true, powerPreference: "default" }}>
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[5, 2, 5]} fov={60} />
            
            <OrbitControls 
              enablePan={false} 
              enableZoom={true} 
              minDistance={2} 
              maxDistance={8}
              autoRotate={true}
              autoRotateSpeed={0.8}
              maxPolarAngle={Math.PI / 1.5}
              minPolarAngle={Math.PI / 4}
            />
            
            <ambientLight intensity={0.2} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" castShadow />
            <pointLight position={[-10, -5, -10]} intensity={1} color="#1d2671" />
            <pointLight position={[5, -5, 5]} intensity={0.5} color="#6d28d9" />
            
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Environment preset="night" />
            
            <EnduranceModel activeView={activeView} />
            
            <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={10} color="#000000" />
          </Suspense>
        </Canvas>
      </ThreeErrorBoundary>
      
      {/* Loading Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-space-dark/90 z-0 pointer-events-none transition-opacity duration-1000 opacity-0 has-[+canvas:empty]:opacity-100">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-t-hologram-green border-r-transparent border-b-purple-accent border-l-transparent rounded-full animate-spin mb-4"></div>
            <div className="text-hologram-green font-orbitron text-xl animate-pulse">LOADING MODEL SYSTEMS...</div>
          </div>
      </div>
    </div>
  );
};
