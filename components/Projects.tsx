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
    outcome: 'Deployed to production with 300+ active users. Eliminated notification delays, ensuring students never miss placement opportunities. Became the go-to platform for campus recruitment updates.'
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
        </div>
      </div>
    </div>
  );
}
