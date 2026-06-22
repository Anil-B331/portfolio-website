import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Terminal,
  FileText,
  Briefcase,
  Cpu,
  Mail,
  HelpCircle,
  Github,
  Linkedin,
  Facebook,
  PhoneCall,
  ChevronDown,
  ExternalLink,
  ChevronRight,
  Send,
  HelpCircle as FaqIcon,
  Moon,
  Sun,
  Code
} from "lucide-react";

import { developerProfile, projects, skillsData, experienceData, faqData } from "./data";
import Dock from "./components/Dock";
import BentoGrid from "./components/BentoGrid";
import CommandMenu from "./components/CommandMenu";
import ProjectCard from "./components/ProjectCard";
import Timeline from "./components/Timeline";
import TorusWireframe from "./components/TorusWireframe";
import { initAudio, playTick, playChirp, playRev } from "./components/SoundEffects";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Form states for contact gateway
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  // Keyboard shortcut for CMD+K / CTRL+K Command Menu opening
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        playChirp();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Track active section on scroll to update dock state
  useEffect(() => {
    const sectionIds = ["hero", "workspace", "projects", "experience", "skills", "faq", "contact"];
    const handleScroll = () => {
      const scrollY = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    // Lazy initialize standard web audio on first navigation click to satisfy security constraints
    initAudio();
    playChirp();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 20;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(sectionId);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    initAudio();
    playRev();
    setFormStatus("submitting");

    setTimeout(() => {
      setFormStatus("success");
      const inquiry = {
        name: formName,
        email: formEmail,
        message: formMessage,
        date: new Date().toISOString()
      };
      const current = JSON.parse(localStorage.getItem("portfolio_inquiries") || "[]");
      current.push(inquiry);
      localStorage.setItem("portfolio_inquiries", JSON.stringify(current));

      // Reset fields
      setFormName("");
      setFormEmail("");
      setFormMessage("");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-brand-black text-brand-light font-sans selection:bg-brand-neon selection:text-brand-black pb-36 relative overflow-hidden">
      
      {/* Immersive technical grid graphics background */}
      <div className="fixed inset-0 mesh-grid pointer-events-none z-0" />

      {/* COMMAND SPOTLIGHT MENU */}
      <CommandMenu
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* CORE CONTENT LAYOUT */}
      <main className="max-w-5xl mx-auto px-6 relative z-10 pt-12 md:pt-16 space-y-24 md:space-y-36">

        {/* 1. JUMPSTART HERO SECTION */}
        <section id="hero" className="min-h-[85vh] flex flex-col justify-center scroll-mt-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Column - System Description */}
            <div className="md:col-span-7 space-y-6 md:space-y-8">
              <div className="space-y-3">
                
                {/* HUD Node status bar */}
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-neon animate-pulse" />
                  <span className="text-[10px] font-mono tracking-widest text-[#CBFF00]/80">SYSTEMS ENERGISED // KATHMANDU</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-white leading-tight">
                  I'm <span className="text-brand-neon">{developerProfile.name}</span>
                </h1>
                
                <h2 className="text-lg md:text-2.5xl font-mono text-brand-neutral flex items-center gap-2">
                  <span className="text-brand-cyan">&gt;</span> {developerProfile.title}
                </h2>
              </div>

              <p className="text-sm md:text-base text-brand-neutral leading-relaxed max-w-xl font-light">
                {developerProfile.tagline}
              </p>

              {/* Social Channels & Contact shortcuts */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => handleNavigate("contact")}
                  className="px-5 py-2.5 rounded-lg bg-brand-neon text-brand-black hover:bg-brand-light font-mono text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-[0_4px_20px_rgba(203,255,0,0.15)] hover:shadow-[0_4px_25px_rgba(203,255,0,0.3)] hover:scale-[1.02]"
                >
                  CONNECT GATEWAY
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsCommandOpen(true)}
                  className="px-5 py-2.5 rounded-lg bg-brand-charcoal hover:bg-brand-gray border border-brand-gray/60 text-brand-light font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  LAUNCH CONSOLE
                  <kbd className="text-[10px] bg-brand-dark px-1.5 py-0.5 rounded text-brand-neutral border border-brand-gray">⌘K</kbd>
                </button>
              </div>

              {/* Quick links info badges */}
              <div className="flex items-center gap-4 pt-4 text-xs font-mono text-brand-neutral">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                  PYTHON CODE
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                  DJANGO ARCHITECTURE
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#cbff00]" />
                  HTML/CSS/JS
                </span>
              </div>
            </div>

            {/* Right Column - Torus wireframe vector element */}
            <div className="md:col-span-5 flex items-center justify-center py-6">
              <div className="relative w-full aspect-square max-w-[320px] flex items-center justify-center">
                
                {/* Mathematical rotating torus wireframe */}
                <TorusWireframe />

                {/* Styled technical circles */}
                <div className="absolute inset-0 border border-dashed border-brand-neon/10 rounded-full animate-[spin_60s_linear_infinite] z-[-1]" />
                <div className="absolute inset-10 border border-dashed border-brand-cyan/10 rounded-full animate-[spin_40s_linear_reverse_infinite] z-[-1]" />
              </div>
            </div>

          </div>
        </section>

        {/* 2. THE TELEMETRY WORKSPACE (BentoGrid) */}
        <section id="workspace" className="scroll-mt-24 space-y-8">
          
          {/* Section Marker */}
          <div className="flex items-center gap-3">
            <div className="h-[1px] bg-brand-gray flex-1" />
            <div className="text-center shrink-0 px-4 space-y-1">
              <h2 className="text-2xl md:text-3xl font-display font-extrabold tracking-tight text-white uppercase">
                TELEMETRY GRID
              </h2>
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-cyan block">
                Workspace Status & Vital Statistics
              </span>
            </div>
            <div className="h-[1px] bg-brand-gray flex-1" />
          </div>

          <BentoGrid />
        </section>

        {/* 3. SELECTED WORKS (Projects Grid) */}
        <section id="projects" className="scroll-mt-24 space-y-8">
          
          <div className="flex items-center gap-3">
            <div className="h-[1px] bg-brand-gray flex-1" />
            <div className="text-center shrink-0 px-4 space-y-1">
              <h2 className="text-2xl md:text-3xl font-display font-extrabold tracking-tight text-white uppercase">
                SELECTED WORKS
              </h2>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#CBFF00]/85 block">
                Engineered Core Applications
              </span>
            </div>
            <div className="h-[1px] bg-brand-gray flex-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* 4. CAREER TIMELINE (Experience timeline) */}
        <section id="experience" className="scroll-mt-24 space-y-8">
          
          <div className="flex items-center gap-3">
            <div className="h-[1px] bg-brand-gray flex-1" />
            <div className="text-center shrink-0 px-4 space-y-1">
              <h2 className="text-2xl md:text-3xl font-display font-extrabold tracking-tight text-white uppercase">
                CAREER BLUEPRINT
              </h2>
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-orange block">
                Educational Milestones & Freelance
              </span>
            </div>
            <div className="h-[1px] bg-brand-gray flex-1" />
          </div>

          <Timeline experience={experienceData} />
        </section>

        {/* 5. TECHNICAL RADAR (Skills layout) */}
        <section id="skills" className="scroll-mt-24 space-y-8">
          
          <div className="flex items-center gap-3">
            <div className="h-[1px] bg-brand-gray flex-1" />
            <div className="text-center shrink-0 px-4 space-y-1">
              <h2 className="text-2xl md:text-3xl font-display font-extrabold tracking-tight text-white uppercase">
                SYSTEM STACK
              </h2>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#CBFF00]/80 block">
                Core Competence Metrics & Mastery
              </span>
            </div>
            <div className="h-[1px] bg-brand-gray flex-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillsData.map((group, idx) => (
              <div 
                key={idx}
                className="bg-brand-dark/40 border-2 border-brand-gray/50 rounded-xl p-6 hover:border-brand-gray transition-colors relative"
              >
                {/* Corner blueprint indicator */}
                <div className="absolute top-0 left-0 w-6 h-[2px] bg-brand-cyan/40" />
                <div className="absolute top-0 left-0 w-[2px] h-6 bg-brand-cyan/40" />

                <h3 className="text-lg font-display font-bold text-white mb-6 flex items-center gap-2">
                  <Code className="w-4.5 h-4.5 text-brand-cyan" />
                  {group.category.toUpperCase()}
                </h3>

                <div className="space-y-5">
                  {group.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5" onMouseEnter={playTick}>
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-brand-light font-medium">{skill.name}</span>
                        <span className="text-brand-neon">{skill.level}%</span>
                      </div>
                      
                      {/* Technical progress bar */}
                      <div className="h-2 w-full bg-brand-charcoal rounded-full overflow-hidden border border-brand-gray/40">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: sIdx * 0.1 }}
                          className="h-full bg-gradient-to-r from-brand-cyan to-brand-neon rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. FAQ (Accordion Frequently Asked Questions) */}
        <section id="faq" className="scroll-mt-24 space-y-8">
          
          <div className="flex items-center gap-3">
            <div className="h-[1px] bg-brand-gray flex-1" />
            <div className="text-center shrink-0 px-4 space-y-1">
              <h2 className="text-2xl md:text-3xl font-display font-extrabold tracking-tight text-white uppercase">
                INQUIRY FAQ
              </h2>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#CBFF00]/80 block">
                Standard Protocols & Process Information
              </span>
            </div>
            <div className="h-[1px] bg-brand-gray flex-1" />
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqData.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className="bg-brand-dark/30 border border-brand-gray/50 rounded-xl overflow-hidden hover:border-brand-gray/90 transition-all"
                >
                  <button
                    onClick={() => {
                      playTick();
                      setActiveFaq(isOpen ? null : idx);
                    }}
                    className="w-full px-5 py-4 flex items-center justify-between text-left font-display font-semibold text-sm md:text-base text-[#ffffff] hover:text-[#CBFF00] transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-xs font-mono text-brand-cyan">0{idx + 1} //</span>
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-4.5 h-4.5 text-brand-neutral transition-transform duration-200 ${isOpen ? "rotate-180 text-brand-neon" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-brand-neutral leading-relaxed border-t border-brand-gray/10 font-sans">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* 7. CONNECT GATEWAY (Contact section) */}
        <section id="contact" className="scroll-mt-24 space-y-8">
          
          <div className="flex items-center gap-3">
            <div className="h-[1px] bg-brand-gray flex-1" />
            <div className="text-center shrink-0 px-4 space-y-1">
              <h2 className="text-2xl md:text-3xl font-display font-extrabold tracking-tight text-white uppercase">
                CONNECT GATEWAY
              </h2>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#CBFF00]/80 block">
                Submit System Logs & Project Specs
              </span>
            </div>
            <div className="h-[1px] bg-brand-gray flex-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left direct channel contact blocks */}
            <div className="md:col-span-5 space-y-4">
              <div className="bg-brand-dark/40 border-2 border-brand-gray/50 rounded-xl p-5 relative overflow-hidden group">
                {/* Corner detail */}
                <div className="absolute top-0 right-0 p-3 opacity-5 text-brand-neutral font-mono text-[9px]">DIAG_01</div>
                
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded bg-brand-charcoal text-brand-cyan">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-brand-neutral block">DIRECT ENVELOPE</span>
                    <strong className="text-xs font-mono text-white text-[13px]">{developerProfile.email}</strong>
                  </div>
                </div>
                <a 
                  href={`mailto:${developerProfile.email}`} 
                  onClick={playRev}
                  className="text-[11px] font-mono text-brand-cyan hover:text-brand-light flex items-center gap-1.5 transition-colors"
                >
                  INITIATE EMAIL OVERLAY <ChevronRight className="w-3 h-3" />
                </a>
              </div>

              <div className="bg-brand-dark/40 border-2 border-brand-gray/50 rounded-xl p-5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 opacity-5 text-brand-neutral font-mono text-[9px]">DIAG_02</div>
                
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded bg-brand-charcoal text-[#3b5998]">
                    <Facebook className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-brand-neutral block">MESSENGER GATEWAY</span>
                    <strong className="text-xs font-mono text-white text-[13px]">Anil Baniya (Gyanu)</strong>
                  </div>
                </div>
                <a 
                  href="https://m.me/gyanu.baniya" 
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playRev}
                  className="text-[11px] font-mono text-brand-cyan hover:text-brand-light flex items-center gap-1.5 transition-colors"
                >
                  LAUNCH SOCIAL CONSOLE <ChevronRight className="w-3 h-3" />
                </a>
              </div>

              {/* Secure status feed box */}
              <div className="p-4 bg-[#050607]/90 border border-brand-charcoal rounded-xl text-[11px] font-mono text-brand-neutral space-y-2">
                <div className="flex items-center gap-1.5 text-brand-cyan font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-pulse" />
                  OPERATIONAL FEEDS
                </div>
                <p className="leading-relaxed">
                  System logs generated in this browser are stored safely in local memory buckets. Form transmissions are queued for near-instant dispatch protocols.
                </p>
              </div>
            </div>

            {/* Right direct message dispatcher */}
            <div className="bg-brand-dark/40 border-2 border-brand-gray/50 rounded-xl p-6 md:p-8 md:col-span-7 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-8 h-[2px] bg-brand-cyan/50" />
              <div className="absolute top-0 left-0 w-[2px] h-8 bg-brand-cyan/50" />

              <AnimatePresence>
                {formStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-brand-dark/95 z-20 flex flex-col items-center justify-center p-6 text-center space-y-4"
                  >
                    <div className="w-12 h-12 rounded-full border border-[#CBFF00]/40 flex items-center justify-center text-brand-neon bg-[#CBFF00]/5">
                      <Terminal className="w-5 h-5 animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-display font-bold text-lg text-white">DISPATCH TRANSMITTED!</h4>
                      <span className="text-[10px] font-mono text-[#CBFF00]/70">PACKET_LOC_LOGGED::OK</span>
                    </div>
                    <p className="text-xs text-brand-neutral max-w-xs leading-relaxed">
                      Thank you. Your project metadata and message parameters have been written safely to local memory storage. I will review and reply swiftly.
                    </p>
                    <button
                      onClick={() => setFormStatus("idle")}
                      className="px-4 py-2 border border-brand-gray bg-brand-charcoal hover:bg-brand-gray rounded font-mono text-xs text-white cursor-pointer transition-colors"
                    >
                      SEND REMAINING SPEC
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                <h3 className="text-base font-mono text-brand-light flex items-center gap-1.5 font-bold">
                  <span className="text-brand-neon">[SYS]</span> DISPATCH TRANSMISSION FORM
                </h3>

                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-wider text-brand-neutral uppercase block">
                    NAME / CREDENTIAL
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="E.g., Dr. Sharma CareSync"
                    className="w-full p-3 bg-brand-black border border-brand-gray text-brand-light placeholder-[#555e67] text-sm rounded-lg focus:outline-none focus:border-brand-cyan transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-wider text-brand-neutral uppercase block">
                    EMAIL INDEX / PORT
                  </label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="E.g., visitor@network.org"
                    className="w-full p-3 bg-brand-black border border-brand-gray text-brand-light placeholder-[#555e67] text-sm rounded-lg focus:outline-none focus:border-brand-cyan transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-wider text-brand-neutral uppercase block">
                    MESSAGE PAYLOAD / SCHEMAS
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Submit your prospective outline details here..."
                    className="w-full p-3 bg-brand-black border border-brand-gray text-brand-light placeholder-[#555e67] text-sm rounded-lg focus:outline-none focus:border-brand-cyan transition-colors leading-relaxed resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="w-full py-3 bg-brand-neon text-brand-black font-mono font-bold text-xs rounded-lg hover:bg-brand-light transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:scale-[1.01]"
                >
                  {formStatus === "submitting" ? "DISPATCHING PACKETS..." : "DISPATCH SYSTEM INQUIRY"}
                </button>
              </form>

            </div>

          </div>
        </section>

      </main>

      {/* FIXED IMMERSIVE NAVIGATION DOCK */}
      <Dock
        onNavigate={handleNavigate}
        onOpenCommand={() => {
          playChirp();
          setIsCommandOpen(true);
        }}
        activeSection={activeSection}
      />

    </div>
  );
}
