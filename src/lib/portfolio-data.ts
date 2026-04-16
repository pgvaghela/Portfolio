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
        title: "LearnPython iOS App",
        period: "Jul – Aug 2025",
        description:
          "SwiftUI app with 25 interactive Python lessons from beginner to advanced. MVVM architecture persists progress across 3 levels and 5 categories. CodeMirror via WebView connected to FastAPI backend for live code execution.",
        tags: ["Swift", "SwiftUI", "FastAPI", "PostgreSQL", "JWT", "GitHub Actions"],
        github: "https://github.com/pgvaghela/learn-python-ios",
        live: null,
      },
      {
        title: "Stock Trading Simulator",
        period: "Jun – Jul 2025",
        description:
          "Spring Boot + WebSocket trade simulator with low-latency order execution and live portfolio streaming. Alpha Vantage pricing with rate-limit handling. Deployed on AWS EC2 + RDS with CloudWatch monitoring.",
        tags: ["Java", "Spring Boot", "React", "Tailwind", "WebSocket", "Docker", "AWS"],
        github: "https://github.com/pgvaghela/Stock-Trading-Simulator",
        live: null,
      },
      {
        title: "ReliefOps",
        period: "2025",
        description:
          "Real-time hurricane response monitoring console for disaster relief operations. Built with TypeScript for live situational awareness dashboards.",
        tags: ["TypeScript", "React"],
        github: "https://github.com/pgvaghela/ReliefOps",
        live: null,
      },
      {
        title: "ClearView News Dashboard",
        period: "Feb 2026 – Present",
        description:
          "Aggregates multi-source headlines, clusters event coverage, and groups Left/Center/Right viewpoints side-by-side. Includes bias label explanations and fact-check link integration.",
        tags: ["Python", "FastAPI", "React", "TypeScript"],
        github: "https://github.com/pgvaghela/ClearView-News-Dashboard",
        live: null,
      },
      {
        title: "Sorting Algorithm Optimizer",
        period: "Aug – Oct 2024",
        description:
          "Full-stack benchmarking tool for 1M+ record datasets. Recommends optimal sorting algorithms by distribution profile. Achieved 40% reduction in average sort time vs baseline.",
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
          "Cleaned 2M+ SQL records with pandas; standardized schemas and reduced ETL rework",
          "Built Airflow ETL DAGs with validation and alerting for reliable recurring analysis",
          "Trained NLP/ML models in PyTorch/TensorFlow; improved validation score by 12%",
          "Packaged FastAPI model service in Docker, deployed to Kubernetes for scale",
          "Built React + D3 dashboards for leadership, cutting manual chart updates",
        ],
        tags: ["Python", "SQL", "Airflow", "PyTorch", "TensorFlow", "Docker", "Kubernetes", "React", "D3.js"],
      },
      {
        role: "Software Engineering Intern",
        company: "Micron Technology",
        period: "May – Aug 2024",
        location: "Boise, ID",
        bullets: [
          "Built Angular + C# .NET app for 200+ everyday users with 10+ REST endpoints",
          "Implemented 12 REST APIs with Swagger/OpenAPI docs; resolved 20+ defects in QA",
          "Improved Azure DevOps CI/CD, reducing manual release steps across repositories",
          "Led UAT triage with stakeholders; resolved 50+ issues to unblock production",
          "Coordinated sprint features across US, Taiwan, and India teams",
        ],
        tags: ["Angular", "C# .NET", "ASP.NET Core", "Azure DevOps", "Postman", "Swagger"],
      },
      {
        role: "Teaching Assistant — CS 110",
        company: "University of Arizona",
        period: "Jan 2024 – Present",
        location: "United States of America",
        bullets: [
          "Lead weekly lab sessions of 30+ students with lecture + hands-on Python tasks",
          "Hold 4 office hours weekly; grade quizzes, exams, and advanced coursework",
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
        items: ["Java", "Python", "TypeScript", "JavaScript", "C", "C# (.NET)", "C++", "Swift", "HTML/CSS", "R"],
      },
      {
        name: "Frameworks",
        items: ["Spring Boot", "ASP.NET Core", "FastAPI", "React", "Angular", "SwiftUI", "TensorFlow", "PyTorch"],
      },
      {
        name: "Data & ML",
        items: ["PostgreSQL", "MySQL", "pandas", "NumPy", "scikit-learn", "Airflow", "Tableau", "Grafana"],
      },
      {
        name: "Cloud & DevOps",
        items: ["AWS (EC2, RDS)", "Azure DevOps", "Docker", "Kubernetes", "GitHub Actions", "Git", "Linux/Unix"],
      },
      {
        name: "Methods",
        items: ["Agile/Scrum", "REST API Design", "CI/CD", "Unit Testing", "Integration Testing"],
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
    courses: [
      "Object-Oriented Programming",
      "Systems Programming",
      "Discrete Structures",
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
