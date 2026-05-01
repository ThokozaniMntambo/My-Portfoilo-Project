import { motion } from "framer-motion";
import type { Easing } from "framer-motion";
import { Mail, ArrowDown, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./GithubIcon";

const EASE: Easing = "easeOut";
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE },
});

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "0 1.5rem",
      }}
    >
      {/* Background Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
          linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)
        `,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* Glow Orbs */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "10%",
          width: 350,
          height: 350,
          background:
            "radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 900,
          width: "100%",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Profile Photo */}
        <motion.div
          {...fadeUp(0.05)}
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1.75rem",
          }}
        >
          <div style={{ position: "relative", width: 130, height: 130 }}>
            <div
              style={{
                position: "absolute",
                inset: -3,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                animation: "spin 5s linear infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: "var(--bg-primary)",
              }}
            />
            <img
              src="/grad.jpeg"
              alt="Thokozani Mntambo"
              style={{
                position: "relative",
                zIndex: 1,
                width: 124,
                height: 124,
                borderRadius: "50%",
                objectFit: "cover",
                objectPosition: "center top",
                margin: "3px",
                display: "block",
                transform: "rotate(90deg)",
              }}
            />
          </div>
        </motion.div>

        {/* Terminal Badge */}
        <motion.div
          {...fadeUp(0.1)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(0,212,255,0.08)",
            border: "1px solid rgba(0,212,255,0.2)",
            borderRadius: 100,
            padding: "0.4rem 1rem",
            marginBottom: "2rem",
            fontSize: "0.8rem",
            color: "#00d4ff",
            fontFamily: "'Fira Code', monospace",
          }}
        >
          <Terminal size={13} />
          <span>Available for opportunities</span>
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#00d4ff",
              display: "inline-block",
              animation: "pulse 2s infinite",
            }}
          />
        </motion.div>

        {/* Name */}
        <motion.h1
          {...fadeUp(0.2)}
          style={{
            fontSize: "clamp(2.8rem, 7vw, 5rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: "0.5rem",
            color: "#f0f6ff",
          }}
        >
          Thokozani
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Mntambo
          </span>
        </motion.h1>

        {/* Role */}
        <motion.div
          {...fadeUp(0.35)}
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
            color: "var(--text-secondary)",
            marginBottom: "1.5rem",
            fontWeight: 400,
          }}
        >
          <span
            style={{
              color: "var(--text-muted)",
              fontFamily: "'Fira Code', monospace",
            }}
          >
            {"< "}
          </span>
          Software Developer
          <span
            style={{
              color: "var(--text-muted)",
              fontFamily: "'Fira Code', monospace",
            }}
          >
            {" />"}
          </span>
        </motion.div>

        {/* Bio */}
        <motion.p
          {...fadeUp(0.45)}
          style={{
            fontSize: "clamp(0.95rem, 1.8vw, 1.05rem)",
            color: "var(--text-secondary)",
            maxWidth: 600,
            margin: "0 auto 2.5rem",
            lineHeight: 1.8,
          }}
        >
          I build fast, accessible, and beautiful digital experiences.
          Passionate about clean code, modern architecture, and solving
          real-world problems with elegant solutions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          {...fadeUp(0.55)}
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "3rem",
          }}
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              padding: "0.8rem 2rem",
              background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
              color: "#fff",
              borderRadius: 10,
              fontWeight: 600,
              fontSize: "0.95rem",
              transition: "all 0.3s",
              boxShadow: "0 0 30px rgba(0,212,255,0.25)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 40px rgba(0,212,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 0 30px rgba(0,212,255,0.25)";
            }}
          >
            View My Work
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              padding: "0.8rem 2rem",
              background: "transparent",
              color: "var(--text-primary)",
              borderRadius: 10,
              fontWeight: 600,
              fontSize: "0.95rem",
              transition: "all 0.3s",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)";
              e.currentTarget.style.color = "#00d4ff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
              e.currentTarget.style.color = "var(--text-primary)";
            }}
          >
            Get In Touch
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          {...fadeUp(0.65)}
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            marginBottom: "4rem",
          }}
        >
          {[
            {
              icon: GithubIcon,
              href: "https://https://github.com/ThokozaniMntambo",
              label: "GitHub",
            },
            {
              icon: LinkedinIcon,
              href: "https://www.linkedin.com/in/thokozani-mntambo",
              label: "LinkedIn",
            },
            {
              icon: Mail,
              href: "https://thokozanimntamb@gmail.com",
              label: "Email",
            },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-secondary)",
                transition: "all 0.25s",
                background: "rgba(255,255,255,0.03)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)";
                e.currentTarget.style.color = "#00d4ff";
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.background = "rgba(0,212,255,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.color = "var(--text-secondary)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              }}
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{
            display: "flex",
            justifyContent: "center",
            color: "var(--text-muted)",
          }}
        >
          <ArrowDown size={22} />
        </motion.div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
