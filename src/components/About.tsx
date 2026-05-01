import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Coffee, Laptop, GraduationCap } from 'lucide-react';

const stats = [
  { value: '1', label: 'Year Experience' },
  { value: '6', label: 'Projects Built' },
  { value: '10+', label: 'Technologies' },
  { value: '100%', label: 'Commitment' },
];

const facts = [
  { icon: MapPin, text: 'Based in South Africa Johannesburg' },
  { icon: Laptop, text: 'Full-Stack Developer' },
  { icon: GraduationCap, text: 'Continuous Learner' },
  { icon: Coffee, text: 'Fueled by Coffee & Code' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" style={{ padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }} ref={ref}>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <p style={{ fontFamily: "'Fira Code', monospace", color: '#00d4ff', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
            01. about_me
          </p>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700, color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
          }}>
            Who I Am
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'start',
        }}>
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 16,
              padding: '2rem',
            }}>
              {/* Graduation Photo */}
              <div style={{ position: 'relative', width: 110, height: 110, marginBottom: '1.5rem' }}>
                {/* Animated glow ring */}
                <div style={{
                  position: 'absolute', inset: -4,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                  animation: 'spin 4s linear infinite',
                  zIndex: 0,
                }} />
                {/* White gap ring */}
                <div style={{
                  position: 'absolute', inset: -1,
                  borderRadius: '50%',
                  background: 'var(--bg-card)',
                  zIndex: 1,
                }} />
                {/* Photo */}
                <img
                  src="/grad.jpeg"
                  alt="Thokozani Mntambo — graduation photo"
                  style={{
                    position: 'relative', zIndex: 2,
                    width: 110, height: 110,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block',
                    transform: 'rotate(90deg)',
                  }}
                />
              </div>
              <style>{`
                @keyframes spin {
                  from { transform: rotate(0deg); }
                  to   { transform: rotate(360deg); }
                }
              `}</style>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                Thokozani Mntambo
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: '1rem', fontSize: '0.95rem' }}>
               I’m a Software Developer from South Africa focused on building real-world web applications using Java and React.

I enjoy turning ideas into practical solutions, with a strong focus on clean code, performance, and user experience.

I’m currently looking for an internship or junior developer role where I can contribute, learn, and grow as a developer.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: '0.95rem' }}>
                My stack centers around <span style={{ color: '#00d4ff' }}>React</span>,{' '}
                <span style={{ color: '#00d4ff' }}> Java , JavaScript , Node.js </span>, and{' '}
                <span style={{ color: '#00d4ff' }}>TypeScript</span>. I'm always exploring
                new technologies and pushing the boundaries of what I can build.
              </p>

              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {facts.map(({ icon: Icon, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8,
                      background: 'rgba(0,212,255,0.08)',
                      border: '1px solid rgba(0,212,255,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon size={15} color="#00d4ff" />
                    </div>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Stats + More */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            {/* Stats Grid */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem',
            }}>
              {stats.map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 12, padding: '1.5rem',
                    textAlign: 'center',
                    position: 'relative', overflow: 'hidden',
                  }}
                >
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg, rgba(0,212,255,0.03), transparent)',
                  }} />
                  {value !== null ? (
                    <div style={{
                      fontSize: '2rem', fontWeight: 800, color: '#00d4ff',
                      lineHeight: 1, marginBottom: '0.4rem',
                    }}>
                      {value}
                    </div>
                  ) : (
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                      margin: '0 auto 0.5rem',
                    }} />
                  )}
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                    {label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* What I Do */}
            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 16, padding: '1.75rem',
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                What I Do
              </h3>
              {[
                { title: 'Frontend Development', desc: 'Building responsive, performant UIs with React & TypeScript' },
                { title: 'Backend Development', desc: 'RESTful APIs and server-side logic with Node.js & Express' },
                { title: 'Database Design', desc: 'Modeling and querying with SQL & NoSQL databases' },
              ].map(({ title, desc }) => (
                <div key={title} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00d4ff', flexShrink: 0 }} />
                    <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{title}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '1rem' }}>{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
