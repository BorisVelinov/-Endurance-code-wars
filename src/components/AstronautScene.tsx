
import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, ContactShadows, Stars } from '@react-three/drei';
import { AstronautModel, AstronautViewType } from './AstronautModel';
import { ThreeErrorBoundary } from './ThreeErrorBoundary';

interface AstronautSceneProps {
  biometrics?: {
    bpm: number;
    spo2: number;
    temp: number;
    stress: string;
  };
}

export const AstronautScene: React.FC<AstronautSceneProps> = ({ biometrics }) => {
  const [activeView, setActiveView] = useState<AstronautViewType>('vitals');

  const menuItems: { id: AstronautViewType; label: string; icon: string }[] = [
    { id: 'vitals', label: 'ЖИЗНЕНИ', icon: '❤️' },
    { id: 'suit', label: 'СКАФАНДЪР', icon: '🛡️' },
    { id: 'location', label: 'ЛОКАЦИЯ', icon: '📍' },
    { id: 'mission', label: 'МИСИЯ', icon: '🎯' },
  ];

  return (
    <div className="w-full h-full min-h-[500px] glass-card rounded-lg overflow-hidden relative border border-blue-500/20">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
      
      {/* HUD Header */}
       <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <h3 className="text-xl font-orbitron text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          BIO-MONITOR
        </h3>
        <p className="text-blue-400 text-sm flex items-center font-rajdhani tracking-widest">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse mr-2 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
          LIVE FEED :: SUIT TELEMETRY
        </p>
      </div>

      {/* View Control Menu */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(activeView === item.id ? 'none' : item.id)}
            className={`px-3 py-2 rounded-lg border backdrop-blur-md font-orbitron text-xs font-bold transition-all duration-300 flex items-center gap-2 w-32 justify-between ${
              activeView === item.id 
                ? 'bg-blue-500/30 border-blue-400 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]' 
                : 'bg-black/40 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/30'
            }`}
          >
            <span>{item.icon} {item.label}</span>
            <span className={`w-1.5 h-1.5 rounded-full ${activeView === item.id ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`}></span>
          </button>
        ))}
      </div>

      <ThreeErrorBoundary
        fallback={
          <div className="w-full h-full flex flex-col items-center justify-center bg-space-black relative z-0">
             <div className="absolute inset-0 opacity-20 bg-[url('/images/download.jpg')] bg-cover bg-center"></div>
             <div className="bg-black/80 border border-warning-orange p-6 rounded-lg text-center backdrop-blur-md z-10 max-w-md">
                <div className="text-warning-orange text-4xl mb-4">⚠️</div>
                <h3 className="text-xl font-orbitron text-warning-orange mb-2">SIGNAL LOST</h3>
                <p className="text-gray-300 font-rajdhani mb-4">
                   Unable to establish link with suit telemetry.
                   <br/>
                   Check graphics module status.
                </p>
             </div>
          </div>
        }
      >
        <Canvas dpr={[1, 2]} shadows gl={{ preserveDrawingBuffer: true }}>
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
            
            <OrbitControls 
              enablePan={false} 
              enableZoom={true} 
              minDistance={4} 
              maxDistance={10}
              autoRotate={true}
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 1.5}
              minPolarAngle={Math.PI / 3}
            />
            
            <ambientLight intensity={0.4} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#2563eb" />
            
             <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
            <Environment preset="city" />
            
            <AstronautModel biometrics={biometrics} activeView={activeView} />
            
            <ContactShadows resolution={1024} scale={10} blur={2} opacity={0.5} far={10} color="#000000" />
          </Suspense>
        </Canvas>
      </ThreeErrorBoundary>

       {/* Loading Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-space-dark/90 z-0 pointer-events-none transition-opacity duration-1000 opacity-0 has-[+canvas:empty]:opacity-100">
         <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <div className="text-blue-400 font-orbitron text-sm animate-pulse">ESTABLISHING LINK...</div>
         </div>
      </div>
    </div>
  );
};
