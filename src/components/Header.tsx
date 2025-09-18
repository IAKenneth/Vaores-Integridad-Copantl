import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Juego', href: '#juego' },
    { name: 'Niveles', href: '#niveles' },
    { name: 'Valores', href: '#valores' },
    { name: 'Nosotros', href: '#nosotros' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? isDarkMode 
          ? 'bg-black/90 backdrop-blur-md border-b border-cyan-500/30'
          : 'bg-white/90 backdrop-blur-md border-b border-cyan-500/30'
        : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 group">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-black font-bold text-xl">I</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                INTEGRIDAD CORP
              </span>
              <span className={`text-xs uppercase tracking-wider ${
                isDarkMode ? 'text-amber-400' : 'text-amber-600'
              }`}>
                VALORES FUTURISTAS
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`relative px-3 py-2 transition-colors duration-300 group ${
                  isDarkMode 
                    ? 'text-cyan-300 hover:text-white' 
                    : 'text-cyan-600 hover:text-gray-900'
                }`}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:w-full transition-all duration-500"></span>
              </a>
            ))}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                isDarkMode 
                  ? 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400' 
                  : 'bg-cyan-100 hover:bg-cyan-200 text-cyan-600'
              }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 transition-colors duration-300 ${
              isDarkMode 
                ? 'text-cyan-400 hover:text-white' 
                : 'text-cyan-600 hover:text-gray-900'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ${
          isMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className={`py-2 space-y-2 border-t border-cyan-500/30`}>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`block px-4 py-2 rounded transition-all duration-300 ${
                  isDarkMode 
                    ? 'text-cyan-300 hover:text-white hover:bg-cyan-500/10' 
                    : 'text-cyan-600 hover:text-gray-900 hover:bg-cyan-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className={`block w-full text-left px-4 py-2 rounded transition-all duration-300 ${
                isDarkMode 
                  ? 'text-cyan-300 hover:text-white hover:bg-cyan-500/10' 
                  : 'text-cyan-600 hover:text-gray-900 hover:bg-cyan-100'
              }`}
            >
              {isDarkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;