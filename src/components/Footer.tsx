import { Mail, Heart, Code2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './GithubIcon';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '2.5rem 1.5rem',
      background: 'rgba(0,0,0,0.3)',
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'flex', flexWrap: 'wrap',
        justifyContent: 'space-between', alignItems: 'center',
        gap: '1.5rem',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: 32, height: 32, borderRadius: 7,
            background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Code2 size={15} color="#fff" />
          </div>
          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
            TM<span style={{ color: '#00d4ff' }}>.</span>
          </span>
        </div>

        {/* Credit */}
        <p style={{
          fontSize: '0.82rem', color: 'var(--text-muted)',
          display: 'flex', alignItems: 'center', gap: '0.3rem', flexWrap: 'wrap', justifyContent: 'center',
        }}>
          © {year} Thokozani Mntambo · Built with
          <Heart size={12} color="#f87171" fill="#f87171" />
          using React & Node.js
        </p>

        {/* Socials */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {[
            { icon: GithubIcon, href: 'https://github.com', label: 'GitHub' },
            { icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:thokozani@email.com', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: 36, height: 36, borderRadius: 8,
                border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-muted)', transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0,212,255,0.35)';
                e.currentTarget.style.color = '#00d4ff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color = 'var(--text-muted)';
              }}
            >
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
