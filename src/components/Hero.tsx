import React from 'react';
import { Play, Zap } from 'lucide-react';

interface HeroProps {
  isDarkMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ isDarkMode }) => {
  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-pulse">
            <div className="w-40 h-40 mx-auto bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 rounded-full flex items-center justify-center mb-6 glow-effect p-4">
              <img 
                src="https://cdn.prod.website-files.com/65b975e246a20b9be0bab4bb/65ba2100525f8dea4c48f7e0_Capa_1.png" 
                alt="Copantl Hotel" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-white to-yellow-400 bg-clip-text text-transparent leading-tight">
            COPANTL
          </h1>
          
          <div className={`text-xl md:text-2xl mb-4 font-light ${
            isDarkMode ? 'text-amber-300' : 'text-amber-600'
          }`}>
            <span className="typing-animation">HOTEL & CONVENTION CENTER</span>
          </div>
          
          <p className={`text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Descubre la excelencia hotelera del futuro a través de una experiencia interactiva 
            única que combina hospitalidad de clase mundial con tecnología de vanguardia.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <button className="group bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/50 flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>EXPLORAR HOTEL</span>
            </button>
            
            <button className={`group border-2 border-amber-500 hover:border-amber-400 font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-amber-500/10 flex items-center space-x-2 ${
              isDarkMode 
                ? 'text-amber-400 hover:text-white' 
                : 'text-amber-600 hover:text-amber-800'
            }`}>
              <Zap className="w-5 h-5" />
              <span>NUESTROS SERVICIOS</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { number: "5★", label: "Excelencia" },
              { number: "24/7", label: "Servicio" },
              { number: "2025", label: "Innovación" }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className={`uppercase tracking-wider ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;