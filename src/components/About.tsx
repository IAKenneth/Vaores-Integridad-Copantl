import React from 'react';
import { Cpu, Globe, Zap, Users, Shield, Award } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Tecnología Futurista",
      description: "Integramos IA, realidad virtual y gamificación para crear experiencias de aprendizaje de valores verdaderamente transformadoras."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Impacto Global",
      description: "Transformamos organizaciones en todo el mundo, fortaleciendo culturas corporativas basadas en valores sólidos y principios éticos."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Metodología Revolucionaria",
      description: "Convertimos conceptos éticos abstractos en experiencias tangibles y memorables a través de narrativas interactivas."
    }
  ];

  const stats = [
    { number: "2024", label: "Año de Fundación", color: "from-cyan-400 to-blue-500" },
    { number: "50K+", label: "Profesionales Formados", color: "from-purple-400 to-pink-500" },
    { number: "98%", label: "Efectividad", color: "from-green-400 to-teal-500" },
    { number: "∞", label: "Valores Fortalecidos", color: "from-orange-400 to-red-500" }
  ];

  return (
    <section id="nosotros" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
            SOBRE NOSOTROS
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Pioneros en la fusión de valores corporativos con experiencias gaming futuristas. 
            Creamos el futuro de la educación en valores a través de la tecnología inmersiva.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Left Column - Story */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8">
                <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Nuestra Misión
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  En Integridad Corp, creemos que los valores no son solo conceptos abstractos, 
                  sino principios vivos que deben experimentarse, practicarse y fortalecerse 
                  constantemente a través de metodologías innovadoras.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Utilizamos la gamificación y tecnologías emergentes para crear experiencias 
                  inmersivas que fortalecen la integridad, honestidad, respeto y responsabilidad 
                  en el entorno corporativo del siglo XXI.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8">
                <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Visión 2030
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Convertirnos en la plataforma líder mundial para el desarrollo de valores 
                  corporativos a través de experiencias digitales immersivas, estableciendo 
                  un nuevo paradigma en la formación ética empresarial del futuro.
                </p>
              </div>
            </div>

            {/* Right Column - Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-gray-900/80 backdrop-blur-sm border border-gray-700 hover:border-cyan-500/50 rounded-2xl p-6 transition-all duration-500 hover:transform hover:scale-105"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-black group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-cyan-500/5 to-purple-500/5 backdrop-blur-sm border border-cyan-500/20 rounded-3xl p-8 mb-16">
            <h3 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              IMPACTO EN NÚMEROS
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-400 uppercase tracking-wider text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              EQUIPO FUTURISTA
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { role: "CEO & Fundador", name: "Dr. Elena Vásquez", specialty: "Ética Empresarial" },
                { role: "CTO & Innovador", name: "Ing. Carlos Mendoza", specialty: "Gamificación Avanzada" },
                { role: "CPO & Estratega", name: "Lic. Ana Torres", specialty: "Desarrollo Organizacional" }
              ].map((member, index) => (
                <div key={index} className="group">
                  <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-gray-700 hover:border-cyan-500/50 rounded-2xl p-6 transition-all duration-500 hover:transform hover:scale-105">
                    <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-10 h-10 text-black" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{member.name}</h4>
                    <p className="text-cyan-400 font-semibold mb-2">{member.role}</p>
                    <p className="text-gray-400 text-sm">{member.specialty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;