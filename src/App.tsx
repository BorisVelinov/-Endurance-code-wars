import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { CrewList } from './pages/CrewList';
import { CrewMemberPage } from './pages/CrewMemberPage';
import { ShipStatus } from './pages/ShipStatus';
import { NavigationSystem } from './pages/NavigationSystem';
import { LifeSupport } from './pages/LifeSupport';
import { Communications } from './pages/Communications';
import { MissionLog } from './pages/MissionLog';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crew" element={<CrewList />} />
        <Route path="/crew/:id" element={<CrewMemberPage />} />
        <Route path="/ship-status" element={<ShipStatus />} />
        <Route path="/navigation" element={<NavigationSystem />} />
        <Route path="/life-support" element={<LifeSupport />} />
        <Route path="/communications" element={<Communications />} />
        <Route path="/mission-log" element={<MissionLog />} />
      </Routes>
    </Router>
  );
}

export default App;
