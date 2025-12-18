import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'НАЧАЛО' },
    { path: '/crew', label: 'ЕКИПАЖ' },
    { path: '/ship-status', label: 'СТАТУС' },
    { path: '/navigation', label: 'НАВИГАЦИЯ' },
    { path: '/life-support', label: 'ЖИЗНЕНА ПОДДРЪЖКА' },
    { path: '/communications', label: 'КОМУНИКАЦИИ' },
    { path: '/mission-log', label: 'ДНЕВНИК' },
  ];

  return (
    <motion.nav 
      initial={false}
      animate={{
        y: isScrolled ? 16 : 0,
        x: '-50%',
        width: isScrolled ? 'calc(100% - 32px)' : '100%',
        borderRadius: isScrolled ? '12px' : '0px',
        maxWidth: isScrolled ? '1200px' : '100%',
      }}
      className={`fixed left-1/2 z-50 transition-colors duration-500 ${
        isScrolled 
          ? 'bg-space-dark/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]' 
          : 'bg-transparent border-b border-white/5'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? 'h-14' : 'h-20'}`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/images/655cb1bcbdfe565b18cde5bd_Risorsa%2053.svg" 
              alt="Endurance Logo" 
              className={`object-contain transition-all duration-500 ${isScrolled ? 'w-6 h-6' : 'w-8 h-8'} drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]`}
            />
            <span className={`font-orbitron font-bold transition-all duration-500 ${isScrolled ? 'text-lg' : 'text-xl'}`}>ENDURANCE</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-rajdhani font-semibold text-xs tracking-widest transition-all duration-300 relative ${
                  location.pathname === item.path
                    ? 'text-hologram-green'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-hologram-green"
                    layoutId="underline"
                    style={{ boxShadow: '0 0 10px #10b981' }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden pb-4"
            >
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 font-rajdhani font-semibold text-sm tracking-widest ${
                    location.pathname === item.path
                      ? 'text-hologram-green'
                      : 'text-gray-400'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};
