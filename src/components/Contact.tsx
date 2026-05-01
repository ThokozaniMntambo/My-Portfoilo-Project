import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Mail, Send, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './GithubIcon';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Server error');
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or email me directly.');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: '0.85rem 1rem',
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    fontFamily: 'Inter, sans-serif',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    marginBottom: '0.4rem',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  };

  return (
    <section id="contact" style={{
      padding: '6rem 1.5rem',
      background: 'linear-gradient(180deg, transparent, rgba(0,212,255,0.03) 50%, transparent)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }} ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <p style={{ fontFamily: "'Fira Code', monospace", color: '#00d4ff', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
            04. contact
          </p>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700, color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
          }}>
            Let's Work Together
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 480, margin: '1rem auto 0', fontSize: '0.95rem' }}>
            Have a project in mind or just want to say hello? My inbox is always open.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start',
        }}>
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            {[
              {
                icon: Mail, title: 'Email Me',
                value: 'thokozanimntamb@gmail.com',
                href: 'https://thokozanimntamb@gmail.com',
                color: '#00d4ff',
              },
              {
                icon: GithubIcon, title: 'GitHub',
                value: 'github.com/thokozani',
                href: 'https://github.com/ThokozaniMntambo',
                color: '#7c3aed',
              },
              {
                icon: LinkedinIcon, title: 'LinkedIn',
                value: 'linkedin.com/in/thokozani',
                href: 'https://www.linkedin.com/in/thokozani-mntambo',
                color: '#0ea5e9',
              },
              {
                icon: MessageSquare, title: 'Open to',
                value: 'Full-time & Freelance roles',
                href: null,
                color: '#10b981',
              },
            ].map(({ icon: Icon, title, value, href, color }) => (
              <div key={title} style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: '1.25rem',
                display: 'flex', alignItems: 'center', gap: '1rem',
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                  background: `${color}12`,
                  border: `1px solid ${color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={18} color={color} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.15rem' }}>
                    {title}
                  </div>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = color)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                    >
                      {value}
                    </a>
                  ) : (
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{value}</span>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 16, padding: '2rem',
            }}>
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '2rem 0' }}
                >
                  <CheckCircle size={52} color="#10b981" style={{ margin: '0 auto 1rem' }} />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    Message Sent!
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Thanks for reaching out. I'll get back to you soon.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    style={{
                      marginTop: '1.5rem',
                      padding: '0.6rem 1.5rem',
                      background: 'rgba(0,212,255,0.1)',
                      border: '1px solid rgba(0,212,255,0.3)',
                      borderRadius: 8,
                      color: '#00d4ff',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    }}
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={labelStyle}>Name</label>
                      <input
                        type="text" name="name" required
                        value={form.name} onChange={handleChange}
                        placeholder="Thabo Nkosi"
                        style={inputStyle}
                        onFocus={(e) => { e.target.style.borderColor = 'rgba(0,212,255,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.08)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Email</label>
                      <input
                        type="email" name="email" required
                        value={form.email} onChange={handleChange}
                        placeholder="thabo@email.com"
                        style={inputStyle}
                        onFocus={(e) => { e.target.style.borderColor = 'rgba(0,212,255,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.08)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Subject</label>
                    <input
                      type="text" name="subject" required
                      value={form.subject} onChange={handleChange}
                      placeholder="Project Collaboration"
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = 'rgba(0,212,255,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.08)'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Message</label>
                    <textarea
                      name="message" required rows={5}
                      value={form.message} onChange={handleChange}
                      placeholder="Tell me about your project or idea..."
                      style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                      onFocus={(e) => { e.target.style.borderColor = 'rgba(0,212,255,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(0,212,255,0.08)'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>

                  {status === 'error' && (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      color: '#f87171', fontSize: '0.85rem',
                      background: 'rgba(248,113,113,0.08)',
                      border: '1px solid rgba(248,113,113,0.2)',
                      borderRadius: 8, padding: '0.75rem',
                    }}>
                      <AlertCircle size={15} />
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                      padding: '0.9rem',
                      background: status === 'loading'
                        ? 'rgba(0,212,255,0.3)'
                        : 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                      border: 'none', borderRadius: 10,
                      color: '#fff', fontSize: '0.95rem', fontWeight: 600,
                      transition: 'all 0.3s',
                      boxShadow: '0 0 30px rgba(0,212,255,0.2)',
                      cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      if (status !== 'loading') {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,212,255,0.35)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 0 30px rgba(0,212,255,0.2)';
                    }}
                  >
                    {status === 'loading' ? (
                      <>Sending...</>
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
