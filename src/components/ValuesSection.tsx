import React from 'react';
import { Shield, Heart, Eye, Users, Zap, Award } from 'lucide-react';

const ValuesSection = () => {
  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "INTEGRIDAD",
      description: "Actuar con honestidad y transparencia en cada decisión, manteniendo coherencia entre valores y acciones.",
      color: "from-cyan-400 to-blue-500"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "RESPETO",
      description: "Valorar la dignidad de cada persona, reconociendo las diferencias y promoviendo un ambiente inclusivo.",
      color: "from-green-400 to-teal-500"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "TRANSPARENCIA",
      description: "Comunicar de manera clara y abierta, proporcionando información precisa y accesible para todos.",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "RESPONSABILIDAD",
      description: "Asumir las consecuencias de nuestras acciones y comprometernos con el impacto de nuestras decisiones.",
      color: "from-orange-400 to-red-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "EXCELENCIA",
      description: "Buscar continuamente la mejora y superación, estableciendo estándares altos en todo lo que hacemos.",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "COMPROMISO",
      description: "Dedicarse completamente a nuestros objetivos y promesas, manteniendo constancia en nuestros esfuerzos.",
      color: "from-indigo-400 to-purple-500"
    }
  ];

  return (
    <section id="valores" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
            NUESTROS VALORES
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Los principios que guían cada acción en nuestra corporación futurista. 
            Valores que se fortalecen a través del juego y la experiencia interactiva.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <div
              key={index}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${value.color} rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity duration-500`}></div>
              
              <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700 hover:border-cyan-500/50 rounded-2xl p-8 h-full transition-all duration-500 group-hover:transform group-hover:scale-105">
                <div className={`inline-flex p-4 bg-gradient-to-r ${value.color} rounded-xl text-black mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {value.icon}
                </div>
                
                <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${value.color} bg-clip-text text-transparent`}>
                  {value.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                  {value.description}
                </p>

                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-animation"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Values Demo */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8">
            <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              VALORES EN ACCIÓN
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-black/30 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-cyan-400">Juega y Aprende</h4>
                    <p className="text-sm text-gray-400">Cada nivel del juego refuerza un valor específico</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-black/30 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-purple-400">Mensajes Motivacionales</h4>
                    <p className="text-sm text-gray-400">Recibe recordatorios de valores durante el juego</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-black/30 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-400">Progreso Medible</h4>
                    <p className="text-sm text-gray-400">Tu crecimiento en valores se refleja en tu puntuación</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/50 rounded-lg p-6 border border-cyan-500/30">
                <h4 className="text-xl font-bold text-center mb-4 text-cyan-400">Estado Actual</h4>
                <div className="space-y-3">
                  {["Integridad", "Respeto", "Transparencia"].map((value, index) => (
                    <div key={value} className="flex items-center justify-between">
                      <span className="text-gray-300">{value}</span>
                      <div className="w-32 bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${
                            index === 0 ? 'from-cyan-500 to-blue-500' :
                            index === 1 ? 'from-green-500 to-teal-500' :
                            'from-purple-500 to-pink-500'
                          }`}
                          style={{ width: `${65 + index * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;