import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const categories = [
  {
    name: 'Frontend',
    color: '#00d4ff',
    skills: [
      { name: 'React', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'HTML & CSS', level: 95 },
      { name: 'Vite', level: 85 },
      { name: 'Tailwind CSS', level: 80 },
    ],
  },
  {
    name: 'Backend',
    color: '#7c3aed',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Express.js', level: 87 },
      { name: 'REST APIs', level: 90 },
      { name: 'GraphQL', level: 65 },
      { name: 'Python', level: 70 },
    ],
  },
  {
    name: 'Database & Tools',
    color: '#10b981',
    skills: [
      { name: 'PostgreSQL', level: 80 },
      { name: 'MongoDB', level: 78 },
      { name: 'Git & GitHub', level: 92 },
      { name: 'Docker', level: 65 },
      { name: 'Linux', level: 75 },
    ],
  },
];

const techBadges = [
  'React', 'TypeScript', 'JavaScript', 'Node.js', 'Express', 'Vite',
  'HTML5', 'CSS3', 'PostgreSQL', 'MongoDB', 'Git', 'Docker',
  'Tailwind', 'GraphQL', 'Python', 'Linux', 'REST API', 'Jest',
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" style={{
      padding: '6rem 1.5rem',
      background: 'linear-gradient(180deg, transparent, rgba(124,58,237,0.04) 50%, transparent)',
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
            02. skills
          </p>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700, color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
          }}>
            Technologies I Work With
          </h2>
        </motion.div>

        {/* Skill Category Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}>
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * ci }}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 16, padding: '1.75rem',
                position: 'relative', overflow: 'hidden',
              }}
            >
              {/* Top accent line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${cat.color}, transparent)`,
              }} />

              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                <span style={{ color: cat.color, fontFamily: "'Fira Code', monospace" }}>{'// '}</span>
                {cat.name}
              </h3>

              {cat.skills.map((skill, si) => (
                <div key={skill.name} style={{ marginBottom: '1.1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                      {skill.name}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: cat.color, fontFamily: "'Fira Code', monospace" }}>
                      {skill.level}%
                    </span>
                  </div>
                  <div style={{
                    height: 5, borderRadius: 100,
                    background: 'rgba(255,255,255,0.06)',
                    overflow: 'hidden',
                  }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: 0.3 + si * 0.1, ease: 'easeOut' }}
                      style={{
                        height: '100%', borderRadius: 100,
                        background: `linear-gradient(90deg, ${cat.color}, ${cat.color}88)`,
                        boxShadow: `0 0 8px ${cat.color}50`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Tech Badge Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 16, padding: '2rem',
            textAlign: 'center',
          }}
        >
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: "'Fira Code', monospace", marginBottom: '1.25rem' }}>
            tech_stack.map(tech =&gt; {'<Badge />'})</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}>
            {techBadges.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.04 }}
                whileHover={{ scale: 1.08, y: -2 }}
                style={{
                  padding: '0.35rem 0.9rem',
                  borderRadius: 100,
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.03)',
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  cursor: 'default',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0,212,255,0.35)';
                  e.currentTarget.style.color = '#00d4ff';
                  e.currentTarget.style.background = 'rgba(0,212,255,0.07)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
