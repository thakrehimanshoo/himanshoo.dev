'use client';

import { useState } from 'react';

interface Project {
  id: string;
  name: string;
  purpose: string;
  tags: string[];
  problem: string;
  architecture: string;
  dataFlow: string;
  tradeoffs: string[];
  outcome: string;
  liveLink?: string;
  githubLink?: string;
}

const projectsData: Project[] = [
  {
    id: 'project-1',
    name: 'HeadsUp - Campus Placement Alert App',
    purpose: 'Real-time campus placement and internship notifications for students',
    tags: ['Next.js', 'Python', 'Web Scraping', 'Gmail API', 'Cron Jobs'],
    problem: 'CDC placement/internship notifications were posted on ERP noticeboard with significant delays, causing students to miss important opportunities. Manual checking was time-consuming and inefficient.',
    architecture: 'Automated notification system with Python scraper running as cron job, Gmail API for ERP session re-authentication, Next.js frontend for real-time notice display. Scraper posts notices.json to Next.js app for instant rendering.',
    dataFlow: 'Cron Job → Python Scraper → ERP Portal → Gmail API Re-auth → notices.json → Next.js App → Real-time Display',
    tradeoffs: [
      'Used cron jobs for scheduled scraping instead of real-time webhooks (ERP limitation)',
      'Implemented Gmail API for automatic re-authentication when ERP session expires',
      'Chose Next.js for fast static generation and real-time data updates',
      'Stored notices as JSON for lightweight data transfer between scraper and frontend',
      'Balanced scraping frequency to avoid rate limiting while maintaining freshness'
    ],
    outcome: 'Deployed to production with 300+ active users. Eliminated notification delays, ensuring students never miss placement opportunities. Became the go-to platform for campus recruitment updates.',
    liveLink: 'https://headsup.himanshoo.dev'
  },
  {
    id: 'project-2',
    name: 'Custom User-Level Thread Library for Linux',
    purpose: 'Built a thread library from scratch for efficient concurrent execution',
    tags: ['C', 'Operating Systems', 'Multithreading', 'System Calls'],
    problem: 'Need for a lightweight, user-level thread library supporting creation, termination, and synchronization without relying on existing pthread implementations.',
    architecture: 'User-level thread library using clone() system call with support for thread creation, join, termination, mutexes, and barriers. Implemented thread-safe synchronization using TIDs.',
    dataFlow: 'Thread Creation → clone() syscall → Thread Pool Management → Synchronization Primitives → Join/Exit',
    tradeoffs: [
      'Used clone() system call directly for fine-grained control over thread creation',
      'Implemented custom synchronization primitives instead of relying on kernel-level locks',
      'Designed thread termination routines (foothread_exit) for clean joinable thread management',
      'Validated library with tree recursion tests for correctness in parallel and sequential execution'
    ],
    outcome: 'Successfully implemented a fully functional thread library with mutex support, preventing deadlocks and ensuring thread-safe concurrent execution.'
  },
  {
    id: 'project-3',
    name: 'Advanced Question Search Engine',
    purpose: 'Efficient information retrieval using TF-IDF algorithm',
    tags: ['Python', 'NLP', 'Web Scraping', 'BeautifulSoup', 'Selenium'],
    problem: 'Need for an intelligent search engine to efficiently retrieve relevant questions from large datasets with high precision.',
    architecture: 'Search engine using Term Frequency-Inverse Document Frequency (TF-IDF) algorithm for ranking, automated web scraping for data collection, dynamic Flask-based interface with HTML/CSS/JavaScript frontend.',
    dataFlow: 'Web Scraping (Selenium/BeautifulSoup) → Data Processing → TF-IDF Ranking → Flask API → Frontend Interface',
    tradeoffs: [
      'Chose TF-IDF over simple keyword matching for better relevance ranking',
      'Used Selenium for dynamic content scraping where BeautifulSoup was insufficient',
      'Implemented Flask backend for lightweight, fast API responses',
      'Optimized search algorithm for handling 2400+ problems from LeetCode efficiently'
    ],
    outcome: 'Achieved reliable, high-precision data extraction at scale with an optimized search interface enhancing user experience.'
  }
];

export default function Projects() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="projects" className="min-h-screen py-24 px-6 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-4">
            <span className="opacity-60">/</span>
            <span>Projects</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-[var(--foreground)]">
            Selected Work
          </h2>
          <p className="text-[var(--muted)] mt-4 max-w-2xl">
            Production systems built with focus on reliability, performance, and maintainability.
          </p>
        </div>

        {/* Project grid */}
        <div className="grid gap-6">
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isExpanded={expandedId === project.id}
              onToggle={() => toggleExpand(project.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  isExpanded,
  onToggle
}: {
  project: Project;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="bg-[var(--card-bg)] border border-[var(--border)] rounded-sm
                 transition-all duration-300 hover:border-[var(--border-hover)]
                 hover:shadow-[0_4px_12px_var(--shadow-md)]"
    >
      {/* Card header - always visible */}
      <button
        onClick={onToggle}
        className="w-full p-6 text-left hover:bg-[var(--accent-light)] transition-colors duration-200"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <h3 className="text-xl font-medium text-[var(--foreground)]">
              {project.name}
            </h3>
            <p className="text-[var(--muted)] text-sm">
              {project.purpose}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[var(--background)] text-xs
                           text-[var(--foreground)] border border-[var(--border)] rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="text-[var(--muted)] text-xl transition-transform duration-300"
               style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            ↓
          </div>
        </div>
      </button>

      {/* Expanded content */}
      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isExpanded ? '2000px' : '0',
          opacity: isExpanded ? 1 : 0
        }}
      >
        <div className="px-6 pb-6 space-y-6 border-t border-[var(--border)]">
          {/* Problem */}
          <div className="pt-6">
            <h4 className="text-xs font-medium text-[var(--muted)] uppercase tracking-wide mb-2">
              Problem
            </h4>
            <p className="text-[var(--foreground)]">
              {project.problem}
            </p>
          </div>

          {/* Architecture */}
          <div>
            <h4 className="text-xs font-medium text-[var(--muted)] uppercase tracking-wide mb-2">
              System Architecture
            </h4>
            <p className="text-[var(--foreground)]">
              {project.architecture}
            </p>
          </div>

          {/* Data flow */}
          <div>
            <h4 className="text-xs font-medium text-[var(--muted)] uppercase tracking-wide mb-2">
              Data Flow
            </h4>
            <div className="bg-[var(--background)] p-4 rounded-sm border border-[var(--border)] font-mono text-sm">
              {project.dataFlow}
            </div>
          </div>

          {/* Trade-offs */}
          <div>
            <h4 className="text-xs font-medium text-[var(--muted)] uppercase tracking-wide mb-2">
              Key Trade-offs
            </h4>
            <ul className="space-y-2">
              {project.tradeoffs.map((tradeoff, idx) => (
                <li key={idx} className="flex gap-3 text-[var(--foreground)]">
                  <span className="text-[var(--accent)] mt-1">→</span>
                  <span>{tradeoff}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Outcome */}
          <div>
            <h4 className="text-xs font-medium text-[var(--muted)] uppercase tracking-wide mb-2">
              Outcome / Impact
            </h4>
            <p className="text-[var(--foreground)] font-medium">
              {project.outcome}
            </p>
          </div>

          {/* Links */}
          {(project.liveLink || project.githubLink) && (
            <div className="pt-4 flex gap-3">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[var(--accent)] text-white rounded-sm
                           hover:opacity-90 transition-all duration-200 font-medium
                           flex items-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live Demo
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-[var(--border)] text-[var(--foreground)]
                           rounded-sm hover:border-[var(--border-hover)] hover:bg-[var(--card-bg)]
                           transition-all duration-200 font-medium flex items-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
