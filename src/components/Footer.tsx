import React from 'react';
import { Mail, Phone, MapPin, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    company: [
      { name: 'Sobre Nosotros', href: '#nosotros' },
      { name: 'Nuestros Valores', href: '#valores' },
      { name: 'Metodología', href: '#metodologia' },
      { name: 'Casos de Éxito', href: '#casos' }
    ],
    products: [
      { name: 'Plataforma Gaming', href: '#juego' },
      { name: 'Niveles de Valores', href: '#niveles' },
      { name: 'Evaluaciones', href: '#evaluaciones' },
      { name: 'Certificaciones', href: '#certificaciones' }
    ],
    resources: [
      { name: 'Recursos', href: '#recursos' },
      { name: 'Documentación', href: '#docs' },
      { name: 'Blog Integridad', href: '#blog' },
      { name: 'Contacto', href: '#contacto' }
    ]
  };

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: '#', name: 'Twitter' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', name: 'Instagram' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', name: 'LinkedIn' }
  ];

  return (
    <footer className="relative bg-gradient-to-t from-black via-gray-900 to-transparent border-t border-cyan-500/30">
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg">I</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                  INTEGRIDAD CORP
                </span>
                <span className="text-xs text-gray-400 uppercase tracking-wider">
                  Valores Corporativos Futuristas
                </span>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
              Plataforma líder en formación de valores corporativos a través de experiencias 
              gaming inmersivas. Transformamos la ética empresarial del futuro.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>contacto@integridadcorp.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Ciudad de México, México</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-white font-bold mb-4">Empresa</h4>
            <ul className="space-y-2">
              {links.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Productos</h4>
            <ul className="space-y-2">
              {links.products.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Recursos</h4>
            <ul className="space-y-2">
              {links.resources.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 backdrop-blur-sm border border-amber-500/30 rounded-2xl p-8 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
              NEWSLETTER INTEGRIDAD
            </h3>
            <p className="text-gray-400 mb-6">
              Recibe contenido exclusivo sobre valores corporativos, metodologías innovadoras y casos de éxito.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none"
              />
              <button className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
                SUSCRIBIRSE
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-800">
          <p className="text-gray-500 mb-4 md:mb-0">
            © {currentYear} Integridad Corp. Todos los derechos reservados. Ciudad de México, México.
          </p>

          <div className="flex items-center space-x-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="p-2 bg-gray-800 hover:bg-amber-500/20 rounded-lg text-gray-400 hover:text-amber-400 transition-all duration-300 hover:scale-110"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Tech Credits */}
        <div className="text-center mt-8 pt-6 border-t border-gray-800">
          <p className="text-xs text-gray-600">
            Powered by React + TypeScript + Tailwind CSS + Integridad Corp Innovation
          </p>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </footer>
  );
};

export default Footer;