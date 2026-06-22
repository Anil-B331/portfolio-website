import { motion } from "motion/react";
import { MapPin, Calendar, Building, Terminal, ChevronRight } from "lucide-react";
import { Experience } from "../types";
import { playTick } from "./SoundEffects";

interface TimelineProps {
  experience: Experience[];
}

export default function Timeline({ experience }: TimelineProps) {
  return (
    <div className="relative border-l-2 border-brand-charcoal py-4 ml-3 md:ml-12 space-y-12">
      {experience.map((exp, idx) => {
        return (
          <motion.div
            id={`experience-node-${exp.id}`}
            key={exp.id}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="relative pl-6 md:pl-10 group"
          >
            {/* 1. Large Sequential Indicator Number Circle - Landon Norris Theme */}
            <div
              onMouseEnter={playTick}
              className="absolute -left-[14px] top-1.5 w-6 h-6 rounded-full bg-brand-black border-2 border-brand-gray group-hover:border-brand-neon flex items-center justify-center font-mono text-[10px] text-brand-neutral group-hover:text-brand-neon transition-all duration-300 shadow-lg"
            >
              0{idx + 1}
            </div>

            {/* Time period floating tag */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 mb-2.5">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono bg-brand-charcoal text-brand-neon border border-[#CBFF00]/20 px-2.5 py-0.5 rounded-full w-fit">
                <Calendar className="w-3 h-3" />
                {exp.period}
              </span>
              <span className="text-xs font-mono text-brand-neutral flex items-center gap-1 md:text-right">
                <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                {exp.location}
              </span>
            </div>

            {/* Card Frame */}
            <div className="p-5 md:p-6 bg-brand-dark/30 border border-brand-gray/50 rounded-xl group-hover:border-brand-charcoal transition-colors relative overflow-hidden">
              {/* Subtle top decoration */}
              <div className="absolute top-0 right-0 p-4 opacity-5 text-brand-neutral select-none font-mono text-base pointer-events-none">
                ENG_RECORD_0{idx + 1}
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-base font-mono text-brand-neutral flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-brand-orange" />
                    {exp.company}
                  </div>
                  <h4 className="font-display text-xl font-bold text-[#ffffff] tracking-tight mt-1">
                    {exp.role}
                  </h4>
                </div>

                {/* Achievements List */}
                <ul className="space-y-2 text-sm text-brand-neutral font-sans leading-relaxed">
                  {exp.description.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-[#CBFF00] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-brand-charcoal/50">
                  <span className="text-[9px] font-mono text-[#555e67] uppercase flex items-center gap-1 mr-1 mt-1">
                    <Terminal className="w-3 h-3" /> APPLIED STACK:
                  </span>
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 bg-brand-black text-brand-light rounded border border-brand-gray/40 hover:border-[#CBFF00]/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
