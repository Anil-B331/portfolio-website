import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, MapPin, Coffee, Code2, Cpu, Sparkles, Mail, Github, Linkedin, Check, ChevronRight, Terminal, Radio } from "lucide-react";
import { playTick, playChirp, playRev } from "./SoundEffects";

export default function BentoGrid() {
  const [nepalTime, setNepalTime] = useState("");
  const [nepalDateString, setNepalDateString] = useState("");
  const [nepalStatus, setNepalStatus] = useState("Active");
  const [espressoCount, setEspressoCount] = useState(() => {
    return Number(localStorage.getItem("espresso_count") || "4");
  });
  const [commitCount, setCommitCount] = useState(() => {
    return Number(localStorage.getItem("commit_count") || "4892");
  });
  const [showCopied, setShowCopied] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);

  const logs = [
    "Initializing git modules... Done",
    "Running telemetry server... 3000/active",
    "Fetching upstream caches... 100% synced",
    "Indexing Redis clusters... 12ms latency",
    "Warming up React canvas components... ready",
    "Refactoring SQL schemas for deployment... success"
  ];

  // Nepal Digital Clock Calculation (UTC+5:45)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const nepalOffset = 5.75; // 5 hours 45 mins
      const nptDate = new Date(utc + 3600000 * nepalOffset);

      // Format Time
      const hours = String(nptDate.getHours()).padStart(2, "0");
      const minutes = String(nptDate.getMinutes()).padStart(2, "0");
      const seconds = String(nptDate.getSeconds()).padStart(2, "0");
      setNepalTime(`${hours}:${minutes}:${seconds}`);

      // Format Date
      const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric"
      };
      setNepalDateString(nptDate.toLocaleDateString("en-US", options));

      // Calculate state status
      const hr = nptDate.getHours();
      if (hr >= 9 && hr < 18) {
        setNepalStatus("Coding in Kathmandu Office");
      } else if (hr >= 18 && hr < 23) {
        setNepalStatus("Refining Open Source / Remoting");
      } else {
        setNepalStatus("Powering Down / Dreaming");
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Moving terminal lines
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % logs.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleBrewEspresso = () => {
    const nextCount = espressoCount + 1;
    setEspressoCount(nextCount);
    localStorage.setItem("espresso_count", String(nextCount));
    playChirp();
  };

  const handlePushCommit = () => {
    const nextCount = commitCount + 1;
    setCommitCount(nextCount);
    localStorage.setItem("commit_count", String(nextCount));
    playRev();
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("gyanubaniya6611@gmail.com");
    setShowCopied(true);
    playChirp();
    setTimeout(() => {
      setShowCopied(false);
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {/* 1. Bio & Interactive Status Card (Medium-Wide - Spans 2 columns on medium up) */}
      <motion.div
        id="bento-bio"
        whileHover={{ y: -3 }}
        transition={{ duration: 0.15 }}
        className="md:col-span-2 bg-brand-dark/40 border-2 border-brand-gray/50 rounded-xl p-6 flex flex-col justify-between relative overflow-hidden group hover:border-brand-neon/40 transition-colors"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 group-hover:opacity-10 transition-all text-brand-neutral pointer-events-none">
          <Terminal className="w-48 h-48" />
        </div>

        {/* Blueprint line decorations */}
        <div className="absolute top-0 left-0 w-8 h-[2px] bg-brand-neon/50" />
        <div className="absolute top-0 left-0 w-[2px] h-8 bg-brand-neon/50" />

        <div className="space-y-4 relative">
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-brand-charcoal px-2 py-1 border border-brand-gray text-brand-neutral rounded font-mono">WORKSPACE CORE</span>
            <span className="flex items-center gap-1 text-[10px] bg-brand-neon/10 text-brand-neon border border-brand-neon/20 px-2 py-1 rounded font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-pulse" />
              STABLE ONLINE
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="font-display text-2xl font-semibold text-brand-light">
              Crafting Software in high fidelity.
            </h3>
            <p className="text-sm text-brand-neutral max-w-xl leading-relaxed">
              Based in Nepal, I engineer robust backend architectures and highly responsive interfaces. I focus on optimizing distributed workloads, containerizing APIs, and designing seamless component libraries with rich feedback profiles.
            </p>
          </div>
        </div>

        {/* Console logs visualizer - 21st.dev terminal refrence */}
        <div className="mt-6 p-3 rounded-lg bg-[#050607] border border-brand-charcoal text-xs font-mono text-[#CBFF00]/95 relative overflow-hidden flex items-center justify-between gap-2">
          <span className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 animate-pulse text-brand-cyan shrink-0" />
            <AnimatePresence mode="wait">
              <motion.span
                key={currentLine}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="truncate block"
              >
                {logs[currentLine]}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="text-[9px] text-brand-neutral border border-brand-charcoal px-1.5 py-0.5 rounded shrink-0">NPT TELEMETRY</span>
        </div>
      </motion.div>

      {/* 2. Kathmandu Live Clock Card (Small - Spans 1 column) */}
      <motion.div
        id="bento-clock"
        whileHover={{ y: -3 }}
        transition={{ duration: 0.15 }}
        onMouseEnter={playTick}
        className="bg-brand-dark/40 border-2 border-brand-gray/50 rounded-xl p-6 flex flex-col justify-between hover:border-brand-cyan/40 transition-colors relative group"
      >
        <div className="absolute top-0 left-0 w-8 h-[2px] bg-brand-cyan/50" />
        <div className="absolute top-0 left-0 w-[2px] h-8 bg-brand-cyan/50" />

        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-brand-neutral flex items-center gap-1">
            <MapPin className="w-3 h-3 text-brand-cyan" />
            KATHMANDU, NP (UTC+5:45)
          </span>
          <Clock className="w-4 h-4 text-brand-cyan group-hover:rotate-12 transition-transform" />
        </div>

        <div className="space-y-1 py-4">
          <div className="font-mono text-3xl font-semibold tracking-wider text-brand-light tabular-nums filter drop-shadow-[0_0_10px_rgba(0,240,255,0.1)]">
            {nepalTime || "00:00:00"}
          </div>
          <div className="text-xs font-mono text-brand-neutral uppercase">
            {nepalDateString || "LOADING NPT TIME..."}
          </div>
        </div>

        <div className="text-[11px] font-mono text-brand-cyan border-t border-brand-charcoal pt-3 mt-1 flex items-center justify-between">
          <span>STATUS:</span>
          <span className="font-sans font-medium text-[#ffffff] flex items-center gap-1 relative">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-ping" />
            {nepalStatus}
          </span>
        </div>
      </motion.div>

      {/* 3. Interactive Stats Counter Card (Small - Spans 1 column) */}
      <motion.div
        id="bento-stats-espresso"
        whileHover={{ y: -3 }}
        transition={{ duration: 0.15 }}
        className="bg-brand-dark/40 border-2 border-brand-gray/50 rounded-xl p-6 flex flex-col justify-between hover:border-brand-orange/40 transition-colors relative"
      >
        {/* Border accents */}
        <div className="absolute top-0 left-0 w-8 h-[2px] bg-brand-orange/50" />
        <div className="absolute top-0 left-0 w-[2px] h-8 bg-brand-orange/50" />

        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-brand-neutral flex items-center gap-1">
            <Coffee className="w-3.5 h-3.5 text-brand-orange" />
            CAFFEINE INTEGRATION
          </span>
          <span className="text-[10px] font-mono text-brand-neutral">LOCAL STORAGE PERSISTED</span>
        </div>

        <div className="py-4 space-y-1">
          <div className="font-mono text-4xl font-semibold text-brand-light">
            {espressoCount} <span className="text-xs text-brand-neutral">CUPS</span>
          </div>
          <div className="text-xs text-brand-neutral">
            Fuel index for clean system architectures.
          </div>
        </div>

        <button
          onClick={handleBrewEspresso}
          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-brand-orange/10 hover:bg-brand-orange/20 border border-brand-orange/20 hover:border-brand-orange/40 transition-all font-mono text-xs text-brand-orange"
        >
          BREW NEW ESPRESSO
          <ChevronRight className="w-3 h-3" />
        </button>
      </motion.div>

      {/* 4. Interactive Commit Pushing Emulator (Small - Spans 1 column) */}
      <motion.div
        id="bento-stats-commits"
        whileHover={{ y: -3 }}
        transition={{ duration: 0.15 }}
        className="bg-brand-dark/40 border-2 border-brand-gray/50 rounded-xl p-6 flex flex-col justify-between hover:border-brand-neon/40 transition-colors relative"
      >
        {/* Border accents */}
        <div className="absolute top-0 left-0 w-8 h-[2px] bg-brand-neon/50" />
        <div className="absolute top-0 left-0 w-[2px] h-8 bg-brand-neon/50" />

        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-brand-neutral flex items-center gap-1">
            <Code2 className="w-3.5 h-3.5 text-brand-neon" />
            GIT TELEMETRYINDEX
          </span>
          <span className="text-[10px] font-mono text-[#CBFF00] animate-pulse">EMULATOR</span>
        </div>

        <div className="py-4 space-y-1">
          <div className="font-mono text-4xl font-semibold text-brand-light">
            {commitCount} <span className="text-xs text-brand-neutral">PUSHES</span>
          </div>
          <div className="text-xs text-brand-neutral">
            Simulated and logged upstream repository commits.
          </div>
        </div>

        <button
          onClick={handlePushCommit}
          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#CBFF00]/10 hover:bg-[#CBFF00]/20 border border-[#CBFF00]/20 hover:border-[#CBFF00]/40 transition-all font-mono text-xs text-brand-neon"
        >
          STASH & PUSH COMMIT
          <ChevronRight className="w-3 h-3" />
        </button>
      </motion.div>

      {/* 5. Quick Connect & Socials block (Small - Spans 1 column) */}
      <motion.div
        id="bento-connect"
        whileHover={{ y: -3 }}
        transition={{ duration: 0.15 }}
        className="bg-brand-dark/40 border-2 border-brand-gray/50 rounded-xl p-6 flex flex-col justify-between hover:border-brand-neon/40 transition-colors relative"
      >
        {/* Border accents */}
        <div className="absolute top-0 left-0 w-8 h-[2px] bg-brand-neon/30" />
        <div className="absolute top-0 left-0 w-[2px] h-8 bg-brand-neon/30" />

        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-brand-neutral flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-brand-neon" />
            EXTERNAL HOOKS
          </span>
          <span className="text-[10px] font-mono text-brand-neutral">CONNECT SECURELY</span>
        </div>

        <div className="py-3 flex flex-col gap-2">
          <a
            href="https://github.com/gyanubaniya"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playTick}
            className="flex items-center justify-between p-2 rounded bg-brand-charcoal/50 border border-brand-charcoal hover:border-[#ffffff]/20 group/link transition-colors text-xs text-brand-neutral hover:text-brand-light"
          >
            <span className="flex items-center gap-2 font-mono">
              <Github className="w-4 h-4 text-brand-light" />
              /gyanubaniya
            </span>
            <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 transition-opacity" />
          </a>

          <a
            href="https://linkedin.com/in/gyanubaniya"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playTick}
            className="flex items-center justify-between p-2 rounded bg-brand-charcoal/50 border border-brand-charcoal hover:border-[#ffffff]/20 group/link transition-colors text-xs text-brand-neutral hover:text-brand-light"
          >
            <span className="flex items-center gap-2 font-mono">
              <Linkedin className="w-4 h-4 text-brand-cyan" />
              /in/gyanubaniya
            </span>
            <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 transition-opacity" />
          </a>
        </div>

        <button
          onClick={handleCopyEmail}
          className="w-full py-2.5 rounded-lg bg-brand-light hover:bg-[#ffffff] text-brand-black transition-colors font-mono text-xs font-semibold flex items-center justify-center gap-2 relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {showCopied ? (
              <motion.span
                key="copied"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="flex items-center gap-1 text-[#000000]"
              >
                <Check className="w-3.5 h-3.5" /> COPIED EMAIL!
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="flex items-center gap-1"
              >
                <Mail className="w-3.5 h-3.5" /> COPY EMAIL ADDR
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </motion.div>
    </div>
  );
}
