import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import GameSection from './components/GameSection';
import LevelSelector from './components/LevelSelector';
import ValuesSection from './components/ValuesSection';
import About from './components/About';
import Footer from './components/Footer';
import './styles/animations.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-black text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="relative">
        {/* Animated background */}
        <div className={`fixed inset-0 transition-opacity duration-500 ${
          isDarkMode ? 'opacity-30' : 'opacity-10'
        }`}>
          <div className={`absolute inset-0 ${
            isDarkMode 
              ? 'bg-gradient-to-br from-cyan-900/20 via-black to-purple-900/20'
              : 'bg-gradient-to-br from-cyan-200/30 via-gray-50 to-purple-200/30'
          }`}></div>
          <div className="digital-grid"></div>
        </div>
        
        <div className="relative z-10">
          <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          <Hero isDarkMode={isDarkMode} />
          <GameSection isDarkMode={isDarkMode} />
          <LevelSelector isDarkMode={isDarkMode} />
          <ValuesSection isDarkMode={isDarkMode} />
          <About isDarkMode={isDarkMode} />
          <Footer isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
}

export default App;