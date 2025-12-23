'use client';

import { useState } from 'react';

interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  responsibilities: string[];
  impact: string[];
}

const experienceData: Experience[] = [
  {
    id: 'exp-1',
    title: 'Full Stack Developer Intern',
    company: 'Insteasy',
    period: 'May 2025 - Jul 2025',
    location: 'Remote',
    summary: 'Developing full-stack solutions with modern web technologies',
    responsibilities: [
      'Increased subscription conversion by 35% by integrating PayPal Gateway via REST APIs, ensuring seamless transactions and security',
      'Boosted visibility and lead generation by 15% by developing a marketing website using ReactJS, hosted on Hostinger with optimized SEO',
      'Improved efficiency and accelerated task release by 20% by implementing I/O-driven plugins on monday.com, integrating Google apps in monorepo architecture',
      'Enhanced workflow efficiency by deploying embeddings-based plugins on monday.com, integrating Google apps in monorepo architecture'
    ],
    impact: [
      '35% increase in subscription conversion through PayPal integration',
      '15% boost in visibility and lead generation with SEO-optimized marketing site',
      '20% faster task release with improved workflow automation'
    ]
  },
  {
    id: 'exp-2',
    title: 'Full Stack Developer Intern',
    company: 'Insteasy',
    period: 'May 2024 - Jul 2024',
    location: 'Remote',
    summary: 'Built and optimized full-stack web applications',
    responsibilities: [
      'Increased net load speed by 25% and strengthened UI consistency by refactoring and redesigning the dashboard using Angular and Ionic',
      'Reduced server response time by 15% and enhanced core system performance by developing and optimizing reusable REST API endpoints',
      'Lowered user drop-off rate by 20% and streamlined seamless onboarding by implementing OAuth for third-party login, boosting security',
      'Ensured a reliable, scalable, and secure environment by deploying the application on Heroku, streamlining smooth deployment processes'
    ],
    impact: [
      '25% improvement in load speed with UI refactoring using Angular and Ionic',
      '15% reduction in server response time through optimized REST APIs',
      '20% decrease in user drop-off with OAuth implementation',
      'Reliable deployment pipeline established on Heroku'
    ]
  }
];

export default function Timeline() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[var(--card-bg)] scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--muted)] mb-4">
            <span className="opacity-60">/</span>
            <span>Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[var(--foreground)]">
            Work History
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted)] mt-3 sm:mt-4 max-w-2xl">
            Professional experience building and scaling production systems.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mb-16 sm:mb-20">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-[var(--border)]"></div>

          {/* Experience items */}
          <div className="space-y-8">
            {experienceData.map((exp, index) => (
              <TimelineItem
                key={exp.id}
                experience={exp}
                isExpanded={expandedId === exp.id}
                onToggle={() => toggleExpand(exp.id)}
                isLast={false}
              />
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-[var(--muted)] mb-4 sm:mb-6">
            <span className="opacity-60">/</span>
            <span>Education</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-[var(--foreground)] mb-6 sm:mb-8">
            Academic Background
          </h2>
        </div>

        {/* Education Card */}
        <div className="relative pl-6 sm:pl-8">
          {/* Timeline dot */}
          <div className="absolute left-0 top-2 w-2 h-2 -translate-x-[3.5px] bg-[var(--accent)] rounded-full
                      ring-4 ring-[var(--card-bg)]"></div>

          <div className="bg-[var(--background)] border border-[var(--border)] rounded-sm p-4 sm:p-5 md:p-6
                       hover:border-[var(--border-hover)] hover:shadow-[0_2px_8px_var(--shadow-md)]
                       transition-all duration-200">
            <div className="space-y-2 sm:space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base sm:text-lg font-medium text-[var(--foreground)] leading-tight">
                  B.Tech (Hons.) in Chemical Engineering
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-sm sm:text-base text-[var(--foreground)] font-medium">IIT Kharagpur</span>
                <span className="text-[var(--muted)] hidden sm:inline">•</span>
                <span className="text-xs sm:text-sm text-[var(--muted)]">2021 - 2025</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[var(--muted)]">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <span>M.Tech Dual Degree (5Y)</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[var(--muted)] pt-1 sm:pt-2">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>CGPA: 7.49/10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  experience,
  isExpanded,
  onToggle,
  isLast
}: {
  experience: Experience;
  isExpanded: boolean;
  onToggle: () => void;
  isLast: boolean;
}) {
  return (
    <div className="relative pl-6 sm:pl-8">
      {/* Timeline dot */}
      <div className="absolute left-0 top-2 w-2 h-2 -translate-x-[3.5px] bg-[var(--accent)] rounded-full
                      ring-4 ring-[var(--card-bg)]"></div>

      {/* Card */}
      <div
        className="bg-[var(--background)] border border-[var(--border)] rounded-sm
                   transition-all duration-200 hover:border-[var(--border-hover)]
                   hover:shadow-[0_2px_8px_var(--shadow-md)]"
      >
        <button
          onClick={onToggle}
          className="w-full p-4 sm:p-5 text-left hover:bg-[var(--accent-light)] transition-colors duration-200"
        >
          <div className="flex items-start justify-between gap-3 sm:gap-4">
            <div className="flex-1 space-y-2 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <h3 className="text-base sm:text-lg font-medium text-[var(--foreground)] leading-tight">
                  {experience.title}
                </h3>
                <span className="text-[var(--muted)] text-sm sm:text-base">@</span>
                <span className="text-sm sm:text-base text-[var(--foreground)]">{experience.company}</span>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-[var(--muted)]">
                <span>{experience.period}</span>
                <span className="hidden sm:inline">•</span>
                <span>{experience.location}</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--muted)] pt-1 leading-relaxed">
                {experience.summary}
              </p>
            </div>
            <div className="text-[var(--muted)] text-lg sm:text-xl transition-transform duration-300 flex-shrink-0"
                 style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              ↓
            </div>
          </div>
        </button>

        {/* Expanded content */}
        <div
          className="overflow-hidden transition-all duration-300"
          style={{
            maxHeight: isExpanded ? '1000px' : '0',
            opacity: isExpanded ? 1 : 0
          }}
        >
          <div className="px-4 sm:px-5 pb-4 sm:pb-5 space-y-4 sm:space-y-5 border-t border-[var(--border)] pt-4 sm:pt-5">
            {/* Responsibilities */}
            <div>
              <h4 className="text-[10px] sm:text-xs font-medium text-[var(--muted)] uppercase tracking-wide mb-2 sm:mb-3">
                Key Responsibilities
              </h4>
              <ul className="space-y-2 sm:space-y-2.5">
                {experience.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex gap-2 sm:gap-3 text-[var(--foreground)]">
                    <span className="text-[var(--accent)] mt-0.5 sm:mt-1 flex-shrink-0">→</span>
                    <span className="text-xs sm:text-sm leading-relaxed">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Impact */}
            <div>
              <h4 className="text-[10px] sm:text-xs font-medium text-[var(--muted)] uppercase tracking-wide mb-2 sm:mb-3">
                Impact & Achievements
              </h4>
              <ul className="space-y-2 sm:space-y-2.5">
                {experience.impact.map((item, idx) => (
                  <li key={idx} className="flex gap-2 sm:gap-3 text-[var(--foreground)]">
                    <span className="text-[var(--accent)] flex-shrink-0 text-sm sm:text-base">✓</span>
                    <span className="text-xs sm:text-sm font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
