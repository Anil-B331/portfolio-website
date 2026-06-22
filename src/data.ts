import { Project, SkillGroup, Experience } from "./types";

export const developerProfile = {
  name: "Gyanu Baniya",
  title: "B.Sc. CSIT Student & Developer",
  location: "Kathmandu, Nepal",
  email: "gyanub331@gmail.com",
  github: "https://github.com/gyanubaniya",
  linkedin: "https://linkedin.com/in/gyanubaniya",
  facebook: "https://facebook.com/gyanu.baniya",
  tagline: "I build pixel-perfect, engaging, and accessible digital experiences. Passionate about Full Stack Development & Python.",
  about: {
    introduction: "Hi! I'm Gyanu Baniya, a tech enthusiast with a degree in B.Sc. CSIT. I have a passion for building modern, user-friendly digital experiences. My journey involves mastering the frontend with HTML, CSS, JavaScript and diving deep into backend logic with Python and Django.",
    conclusion: "Whether it's crafting intuitive interfaces or designing scalable web solutions, I'm driven by clean code and continuous learning.",
    cards: [
      {
        title: "Developer",
        subtitle: "Web & Python",
        icon: "Code"
      },
      {
        title: "Education",
        subtitle: "B.Sc. CSIT",
        icon: "BookOpen"
      },
      {
        title: "Experience",
        subtitle: "Projects & Freelance",
        icon: "Award"
      }
    ]
  }
};

export const projects: Project[] = [
  {
    id: "hospital-management",
    title: "Hospital Management App",
    description: "A Python/Tkinter application for managing hospital records, patients, and appointments.",
    category: "Full-Stack",
    tags: ["Python", "Tkinter", "GUI"],
    features: [
      "Manage central patient admission files",
      "Assign appointments and primary physicians",
      "Log clinical checkups and prescription files",
      "Sleek and easy-to-use desktop GUI structure"
    ],
    stats: [
      { label: "Engine", value: "Python 3" },
      { label: "Layout", value: "Tkinter GUI" },
      { label: "Storage", value: "Local JSON" }
    ],
    links: {
      github: "https://github.com/gyanubaniya/hospital-management"
    },
    featured: true,
    imageTheme: "cyan",
    imagePattern: "M10 20 L90 20 L90 80 L10 80 Z M30 20 L30 80 M10 40 L90 40"
  },
  {
    id: "awesome-portfolio",
    title: "Awesome Portfolio",
    description: "A modern personal portfolio website showcasing skills and projects with responsive layouts.",
    category: "Open Source",
    tags: ["HTML", "CSS", "Responsive"],
    features: [
      "Responsive fluid navigation layouts",
      "Interactive transitions and modern elements",
      "Fully responsive column configurations",
      "Fast page loads using clean CSS structures"
    ],
    stats: [
      { label: "Framework", value: "Pure CSS3" },
      { label: "Markup", value: "HTML5 Grid" },
      { label: "Response", value: "Fluid Mobile" }
    ],
    links: {
      github: "https://github.com/gyanubaniya/awesome-portfolio"
    },
    featured: true,
    imageTheme: "purple",
    imagePattern: "M10 50 C20 20, 80 20, 90 50 C80 80, 20 80, 10 50"
  },
  {
    id: "blog-platform",
    title: "Blog Platform",
    description: "A simple blog platform with user authentication and markdown support.",
    category: "Full-Stack",
    tags: ["Django", "Python", "SQLite"],
    features: [
      "Robust user authentication and account safety",
      "Markdown parser for post styling formatting",
      "Search features and automated post listings",
      "Fully responsive mobile and tablet layouts"
    ],
    stats: [
      { label: "Backend", value: "Django v4" },
      { label: "Language", value: "Python Core" },
      { label: "Database", value: "SQLite3" }
    ],
    links: {
      github: "https://github.com/gyanubaniya/blog-platform"
    },
    featured: true,
    imageTheme: "orange",
    imagePattern: "M15 15 L85 15 L85 85 L15 85 Z M15 35 L85 35 M15 55 L85 55"
  }
];

export const skillsData: SkillGroup[] = [
  {
    category: "Frontend Development",
    skills: [
      { name: "HTML5", level: 90, icon: "Layers" },
      { name: "CSS3", level: 75, icon: "Palette" },
      { name: "JavaScript", level: 70, icon: "Cpu" }
    ]
  },
  {
    category: "Backend Development",
    skills: [
      { name: "Python", level: 85, icon: "Terminal" },
      { name: "Django", level: 72, icon: "Server" },
      { name: "Git & GitHub", level: 78, icon: "GitBranch" }
    ]
  }
];

export const experienceData: Experience[] = [
  {
    id: "exp-1",
    role: "Freelance Full-Stack Developer",
    company: "Self-Employed (Remote & Local)",
    location: "Kathmandu, Nepal",
    period: "2023 - PRESENT",
    description: [
      "Engineered desktop applications using Python and Tkinter, optimizing central records management.",
      "Formulated full-stack web solutions utilizing Django and Python, building highly responsive blogging architectures.",
      "Implemented responsive frontend layouts with clean semantic HTML and modern CSS configurations."
    ],
    tags: ["Python", "Django", "Tkinter", "Git", "HTML5", "CSS3"]
  },
  {
    id: "exp-2",
    role: "Open-Source Contributor",
    company: "GitHub Community",
    location: "Kathmandu, Nepal",
    period: "2022 - PRESENT",
    description: [
      "Maintained curated awesome portfolio configurations with real-time responsive flex models.",
      "Optimized assets bundle sizes, reduction of static load speeds by roughly 30%.",
      "Organized active repositories, responding to GitHub issues and managing code reviews."
    ],
    tags: ["CSS3", "HTML5", "JavaScript", "GitHub", "Vercel"]
  },
  {
    id: "exp-3",
    role: "B.Sc. CSIT Academic Developer",
    company: "Tribhuvan University CSIT labs",
    location: "Kathmandu, Nepal",
    period: "2020 - 2024",
    description: [
      "Benchmarked database indexing operations using standardized relational SQL models.",
      "Drafted complex data structures and searching algorithm workflows in Python.",
      "Designed and launched academic web applications with strict accessibility structures."
    ],
    tags: ["Python", "SQL", "HTML", "C++", "Algorithms"]
  }
];

export const faqData = [
  {
    question: "What is your main programming stack?",
    answer: "My stack spans frontend core languages (HTML5, CSS3, JavaScript) and backend environments centered around Python. I specialize heavily in Django development, local state persistence engines, and desktop application tools like Tkinter."
  },
  {
    question: "Do you build desktop applications?",
    answer: "Yes, absolutely! I design and build highly efficient desktop GUIs using Python and Tkinter. A prime example is my CareSync Hospital Management system designed to catalog patient files and clinical diagnostics completely offline with robust local serialization."
  },
  {
    question: "Where are you based, and do you work remotely?",
    answer: "I am based in Kathmandu, Nepal. I am fully available to work remotely for international clients, collaborating across timezones. I am committed to clean modular code structures, routine Git pushes, and thorough documentation."
  },
  {
    question: "What education do you have?",
    answer: "I am a B.Sc. CSIT student, specializing in Computer Science and Information Technology. My coursework has equipped me with state-of-the-art proficiency in operating systems, database management systems, network engineering, and advanced algorithm paradigms."
  }
];
