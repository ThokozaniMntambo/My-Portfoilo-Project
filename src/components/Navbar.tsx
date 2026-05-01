import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2 } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '0 2rem',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.3s ease',
          background: scrolled
            ? 'rgba(6, 8, 16, 0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.07)'
            : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Code2 size={18} color="#fff" />
          </div>
          <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#f0f6ff' }}>
            TM<span style={{ color: '#00d4ff' }}>.</span>
          </span>
        </a>

        {/* Desktop Links */}
        <ul style={{
          display: 'flex', gap: '2.5rem', listStyle: 'none',
          alignItems: 'center',
        }}
          className="nav-desktop"
        >
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                onClick={(e) => { e.preventDefault(); handleNav(l.href); }}
                style={{
                  fontSize: '0.9rem', fontWeight: 500,
                  color: 'var(--text-secondary)',
                  transition: 'color 0.2s',
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#00d4ff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNav('#contact'); }}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: 8,
                border: '1px solid rgba(0,212,255,0.4)',
                color: '#00d4ff',
                fontSize: '0.85rem',
                fontWeight: 600,
                transition: 'all 0.2s',
                background: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0,212,255,0.1)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Hire Me
            </a>
          </li>
        </ul>

        {/* Mobile Burger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="nav-mobile"
          style={{
            background: 'none', border: 'none',
            color: 'var(--text-primary)', padding: 4,
          }}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', top: 72, left: 0, right: 0, zIndex: 999,
              background: 'rgba(6, 8, 16, 0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              padding: '1.5rem 2rem 2rem',
              display: 'flex', flexDirection: 'column', gap: '1.5rem',
            }}
          >
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => { e.preventDefault(); handleNav(l.href); }}
                style={{
                  fontSize: '1.1rem', fontWeight: 500,
                  color: 'var(--text-secondary)',
                  borderBottom: '1px solid var(--border)',
                  paddingBottom: '1rem',
                }}
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
