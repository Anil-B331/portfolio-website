import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, Briefcase, FileText, Cpu, Mail, Sparkles, Volume2, VolumeX, HelpCircle } from "lucide-react";
import { playTick, playChirp, isSoundEnabled, setSoundEnabled } from "./SoundEffects";

interface DockProps {
  onNavigate: (sectionId: string) => void;
  onOpenCommand: () => void;
  activeSection: string;
}

export default function Dock({ onNavigate, onOpenCommand, activeSection }: DockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, []);

  const toggleSound = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);
    setSoundEnabled(nextState);
    playChirp();
  };

  const dockItems = [
    { id: "hero", label: "Home Start", icon: Home },
    { id: "workspace", label: "Telemetry Grid", icon: Sparkles },
    { id: "projects", label: "Selected Works", icon: FileText },
    { id: "experience", label: "Career Blueprint", icon: Briefcase },
    { id: "skills", label: "System Stack", icon: Cpu },
    { id: "faq", label: "Inquiry FAQ", icon: HelpCircle },
    { id: "contact", label: "Connect Gateway", icon: Mail },
  ];

  return (
    <div className="fixed bottom-6 left-0 right-0 z-40 flex justify-center pointer-events-none p-4">
      <motion.div
        id="floating-dock-container"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", damping: 20, stiffness: 400 }}
        className="pointer-events-auto bg-brand-dark/85 border border-brand-gray/80 backdrop-blur-md rounded-full px-4 py-2.5 flex items-center gap-2.5 md:gap-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.6)] border-b-2"
      >
        {/* Dock Items */}
        {dockItems.map((item, idx) => {
          const IconComp = item.icon;
          const isActive = activeSection === item.id;

          // Physics scale logic inspired by 21st.dev magnification docs
          let scale = 1;
          if (hoveredIndex !== null) {
            const distance = Math.abs(idx - hoveredIndex);
            if (distance === 0) scale = 1.25;
            else if (distance === 1) scale = 1.1;
          }

          return (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => {
                setHoveredIndex(idx);
                playTick();
              }}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <button
                onClick={() => {
                  playChirp();
                  onNavigate(item.id);
                }}
                style={{ transform: `scale(${scale})` }}
                className={`p-2.5 rounded-full flex items-center justify-center transition-all duration-150 relative ${
                  isActive
                    ? "bg-[#CBFF00] text-brand-black"
                    : "bg-brand-charcoal text-brand-neutral hover:text-[#ffffff] border border-brand-gray/50 hover:bg-brand-gray"
                }`}
              >
                <IconComp className="w-4 h-4" />

                {/* Soft glow on active */}
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-[#CBFF00]/35 animate-ping -z-10" />
                )}
              </button>

              {/* Tooltip */}
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: -45, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute -top-1 px-2.5 py-1 text-[10px] font-mono whitespace-nowrap bg-[#000000] border-2 border-brand-gray rounded text-[#ffffff] pointer-events-none tracking-wider -translate-x-1/2 left-1/2"
                  >
                    {item.label.toUpperCase()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* Divider line */}
        <div className="w-[1px] h-6 bg-brand-gray/60 self-center" />

        {/* Interactive sound utility toggle button */}
        <div
          className="relative"
          onMouseEnter={() => {
            setHoveredIndex(dockItems.length);
            playTick();
          }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <button
            onClick={toggleSound}
            style={{ transform: `scale(${hoveredIndex === dockItems.length ? 1.25 : 1})` }}
            className={`p-2.5 rounded-full flex items-center justify-center transition-all duration-150 ${
              soundOn
                ? "bg-brand-charcoal text-brand-neon hover:text-[#ffffff] border border-brand-[#CBFF00]/30 hover:bg-brand-gray"
                : "bg-brand-charcoal text-[#555e67] hover:text-brand-light border border-brand-gray/50"
            }`}
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <AnimatePresence>
            {hoveredIndex === dockItems.length && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: -45, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="absolute -top-1 px-2.5 py-1 text-[10px] font-mono whitespace-nowrap bg-[#000000] border-2 border-brand-gray rounded text-[#ffffff] pointer-events-none tracking-wider -translate-x-1/2 left-1/2"
              >
                {soundOn ? "MUTE SOUNDS" : "ENABLE AUDIO FX"}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Console Command Spotlight Menu launch button */}
        <div
          className="relative"
          onMouseEnter={() => {
            setHoveredIndex(dockItems.length + 1);
            playTick();
          }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <button
            onClick={onOpenCommand}
            style={{ transform: `scale(${hoveredIndex === dockItems.length + 1 ? 1.25 : 1})` }}
            className="p-2.5 rounded-full flex items-center justify-center bg-brand-charcoal border border-brand-neon/60 hover:border-brand-neon hover:bg-brand-gray text-[#ffffff] hover:text-[#ffffff] transition-all"
          >
            <Sparkles className="w-4 h-4 text-brand-neon animate-pulse" />
          </button>

          <AnimatePresence>
            {hoveredIndex === dockItems.length + 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: -45, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="absolute -top-1 px-2.5 py-1 text-[10px] font-mono whitespace-nowrap bg-[#000000] border-2 border-brand-gray rounded text-brand-neon pointer-events-none tracking-wider -translate-x-1/2 left-1/2"
              >
                LAUNCH COMMAND [⌘K]
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
