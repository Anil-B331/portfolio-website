export interface Project {
  id: string;
  title: string;
  description: string;
  category: "Full-Stack" | "Mobile" | "DevOps & Cloud" | "Open Source";
  tags: string[];
  features: string[];
  stats: { label: string; value: string }[];
  links: {
    github?: string;
    live?: string;
    demoVideo?: string;
  };
  featured: boolean;
  imageTheme: "neon" | "cyan" | "orange" | "purple";
  imagePattern: string; // Dynamic path for abstract layout rendering
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  tags: string[];
}

export interface SkillGroup {
  category: string;
  skills: { name: string; level: number; icon: string }[];
}

export interface Stat {
  label: string;
  value: number;
  incrementLabel?: string;
  unit?: string;
}
