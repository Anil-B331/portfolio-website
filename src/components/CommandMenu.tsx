import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Search, Terminal, Mail, Briefcase, Cpu, FileText, ArrowUpRight, Sparkles, Volume2, VolumeX, HelpCircle, PhoneCall } from "lucide-react";
import { playTick, playChirp, isSoundEnabled, setSoundEnabled } from "./SoundEffects";

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function CommandMenu({ isOpen, onClose, onNavigate }: CommandMenuProps) {
  const [search, setSearch] = useState("");
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, [isOpen]);

  // Handle clicking outside modal to close
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      playTick();
      onClose();
    }
  };

  const handleSoundToggle = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);
    setSoundEnabled(nextState);
    playChirp();
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("gyanubaniya6611@gmail.com");
    alert("Email copied to clipboard: gyanubaniya6611@gmail.com");
    playChirp();
    onClose();
  };

  const commands = [
    {
      id: "nav-hero",
      title: "Jump to Grid Start (Hero)",
      subtitle: "Scroll to top entry dashboard",
      category: "Navigation",
      icon: Sparkles,
      action: () => {
        onNavigate("hero");
        onClose();
      }
    },
    {
      id: "nav-bento",
      title: "Explore Bento Workspace",
      subtitle: "View real-time Nepal hours and quick stats",
      category: "Navigation",
      icon: Terminal,
      action: () => {
        onNavigate("workspace");
        onClose();
      }
    },
    {
      id: "nav-projects",
      title: "Navigate to Featured Projects",
      subtitle: "See selected works and engineering cases",
      category: "Navigation",
      icon: FileText,
      action: () => {
        onNavigate("projects");
        onClose();
      }
    },
    {
      id: "nav-experience",
      title: "Read Technical Experience",
      subtitle: "Full-Stack roles and systems led",
      category: "Navigation",
      icon: Briefcase,
      action: () => {
        onNavigate("experience");
        onClose();
      }
    },
    {
      id: "nav-skills",
      title: "Audit Skills & Languages",
      subtitle: "System capabilities and technology radars",
      category: "Navigation",
      icon: Cpu,
      action: () => {
        onNavigate("skills");
        onClose();
      }
    },
    {
      id: "nav-faq",
      title: "Frequently Asked Questions",
      subtitle: "Remote procedures and systemic approaches",
      category: "Navigation",
      icon: HelpCircle,
      action: () => {
        onNavigate("faq");
        onClose();
      }
    },
    {
      id: "nav-contact",
      title: "Initiate Project Talk (Contact)",
      subtitle: "Submit project inquiry or call options",
      category: "Navigation",
      icon: PhoneCall,
      action: () => {
        onNavigate("contact");
        onClose();
      }
    },
    {
      id: "action-email",
      title: "Copy Direct Email Address",
      subtitle: "gyanubaniya6611@gmail.com",
      category: "Actions",
      icon: Mail,
      action: copyEmail
    },
    {
      id: "action-sound",
      title: soundOn ? "Mute Immersive FX Sounds" : "Enable Immersive FX Sounds",
      subtitle: "Toggle Web Audio interactive tones",
      category: "Actions",
      icon: soundOn ? VolumeX : Volume2,
      action: handleSoundToggle
    }
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.title.toLowerCase().includes(search.toLowerCase()) ||
    cmd.subtitle.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="cmd-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-black/80 backdrop-blur-md p-4 md:p-8"
        >
          <motion.div
            id="cmd-modal-container"
            ref={containerRef}
            initial={{ scale: 0.95, y: 15, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 15, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="w-full max-w-2xl bg-brand-dark/95 border-2 border-brand-gray/80 rounded-xl overflow-hidden shadow-2xl relative"
          >
            {/* Top Indicator Border */}
            <div className="h-1 bg-gradient-to-r from-brand-neon via-brand-cyan to-brand-orange w-full" />

            {/* Input Header */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-brand-charcoal">
              <Search className="w-5 h-5 text-brand-neutral" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  playTick();
                }}
                placeholder="Type a command or keywords to search..."
                className="flex-1 bg-transparent border-none text-brand-light placeholder-[#555e67] focus:outline-none focus:ring-0 font-sans text-base"
              />
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-mono bg-brand-charcoal text-brand-neutral px-2 py-1 rounded border border-brand-gray">ESC</span>
              </div>
            </div>

            {/* Results Area */}
            <div className="max-h-[380px] overflow-y-auto p-2 no-scrollbar">
              {filteredCommands.length > 0 ? (
                <div>
                  {["Navigation", "Actions"].map(category => {
                    const catCmds = filteredCommands.filter(c => c.category === category);
                    if (catCmds.length === 0) return null;

                    return (
                      <div key={category} className="mb-4">
                        <div className="text-[10px] uppercase font-mono tracking-widest text-[#CBFF00]/80 px-3 py-1 mb-1">
                          {category}
                        </div>
                        <div className="space-y-1">
                          {catCmds.map((cmd) => {
                            const IconComponent = cmd.icon;
                            return (
                              <button
                                key={cmd.id}
                                onClick={() => {
                                  playChirp();
                                  cmd.action();
                                }}
                                className="w-full flex items-center justify-between text-left px-3 py-2.5 rounded-lg hover:bg-brand-gray/50 border border-transparent hover:border-brand-charcoal group transition-all duration-150"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="p-1.5 rounded bg-brand-charcoal text-brand-neutral group-hover:text-brand-neon group-hover:bg-brand-gray transition-colors">
                                    <IconComponent className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-brand-light group-hover:text-[#ffffff] transition-colors">
                                      {cmd.title}
                                    </div>
                                    <div className="text-xs text-brand-neutral">
                                      {cmd.subtitle}
                                    </div>
                                  </div>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                                  <span className="text-[10px] font-mono text-[#CBFF00] flex items-center gap-0.5">
                                    EXECUTE <ArrowUpRight className="w-3 h-3" />
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Terminal className="w-8 h-8 mx-auto text-brand-neutral mb-3 animate-pulse" />
                  <p className="text-sm text-brand-neutral font-mono">No telemetry found matching "{search}"</p>
                  <button
                    onClick={() => {
                      setSearch("");
                      playChirp();
                    }}
                    className="mt-3 text-xs text-brand-neon border border-brand-neon/30 px-3 py-1 rounded hover:bg-brand-neon/10 transition-colors font-mono"
                  >
                    Clear Filter
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Status bar */}
            <div className="px-4 py-2 bg-brand-charcoal/50 border-t border-brand-charcoal flex items-center justify-between text-[11px] text-brand-neutral font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#CBFF00] animate-ping" />
                COMMAND GATEWAY v1.0.4
              </span>
              <span>
                SHORTCUT: <kbd className="bg-brand-gray px-1.5 py-0.5 rounded border border-brand-charcoal">⌘ K</kbd> or <kbd className="bg-brand-gray px-1.5 py-0.5 rounded border border-brand-charcoal">CTRL K</kbd>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
