'use client';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl w-full">
        <div className="space-y-8">
          {/* Status indicator */}
          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse"></div>
            <span>System Active</span>
          </div>

          {/* Name and role */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-[var(--foreground)]">
              Himanshoo Thakre
            </h1>
            <p className="text-xl md:text-2xl text-[var(--muted)] font-light">
              Full-Stack Developer
            </p>
          </div>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-[var(--foreground)] max-w-2xl leading-relaxed">
            Building production systems with thoughtful architecture.
            I solve complex problems through clean code and pragmatic engineering decisions.
          </p>

          {/* CTA buttons */}
          <div className="flex gap-4 pt-4">
            <a
              href="#projects"
              className="px-6 py-3 bg-[var(--foreground)] text-[var(--background)]
                       rounded-sm hover:opacity-90 transition-all duration-200
                       hover:shadow-lg font-medium"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-[var(--border)] text-[var(--foreground)]
                       rounded-sm hover:border-[var(--border-hover)] hover:bg-[var(--card-bg)]
                       transition-all duration-200 font-medium"
            >
              Contact
            </a>
          </div>

          {/* Metadata */}
          <div className="pt-8 flex gap-6 text-sm text-[var(--muted)]">
            <div>
              <span className="opacity-60">Location:</span> Remote
            </div>
            <div>
              <span className="opacity-60">Last Deploy:</span> {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
