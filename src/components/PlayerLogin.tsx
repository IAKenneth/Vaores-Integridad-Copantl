import React, { useState } from 'react';
import { User, Mail, Play } from 'lucide-react';

interface PlayerLoginProps {
  onLogin: (name: string, email?: string) => void;
  loading: boolean;
}

const PlayerLogin: React.FC<PlayerLoginProps> = ({ onLogin, loading }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showEmailField, setShowEmailField] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim(), email.trim() || undefined);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-black" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
            ¡ÚNETE AL JUEGO!
          </h2>
          <p className="text-gray-300">
            Ingresa tu nombre para comenzar a jugar y competir en el ranking
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Nombre del Jugador *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors duration-300"
              placeholder="Tu nombre aquí..."
              required
              maxLength={50}
            />
          </div>

          {showEmailField && (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email (Opcional)
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none transition-colors duration-300"
                placeholder="tu@email.com"
              />
            </div>
          )}

          <div className="flex flex-col space-y-3">
            <button
              type="submit"
              disabled={!name.trim() || loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>COMENZAR A JUGAR</span>
                </>
              )}
            </button>

            {!showEmailField && (
              <button
                type="button"
                onClick={() => setShowEmailField(true)}
                className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors duration-300 flex items-center justify-center space-x-1"
              >
                <Mail className="w-4 h-4" />
                <span>Agregar email (opcional)</span>
              </button>
            )}
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Tu progreso se guardará automáticamente y aparecerás en el ranking global
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerLogin;