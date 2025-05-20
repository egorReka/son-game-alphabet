import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import GamePage from './pages/Game';
import ResultsPage from './pages/Results';
import { SceneProvider } from './contexts/SceneContext';

const App: React.FC = () => {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <SceneProvider>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/game/:letter' element={<GamePage />} />
          <Route path='/results' element={<ResultsPage />} />
        </Routes>
      </SceneProvider>
    </Router>
  );
};

export default App;
