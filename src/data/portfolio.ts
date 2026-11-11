export type NavItem = {
  label: string
  href: string
}

export type ExperienceItem = {
  company: string
  note?: string
  role: string
  period: string
  tech: string[]
  highlights: string[]
}

export type Project = {
  title: string
  description: string
  tech: string[]
  highlights: string[]
  href: string
}

export type SkillGroup = {
  title: string
  skills: string[]
}

export type EducationItem = {
  degree: string
  school: string
  period: string
  score: string
}

export const profile = {
  name: 'Nikhil Verma',
  role: 'Software Development Engineer',
  tagline:
    'I build native AI interfaces for Linux, Android releases on Chromium, and full-stack developer tools — from architecture to rollout.',
  location: 'Noida, India',
  email: 'nikhilverma5000.nv@gmail.com',
  github: 'https://github.com/Nikhilnv1209',
  linkedin: 'https://www.linkedin.com/in/nikhil-verma-nv1209/',
}

export const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export const experience: ExperienceItem[] = [
  {
    company: 'qikfox',
    note: 'Methodworks Pvt. Ltd. — India payroll',
    role: 'Software Development Engineer',
    period: 'Jul 2024 – Present',
    tech: ['C', 'Rust', 'JavaScript', 'Chromium', 'Android', 'tree-sitter'],
    highlights: [
      'Own Android releases: rebase on upstream Chromium for desktop parity and ship 5+ major Android versions.',
      'Run release cycles end to end — builds, rollout, stability fixes, regressions, and version-gated features.',
      'Build a codebase-analysis product with tree-sitter parsing, deterministic grouping, and a team knowledge graph.',
      'Built remote compute instances on E2B, provisioned per account and isolated per owner.',
      'Shipped ownership and invite flows, billing with a wallet ledger, audit rails, and multi-agent collaboration.',
      'Led 4-person teams across projects — giving guidance, unblocking work, and carrying deliverables through to live production.',
    ],
  },
  {
    company: 'qikfox',
    note: 'Methodworks Pvt. Ltd. — India payroll',
    role: 'Associate Software Developer Engineer',
    period: 'Jul 2023 – Jul 2024',
    tech: ['Go', 'Python', 'Linux', 'MCP', 'AI Agents'],
    highlights: [
      'Turned a Linux OS into a native AI conversational interface with an MCP server over stdio and an Electron client.',
      'Routed agentic tool calls for commands, apps, and files through audited MCP calls instead of raw shell access.',
      'Added prompt-injection guardrails: input/output validation, deny-listed calls, and confirmation before irreversible actions.',
      'Supported local and remote model backends and packaged the system as a Debian ISO.',
    ],
  },
  {
    company: 'Kartexa',
    role: 'Frontend Developer Intern',
    period: 'May 2023 – Jul 2023',
    tech: ['React.js', 'TailwindCSS', 'Node.js'],
    highlights: [
      'Built reusable, responsive components with React and Tailwind CSS.',
      'Collaborated with backend engineers to integrate APIs smoothly and optimize usage.',
    ],
  },
]

export const projects: Project[] = [
  {
    title: 'AICommit',
    description:
      'An AI-powered repository analysis and Q&A tool built on Next.js 15 and TypeScript. It indexes repository context with a RAG pipeline, uses Google Gemini to answer questions and produce retrieval-backed summaries, and can draft commit messages from the same analysis.',
    tech: [
      'Next.js 15',
      'TypeScript',
      'React',
      'Shadcn UI',
      'Tailwind',
      'Stripe',
      'Gemini',
      'LangChain',
      'RAG',
    ],
    highlights: [
      'RAG + LangChain pipeline over repository context for codebase Q&A and retrieval-backed summaries.',
      'Gemini-powered commit-message generation on top of the analysis layer.',
      'Queue-and-retry rate limiting for Gemini and GitHub APIs to prevent dropped requests.',
      'AssemblyAI meeting transcription creates GitHub issues from action items; Stripe adds payments, with a Shadcn + Tailwind UI.',
    ],
    href: 'https://github.com/Nikhilnv1209/AICommit',
  },
]

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    skills: ['JavaScript', 'TypeScript', 'Go', 'Rust', 'Python', 'C'],
  },
  {
    title: 'AI & Agents',
    skills: [
      'Agentic AI',
      'MCP',
      'FastMCP',
      'LangChain',
      'RAG',
      'Gemini',
      'E2B',
      'Prompt-injection guardrails',
    ],
  },
  {
    title: 'Technologies',
    skills: [
      'React',
      'Next.js',
      'Tailwind CSS',
      'Node.js',
      'Prisma',
      'MongoDB',
      'Electron',
      'tree-sitter',
      'Chromium',
      'Android',
    ],
  },
  {
    title: 'Tools',
    skills: [
      'Linux',
      'Docker',
      'Git',
      'GitHub',
      'Jira',
      'VS Code',
      'Stripe',
      'AssemblyAI',
    ],
  },
]

export const education: EducationItem[] = [
  {
    degree: 'Master of Computer Applications (MCA)',
    school: 'JSS Academy of Technical Education, Noida',
    period: 'Nov 2021 – Jun 2023',
    score: 'CGPA 8.5 / 10',
  },
  {
    degree: 'B.Sc. in Computer Science',
    school: 'Gurukula Kangri (Deemed to be University)',
    period: 'Aug 2018 – Jul 2021',
    score: 'CGPA 8.7 / 10',
  },
]
