
import React, { useRef } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

export type AstronautViewType = 'vitals' | 'suit' | 'location' | 'mission' | 'none';

interface AstronautModelProps {
  activeView: AstronautViewType;
  biometrics?: {
    bpm: number;
    spo2: number;
    temp: number;
    stress: string;
  };
}

export const AstronautModel: React.FC<AstronautModelProps> = ({ 
  activeView,
  biometrics = { bpm: 72, spo2: 98, temp: 36.6, stress: 'NORMAL' } 
}) => {
  const group = useRef<Group>(null);
  const { scene } = useGLTF('/images/uploads_files_2954422_astronaut_3d_model.glb');

  useFrame((state) => {
    if (group.current) {
      // Gentle floating animation - Lowered significantly to fix head clipping
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 - 1.0; 
      // Very slow rotation
      group.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={group} dispose={null}>
      {/* Scale 1.2, positioned lower for full body visibility */}
      <primitive object={scene} scale={1.2} position={[0, -1.0, 0]} />

      {/* VITALS HUD - Anchored to CHEST - Moved closer to center */}
      {activeView === 'vitals' && (
        <Html position={[0.1, 0.4, 0.2]} distanceFactor={6} className="pointer-events-none z-0">
          <div className="absolute top-1/2 left-full ml-4 -translate-y-1/2">
            <div className="absolute top-1/2 right-full w-4 h-px bg-blue-500/50 flex items-center">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6] -ml-1"></div>
            </div>
            <div className="bg-black/80 backdrop-blur-sm border border-blue-500/50 p-4 rounded-lg w-52 shadow-[0_0_20px_rgba(59,130,246,0.3)] animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="flex justify-between items-center mb-2 border-b border-blue-500/30 pb-1">
                  <span className="text-blue-400 font-bold font-orbitron text-sm">BIOMETRICS</span>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse delay-75"></span>
                  </div>
                </div>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between items-center text-white">
                    <span className="text-gray-400 text-[10px]">HEART RATE</span>
                    <span className="text-hologram-green text-xs font-bold">{biometrics.bpm} <span className="text-[9px] text-gray-500">BPM</span></span>
                  </div>
                  <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
                    <div className="bg-hologram-green h-full rounded-full animate-pulse" style={{ width: `${(biometrics.bpm / 180) * 100}%` }}></div>
                  </div>
                  <div className="flex justify-between items-center text-white">
                    <span className="text-gray-400 text-[10px]">ISOTOPE O2</span>
                    <span className="text-blue-300 text-xs font-bold">{biometrics.spo2}%</span>
                  </div>
                  <div className="flex justify-between items-center text-white">
                    <span className="text-gray-400 text-[10px]">CORE TEMP</span>
                    <span className="text-warning-orange text-xs font-bold">{biometrics.temp}°C</span>
                  </div>
                </div>
            </div>
          </div>
        </Html>
      )}

      {/* SUIT HUD - Anchored to HIP/THIGH - Moved closer to center */}
      {activeView === 'suit' && (
        <Html position={[-0.2, -0.3, 0.2]} distanceFactor={6} className="pointer-events-none z-0">
          <div className="absolute top-1/2 right-full mr-4 -translate-y-1/2 text-right">
             <div className="absolute top-1/2 left-full w-4 h-px bg-purple-500/50 flex items-center justify-end">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_10px_#a855f7] -mr-1"></div>
            </div>
            <div className="bg-black/80 backdrop-blur-sm border border-purple-500/50 p-3 rounded-lg w-36 shadow-[0_0_20px_rgba(168,85,247,0.3)] animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="text-purple-400 font-bold font-orbitron text-[10px] mb-1">SUIT STATUS</div>
                <div className="text-white font-rajdhani text-xs transition-colors">Integrity: 100%</div>
                <div className="text-gray-400 text-[10px]">Pressure: 4.3 psi</div>
                <div className="text-gray-400 text-[10px] mt-1">Rad. Shield: ON</div>
            </div>
          </div>
        </Html>
      )}
      
      {/* LOCATION HUD - Anchored to WRIST/ARM - Moved closer to center */}
      {activeView === 'location' && (
        <Html position={[0.5, -0.1, 0.1]} distanceFactor={6} className="pointer-events-none z-0">
          <div className="absolute top-1/2 left-full ml-4 -translate-y-1/2">
            <div className="absolute top-1/2 right-full w-4 h-px bg-hologram-green/50 flex items-center">
                 <div className="w-1.5 h-1.5 bg-hologram-green rounded-full shadow-[0_0_10px_#10b981] -ml-1"></div>
            </div>
            <div className="bg-black/80 backdrop-blur-sm border border-hologram-green/50 p-3 rounded-lg w-44 shadow-[0_0_20px_rgba(16,185,129,0.3)] animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="flex justify-between items-center mb-1 border-b border-hologram-green/30 pb-1">
                   <span className="text-hologram-green font-bold font-orbitron text-[10px]">GPS TRACKING</span>
                   <span className="text-[9px] text-gray-400 animate-pulse">● REC</span>
                </div>
                <div className="font-mono text-[9px] text-white space-y-1">
                   <div>LAT: 45.912.84 N</div>
                   <div>LON: 12.004.92 W</div>
                   <div>ALT: 12,450 ft</div>
                   <div className="text-hologram-green pt-1">ZONE: Miller's Planet</div>
                </div>
            </div>
          </div>
        </Html>
      )}
      
      {/* MISSION HUD - Anchored to HEAD/HELMET - Moved closer to center */}
      {activeView === 'mission' && (
        <Html position={[-0.1, 0.9, 0.1]} distanceFactor={6} className="pointer-events-none z-0">
           <div className="absolute top-1/2 right-full mr-4 -translate-y-1/2 text-right">
             <div className="absolute top-1/2 left-full w-4 h-px bg-warning-orange/50 flex items-center justify-end">
                <div className="w-1.5 h-1.5 bg-warning-orange rounded-full shadow-[0_0_10px_#ffa500] -mr-1"></div>
            </div>
             <div className="bg-black/80 backdrop-blur-sm border border-warning-orange/50 p-3 rounded-lg w-44 shadow-[0_0_20px_rgba(255,165,0,0.3)] animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="text-warning-orange font-bold font-orbitron text-[10px] mb-2">MISSION CLOCK</div>
                <div className="text-xl font-mono text-white mb-2">02:14:55</div>
                <div className="text-gray-400 text-[9px] uppercase border-t border-gray-700 pt-1">
                   Current Phase:
                   <div className="text-white font-bold">Survey & Recon</div>
                </div>
             </div>
           </div>
        </Html>
      )}
    </group>
  );
};
