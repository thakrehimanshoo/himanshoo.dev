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
    title: 'Senior Full-Stack Engineer',
    company: 'Tech Corp',
    period: '2022 - Present',
    location: 'Remote',
    summary: 'Lead engineering for core platform services',
    responsibilities: [
      'Architected and built distributed task queue processing 50K+ jobs/hour',
      'Led migration from monolith to microservices architecture',
      'Implemented real-time analytics dashboard with WebSocket infrastructure',
      'Mentored team of 4 junior engineers on system design and code quality'
    ],
    impact: [
      'Reduced infrastructure costs by 40% through system optimization',
      'Improved API response time from 800ms to 120ms average',
      'Decreased system downtime by 85% with better monitoring and alerts'
    ]
  },
  {
    id: 'exp-2',
    title: 'Full-Stack Developer',
    company: 'StartupXYZ',
    period: '2020 - 2022',
    location: 'Remote',
    summary: 'Built product features and scaled backend systems',
    responsibilities: [
      'Developed REST APIs serving 100K+ daily active users',
      'Built frontend features with React and TypeScript',
      'Implemented rate limiting and API security middleware',
      'Optimized PostgreSQL queries reducing load times by 60%'
    ],
    impact: [
      'Shipped 15+ major features supporting company growth from 10K to 100K users',
      'Reduced API abuse incidents to zero with rate limiting system',
      'Improved test coverage from 40% to 85% for critical services'
    ]
  },
  {
    id: 'exp-3',
    title: 'Junior Developer',
    company: 'Digital Agency',
    period: '2018 - 2020',
    location: 'On-site',
    summary: 'Web development for client projects',
    responsibilities: [
      'Built responsive websites and web applications',
      'Collaborated with designers to implement pixel-perfect UIs',
      'Integrated third-party APIs and payment systems',
      'Maintained and debugged existing client codebases'
    ],
    impact: [
      'Delivered 20+ client projects on time and within budget',
      'Reduced page load times by 50% through performance optimization',
      'Established testing practices adopted across development team'
    ]
  }
];

export default function Timeline() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="py-24 px-6 bg-[var(--card-bg)]">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-4">
            <span className="opacity-60">/</span>
            <span>Experience</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-[var(--foreground)]">
            Work History
          </h2>
          <p className="text-[var(--muted)] mt-4 max-w-2xl">
            Professional experience building and scaling production systems.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
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
                isLast={index === experienceData.length - 1}
              />
            ))}
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
    <div className="relative pl-8">
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
          className="w-full p-5 text-left hover:bg-[var(--accent-light)] transition-colors duration-200"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-medium text-[var(--foreground)]">
                  {experience.title}
                </h3>
                <span className="text-[var(--muted)]">@</span>
                <span className="text-[var(--foreground)]">{experience.company}</span>
              </div>
              <div className="flex gap-4 text-sm text-[var(--muted)]">
                <span>{experience.period}</span>
                <span>•</span>
                <span>{experience.location}</span>
              </div>
              <p className="text-sm text-[var(--muted)] pt-1">
                {experience.summary}
              </p>
            </div>
            <div className="text-[var(--muted)] transition-transform duration-300"
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
          <div className="px-5 pb-5 space-y-5 border-t border-[var(--border)] pt-5">
            {/* Responsibilities */}
            <div>
              <h4 className="text-xs font-medium text-[var(--muted)] uppercase tracking-wide mb-3">
                Key Responsibilities
              </h4>
              <ul className="space-y-2">
                {experience.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex gap-3 text-[var(--foreground)]">
                    <span className="text-[var(--accent)] mt-1 flex-shrink-0">→</span>
                    <span className="text-sm">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Impact */}
            <div>
              <h4 className="text-xs font-medium text-[var(--muted)] uppercase tracking-wide mb-3">
                Impact & Achievements
              </h4>
              <ul className="space-y-2">
                {experience.impact.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-[var(--foreground)]">
                    <span className="text-[var(--accent)] flex-shrink-0">✓</span>
                    <span className="text-sm font-medium">{item}</span>
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
