export const PEAKS = [
  { id: "experience", label: "EXPERIENCE", x: 195, y: 338 },
  { id: "projects",   label: "PROJECTS",   x: 440, y: 248 },
  { id: "skills",     label: "SKILLS",     x: 715, y: 355 },
  { id: "education",  label: "EDUCATION",  x: 990, y: 385 },
  { id: "contact",    label: "CONTACT",    x: 1258, y: 350 },
] as const;

export type PeakId = (typeof PEAKS)[number]["id"];

export const PEAK_DATA = {
  projects: {
    label: "PROJECTS",
    subtitle: "Things I've built",
    items: [
      {
        title: "Job Application Agent",
        period: "Apr – May 2026",
        description:
          "Agentic loop with Claude API tool use, web search, and iterative refinement over resume and cover letter drafts. Cut per-iteration token cost 90% via prompt caching. Added pgvector RAG for top-k chunk retrieval per JD. Includes React + TypeScript replay dashboard with Overview, Resume Diff, Cover Letter, and Agent Trace tabs.",
        tags: ["Python", "FastAPI", "Claude API", "React", "TypeScript", "PostgreSQL", "Docker"],
        github: "https://github.com/pgvaghela/job-application-agent",
        live: null,
      },
      {
        title: "Stock Trading Simulator",
        period: "Jun – Jul 2025",
        description:
          "Spring Boot + WebSocket trade simulator pushing live portfolio updates to React dashboard on every order. JPA schema for 5+ entities with transaction-safe order flows. Alpha Vantage pricing for 30+ tickers with rate-limit backoff. Deployed Dockerized services to AWS EC2 + RDS with CloudWatch monitoring.",
        tags: ["Java", "Spring Boot", "React", "WebSocket", "Docker", "AWS"],
        github: "https://github.com/pgvaghela/Stock-Trading-Simulator",
        live: null,
      },
      {
        title: "ClearView News Dashboard",
        period: "Feb – Apr 2026",
        description:
          "Full-stack dashboard aggregating 50–100 daily articles with bias labels and source links. Ingestion pipeline pulls ~75 articles/day from 8 outlets via NewsAPI with cross-source deduplication. TF-IDF clustering groups articles by topic so the same story across outlets shows as one cluster.",
        tags: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL"],
        github: "https://github.com/pgvaghela/ClearView-News-Dashboard",
        live: null,
      },
      {
        title: "Sorting Algorithm Optimizer",
        period: "Aug – Oct 2024",
        description:
          "Benchmarked 4+ sorting algorithms on 1M+ record datasets, recommending optimal choice per data distribution profile. C# ASP.NET Core service captures algorithm timings at 10ms intervals. Cut average sort time 40% vs single-algorithm baseline by dynamically selecting algorithm based on dataset features.",
        tags: ["Angular", "TypeScript", "C#", "ASP.NET Core"],
        github: "https://github.com/pgvaghela/Sorting-Algorithm-Optimizer",
        live: null,
      },
    ],
  },

  experience: {
    label: "EXPERIENCE",
    subtitle: "Where I've worked",
    items: [
      {
        role: "AI / Data Analyst Intern",
        company: "Quantara AI",
        period: "May – Aug 2025",
        location: "Remote",
        bullets: [
          "Built zero-disk SFTP-to-S3 ingestion streaming 2M+ rows of Zywave cyber-risk data through BytesIO without local writes",
          "Engineered resilient CSV parser handling malformed rows, mixed delimiters, and encoding failures in vendor feeds",
          "Shipped Gemini labeling script tagging vulnerability descriptions with loss type and MITRE ATT&CK techniques",
          "Added row-level checkpointing and 60s retry-on-rate-limit so multi-hour Gemini jobs resume from last row on failure",
          "Trained PyTorch embedding-pool classifier on 6-class loss-type labels with class weighting to handle long-tail imbalance",
          "Generated 1,400+ row synthetic training set across AWS Inspector, CrowdStrike, Tenable, and Sentinel schemas",
        ],
        tags: ["Python", "PyTorch", "pandas", "boto3", "Paramiko", "AWS S3", "Gemini API"],
      },
      {
        role: "Software Engineering Intern",
        company: "Micron Technology",
        period: "May – Aug 2024",
        location: "Boise, ID",
        bullets: [
          "Built full stack Angular and C# .NET application used by 200+ daily users, integrating 10+ REST endpoints",
          "Implemented 12 REST APIs with Swagger/OpenAPI docs; validated through Postman, resolved 20+ defects in sprint QA",
          "Led UAT triage with stakeholders; resolved 50+ issues and clarified requirements to unblock sign-off for production",
          "Delivered sprint features across US, Taiwan, and India teams, coordinating handoffs and validation in 2-week cycles",
        ],
        tags: ["Angular", "C# .NET", "Azure DevOps", "Git", "Postman", "Swagger"],
      },
      {
        role: "Teaching Assistant — CS 110",
        company: "University of Arizona",
        period: "Jan 2024 – Dec 2025",
        location: "Tucson, AZ",
        bullets: [
          "Led weekly CS 110 lab sessions of 30+ students, combining short lectures with hands-on Python programming exercises",
          "Held 4 office hours weekly, graded quizzes and exams, and debugged students' Python code one-on-one during sessions",
        ],
        tags: ["Python", "Tutoring"],
      },
    ],
  },

  skills: {
    label: "SKILLS",
    subtitle: "Technologies I work with",
    groups: [
      {
        name: "Languages",
        items: ["Python", "TypeScript", "JavaScript", "Java", "C# (.NET)", "C++", "C", "Swift", "SQL", "HTML/CSS"],
      },
      {
        name: "Frameworks",
        items: ["React", "FastAPI", "Spring Boot", "Angular", "ASP.NET Core", "Tailwind", "PyTorch"],
      },
      {
        name: "Data & Telemetry",
        items: ["PostgreSQL", "MySQL", "pandas", "NumPy", "scikit-learn", "TF-IDF", "data pipelines"],
      },
      {
        name: "Cloud & DevOps",
        items: ["AWS (EC2, RDS, S3, CloudWatch)", "Docker", "Azure DevOps", "GitHub Actions", "Git", "Linux/Unix"],
      },
      {
        name: "Testing & Methods",
        items: ["Jest", "JUnit", "PyTest", "Integration Testing", "Postman", "CI/CD", "Agile/Scrum", "SAFe", "RESTful API design"],
      },
    ],
  },

  education: {
    label: "EDUCATION",
    subtitle: "Academic background",
    degree: "B.S. in Computer Science",
    school: "University of Arizona",
    period: "Aug 2022 – May 2026",
    location: "Tucson, AZ",
    minors: ["Entrepreneurship & Innovation", "Info Sci & Tech"],
    awards: ["Dean's List (Fall 2025, Spring 2026)", "Academic Distinction (2025–2026)"],
    courses: [
      "Object-Oriented Programming",
      "Systems Programming",
      "Data Structures",
      "Algorithms",
      "Machine Learning",
    ],
    note: "No sponsorship required · Green Card holder",
  },

  contact: {
    label: "CONTACT",
    subtitle: "Get in touch",
    email: "pgvaghela20@gmail.com",
    github: "https://github.com/pgvaghela",
    linkedin: "https://linkedin.com/in/priyanshvaghela",
    location: "United States of America",
    availability: "Open to full-time roles, internships, and interesting collaborations.",
  },
};
