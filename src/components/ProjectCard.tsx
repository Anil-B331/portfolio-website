import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FolderCode, Github, ExternalLink, ChevronDown, ChevronUp, Cpu, Info, BarChart2 } from "lucide-react";
import { Project } from "../types";
import { playTick, playRev, playChirp } from "./SoundEffects";

interface ProjectCardProps {
  project: Project;
  key?: any;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const themeClasses = {
    neon: {
      borderHover: "hover:border-brand-neon/60",
      accent: "text-brand-neon",
      badge: "bg-brand-neon/10 text-brand-neon border-brand-neon/20",
      glowBg: "bg-brand-neon/5",
      svgColor: "#CBFF00",
      buttonBg: "hover:bg-brand-neon/10 hover:text-brand-neon border-brand-neon/20"
    },
    cyan: {
      borderHover: "hover:border-brand-cyan/60",
      accent: "text-brand-cyan",
      badge: "bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20",
      glowBg: "bg-brand-cyan/5",
      svgColor: "#00f0ff",
      buttonBg: "hover:bg-brand-cyan/10 hover:text-brand-cyan border-brand-cyan/20"
    },
    orange: {
      borderHover: "hover:border-brand-orange/60",
      accent: "text-brand-orange",
      badge: "bg-brand-orange/10 text-brand-orange border-brand-orange/20",
      glowBg: "bg-brand-orange/5",
      svgColor: "#ff5500",
      buttonBg: "hover:bg-brand-orange/10 hover:text-brand-orange border-brand-orange/20"
    },
    purple: {
      borderHover: "hover:border-purple-400/60",
      accent: "text-purple-400",
      badge: "bg-purple-400/10 text-purple-400 border-purple-400/20",
      glowBg: "bg-purple-400/5",
      svgColor: "#c084fc",
      buttonBg: "hover:bg-purple-400/10 hover:text-purple-400 border-purple-400/20"
    }
  };

  const scheme = themeClasses[project.imageTheme] || themeClasses.neon;

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      playRev();
    } else {
      playTick();
    }
  };

  return (
    <motion.div
      id={`project-card-${project.id}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={playTick}
      className={`bg-brand-dark/40 border-2 border-brand-gray/40 rounded-xl overflow-hidden transition-all duration-300 ${scheme.borderHover} relative group/card flex flex-col h-full`}
    >
      {/* 1. Immersive Vector Graphic Header - Mimic premium high-tech visual grids */}
      <div className={`h-40 ${scheme.glowBg} relative overflow-hidden flex items-center justify-center border-b border-brand-charcoal`}>
        {/* Dynamic Blueprint Graphic */}
        <div className="absolute inset-0 blueprint-grid opacity-20 group-hover/card:scale-105 transition-transform duration-500" />
        
        {/* Animated HUD Elements */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 font-mono text-[9px] text-brand-neutral">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-neutral group-hover/card:bg-[#CBFF00] transition-colors" />
          SYSTEM_SPEC_COORDS
        </div>

        <div className="absolute top-3 right-3 font-mono text-[9px] text-[#555e67]">
          [ID: 00{project.id}_TRX]
        </div>

        {/* Abstract Blueprint Vectors */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-24 stroke-2 transition-all duration-500 group-hover/card:scale-110"
          style={{ stroke: scheme.svgColor, fill: "none", strokeLinecap: "round" }}
        >
          <path d={project.imagePattern} className="opacity-40 group-hover/card:opacity-75 transition-opacity" />
          {/* Pulsing focal point */}
          <circle cx="50" cy="50" r="1.5" fill={scheme.svgColor} className="animate-ping" />
        </svg>

        {/* Diagonal Line Design Vibe */}
        <div className="absolute bottom-0 right-0 p-3 bg-brand-charcoal/40 text-brand-neutral font-mono text-[10px] border-t border-l border-brand-charcoal">
          CATEGORY::{project.category.toUpperCase()}
        </div>
      </div>

      {/* 2. Content & Bio */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-xl font-bold text-[#ffffff] tracking-tight group-hover/card:text-brand-light transition-colors">
              {project.title}
            </h3>
            {project.featured && (
              <span className={`text-[9px] uppercase tracking-widest font-mono border px-2 py-0.5 rounded ${scheme.badge}`}>
                Featured Core
              </span>
            )}
          </div>

          <p className="text-sm text-brand-neutral leading-relaxed">
            {project.description}
          </p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 bg-brand-charcoal text-[#98a2b3] rounded border border-brand-gray/50 hover:border-brand-neutral/30 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Expansion area with specifications */}
        <div className="mt-4">
          <button
            onClick={handleToggleExpand}
            className={`w-full py-1.5 px-3 rounded bg-brand-charcoal/30 hover:bg-brand-charcoal/70 border border-brand-charcoal text-[11px] font-mono text-brand-neutral hover:text-[#ffffff] flex items-center justify-between transition-colors`}
          >
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              {isExpanded ? "COLLAPSE SPECIFICATIONS" : "EXPAND SPECIFICATIONS"}
            </span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="py-3 space-y-4 border-t border-brand-charcoal mt-2 font-sans">
                  {/* Features List */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-brand-neutral tracking-wider flex items-center gap-1">
                      <Info className="w-3 h-3 text-[#CBFF00]" /> CORE ARCHITECTURAL DETAILS:
                    </span>
                    <ul className="space-y-1 pl-3.5 text-xs text-brand-neutral list-disc">
                      {project.features.map((feature, idx) => (
                        <li key={idx} className="leading-relaxed">{feature}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Operational Telemetry / Stats */}
                  <div className="grid grid-cols-3 gap-2 bg-[#050607]/80 p-2.5 rounded border border-brand-charcoal">
                    {project.stats.map((stat, idx) => (
                      <div key={idx} className="space-y-0.5 text-center">
                        <div className="text-[9px] font-mono text-brand-neutral uppercase tracking-wider">{stat.label}</div>
                        <div className={`text-xs font-mono font-semibold ${scheme.accent}`}>{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic Buttons */}
        <div className="flex items-center gap-3 border-t border-brand-charcoal pt-4 mt-6">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playChirp}
              className="flex-1 py-2 px-3 rounded-lg border border-brand-gray/60 hover:border-brand-light bg-transparent font-mono text-xs text-brand-light hover:text-brand-black hover:bg-brand-light flex items-center justify-center gap-1.5 transition-all"
            >
              <Github className="w-4 h-4" />
              Source Git
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playChirp}
              className={`flex-1 py-2 px-3 rounded-lg border border-brand-gray/60 hover:border-[#ffffff] bg-[#ffffff] hover:bg-transparent text-brand-black hover:text-[#ffffff] font-mono text-xs flex items-center justify-center gap-1.5 transition-all`}
            >
              <ExternalLink className="w-4 h-4" />
              Live Gateway
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
