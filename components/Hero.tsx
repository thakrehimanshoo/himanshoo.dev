'use client';

import { useEffect, useState } from 'react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-16 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-4xl w-full relative z-10">
        <div className={`space-y-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Status indicator */}
          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse"></div>
            <span className="font-mono">System Active</span>
            <span className="opacity-40">•</span>
            <span className="opacity-60 font-mono">{new Date().toLocaleTimeString('en-US', { hour12: false })}</span>
          </div>

          {/* Name and role */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-[var(--foreground)] leading-none">
              Himanshoo Thakre
            </h1>
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-[var(--accent)]"></div>
              <p className="text-xl md:text-2xl text-[var(--muted)] font-light">
                Full-Stack Developer
              </p>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-[var(--foreground)] max-w-2xl leading-relaxed">
            Building production systems with thoughtful architecture.
            I solve complex problems through clean code and pragmatic engineering decisions.
          </p>

          {/* Tech stack quick view */}
          <div className="flex flex-wrap gap-2 pt-2">
            {['TypeScript', 'React', 'Angular', 'Node.js', 'Python', 'PostgreSQL', 'MongoDB'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-mono text-[var(--muted)] bg-[var(--card-bg)]
                         border border-[var(--border)] rounded-sm hover:border-[var(--accent)]
                         transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#projects"
              className="px-6 py-3 bg-[var(--foreground)] text-[var(--background)]
                       rounded-sm hover:scale-105 transition-all duration-200
                       hover:shadow-lg font-medium"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-[var(--border)] text-[var(--foreground)]
                       rounded-sm hover:border-[var(--accent)] hover:bg-[var(--accent-light)]
                       transition-all duration-200 font-medium"
            >
              Get in Touch
            </a>
            <a
              href="/resume.pdf"
              className="px-6 py-3 border border-[var(--border)] text-[var(--foreground)]
                       rounded-sm hover:border-[var(--border-hover)] hover:bg-[var(--card-bg)]
                       transition-all duration-200 font-medium flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume
            </a>
          </div>

          {/* Metadata */}
          <div className="pt-8 flex flex-wrap gap-6 text-sm text-[var(--muted)]">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="opacity-60">Location:</span> Remote
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="opacity-60">Last Deploy:</span> {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="opacity-60">Status:</span> Available for Work
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-[var(--muted)] opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
