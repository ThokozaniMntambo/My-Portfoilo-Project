import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Code2 } from 'lucide-react';
import { GithubIcon } from './GithubIcon';

const projects = [
  {
    title: 'E-Commerce Platform',
    description:
      'A full-stack online store with product catalog, shopping cart, user auth, and Stripe payments. Built with React, Node.js, Express, and PostgreSQL.',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Stripe'],
    github: 'https://github.com',
    live: '#',
    featured: true,
    gradient: 'linear-gradient(135deg, rgba(0,212,255,0.12), rgba(124,58,237,0.12))',
  },
  {
    title: 'Task Management App',
    description:
      'A productivity app with drag-and-drop boards, real-time updates via WebSockets, and team collaboration features.',
    tags: ['React', 'TypeScript', 'Socket.io', 'MongoDB'],
    github: 'https://github.com',
    live: '#',
    featured: true,
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(16,185,129,0.12))',
  },
  {
    title: 'REST API Service',
    description:
      'A scalable RESTful API with JWT authentication, rate limiting, caching with Redis, and full Swagger documentation.',
    tags: ['Node.js', 'Express', 'Redis', 'JWT', 'Swagger'],
    github: 'https://github.com',
    live: null,
    featured: true,
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(0,212,255,0.12))',
  },
  {
    title: 'Weather Dashboard',
    description:
      'Real-time weather app with geolocation, 7-day forecasts, and interactive charts powered by a public weather API.',
    tags: ['React', 'Vite', 'Chart.js', 'API'],
    github: 'https://github.com',
    live: '#',
    featured: false,
    gradient: 'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(124,58,237,0.08))',
  },
  {
    title: 'Portfolio CMS',
    description:
      'A headless CMS built with Express and MongoDB to manage portfolio content dynamically via a secure admin panel.',
    tags: ['Express', 'MongoDB', 'Admin UI'],
    github: 'https://github.com',
    live: null,
    featured: false,
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(16,185,129,0.08))',
  },
  {
    title: 'Dev Blog',
    description:
      'A markdown-powered developer blog with syntax highlighting, dark mode, and optimized static generation.',
    tags: ['React', 'Markdown', 'Vite'],
    github: 'https://github.com',
    live: '#',
    featured: false,
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(0,212,255,0.08))',
  },
];

function ProjectCard({ project, delay }: { project: typeof projects[0]; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -6 }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: '1.75rem',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        display: 'flex', flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0,212,255,0.25)';
        e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,212,255,0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Gradient BG */}
      <div style={{ position: 'absolute', inset: 0, background: project.gradient, pointerEvents: 'none' }} />

      {/* Icon + Links */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', position: 'relative' }}>
        <div style={{
          width: 44, height: 44, borderRadius: 10,
          background: 'rgba(0,212,255,0.1)',
          border: '1px solid rgba(0,212,255,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Code2 size={20} color="#00d4ff" />
        </div>
        <div style={{ display: 'flex', gap: '0.6rem' }}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              style={{
                color: 'var(--text-muted)', transition: 'color 0.2s',
                display: 'flex', alignItems: 'center',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#00d4ff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <GithubIcon size={18} />
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              style={{
                color: 'var(--text-muted)', transition: 'color 0.2s',
                display: 'flex', alignItems: 'center',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#00d4ff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.6rem', position: 'relative' }}>
        {project.title}
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.25rem', position: 'relative', flex: 1 }}>
        {project.description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', position: 'relative' }}>
        {project.tags.map((tag) => (
          <span key={tag} style={{
            padding: '0.25rem 0.65rem',
            borderRadius: 100,
            background: 'rgba(0,212,255,0.07)',
            border: '1px solid rgba(0,212,255,0.15)',
            fontSize: '0.75rem',
            color: '#00d4ff',
            fontFamily: "'Fira Code', monospace",
          }}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" style={{ padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <p style={{ fontFamily: "'Fira Code', monospace", color: '#00d4ff', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
            03. projects
          </p>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700, color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
          }}>
            Things I've Built
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '1rem auto 0', fontSize: '0.95rem' }}>
            A selection of personal and professional projects that showcase my skills.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
          gap: '1.5rem',
        }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} delay={i * 0.1} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ textAlign: 'center', marginTop: '3rem' }}
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              padding: '0.75rem 1.75rem',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 10, color: 'var(--text-secondary)',
              fontSize: '0.9rem', fontWeight: 500,
              transition: 'all 0.25s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0,212,255,0.35)';
              e.currentTarget.style.color = '#00d4ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            <GithubIcon size={16} />
            View More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
