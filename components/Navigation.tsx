'use client';

import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Update active section based on scroll position with improved detection
      const sections = ['hero', 'projects', 'experience', 'contact'];

      // Check if we're at the bottom of the page (for contact section)
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;

      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      // Find section that is most visible in viewport
      let maxVisibility = 0;
      let mostVisibleSection = 'hero';

      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          // Calculate how much of the section is visible
          const visibleTop = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
          const visibility = visibleTop / viewportHeight;

          // Prioritize sections near the top of viewport
          const topBonus = rect.top < 100 && rect.top > -100 ? 0.3 : 0;
          const totalScore = visibility + topBonus;

          if (totalScore > maxVisibility) {
            maxVisibility = totalScore;
            mostVisibleSection = sectionId;
          }
        }
      });

      setActiveSection(mostVisibleSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home', href: '/#hero' },
    { id: 'projects', label: 'Projects', href: '/#projects' },
    { id: 'blog', label: 'Blog', href: '/blog', isRoute: true },
    { id: 'experience', label: 'Experience', href: '/#experience' },
    { id: 'contact', label: 'Contact', href: '/#contact' },
  ];

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-[var(--border)] z-50">
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transition-all duration-300 ease-out"
          style={{
            width: `${scrollProgress}%`
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled
            ? 'bg-[var(--background)]/95 backdrop-blur-sm border-b border-[var(--border)] shadow-sm'
            : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Name */}
            <Link
              href="/#hero"
              className="flex items-center gap-2 text-lg font-medium text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
            >
              <Image
                src={theme === "dark" ? "/dark.png" : "/logo-light.png"}
                alt="Himanshoo Thakre Logo"
                width={32}
                height={32}
                className="object-contain transition-opacity"
                priority
              />
            </Link>


            {/* Navigation links and theme toggle */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = item.isRoute
                  ? pathname?.startsWith(item.href)
                  : activeSection === item.id;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`px-4 py-2 rounded-sm text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105 ${
                      isActive
                        ? 'text-[var(--accent)] bg-[var(--accent-light)]'
                        : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--accent-light)]/50'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {/* Dark mode toggle */}
              <button
                onClick={toggleTheme}
                className="ml-2 p-2 rounded-sm text-[var(--muted)] hover:text-[var(--foreground)]
                         hover:bg-[var(--accent-light)]/50 transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-12"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <svg className="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile menu button and theme toggle */}
            <div className="md:hidden flex items-center gap-2">
              {/* Dark mode toggle (mobile) */}
              <button
                onClick={toggleTheme}
                className="p-2 text-[var(--foreground)] hover:text-[var(--accent)] transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-12"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <svg className="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              <MobileMenu navItems={navItems} activeSection={activeSection} pathname={pathname} />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

function MobileMenu({ navItems, activeSection, pathname }: { navItems: any[]; activeSection: string; pathname: string | null }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-[var(--foreground)] hover:text-[var(--accent)] transition-all duration-300 ease-in-out transform hover:scale-110"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6 transition-transform duration-300"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[var(--card-bg)] border-b border-[var(--border)] shadow-lg animate-slide-down">
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item, index) => {
              const isActive = item.isRoute
                ? pathname?.startsWith(item.href)
                : activeSection === item.id;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-sm text-sm font-medium transition-all duration-300 ease-in-out transform hover:translate-x-1 ${
                    isActive
                      ? 'text-[var(--accent)] bg-[var(--accent-light)]'
                      : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--accent-light)]/50'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
