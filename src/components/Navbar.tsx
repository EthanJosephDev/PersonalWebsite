import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
];

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [sayHiHovered, setSayHiHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const scrollPosition = window.scrollY + 280;

      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const link = NAV_LINKS[i];
        const section = document.getElementById(link.id);
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActive(link.label);
            return;
          }
        }
      }

      if (window.scrollY < 200) {
        setActive("Home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center pt-3 sm:pt-5 px-4 pointer-events-none">
      {/* Visual Playground Button */}
      <Link
        to="/experimental/"
        aria-label="Experimental — Visual Playground"
        title="Experimental"
        className="pointer-events-auto group absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 mt-1.5 sm:mt-2.5 inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/[0.14] bg-neutral-950/40 backdrop-blur-2xl text-neutral-400 hover:text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-white/30 hover:scale-105 hover:bg-white/[0.08]"
      >
        <FlaskConical className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
      </Link>

      {/* Main Liquid Glass Capsule Bar */}
      <nav
        className={`pointer-events-auto relative inline-flex items-center gap-1 rounded-full border border-white/[0.13] bg-neutral-950/45 p-1.5 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),inset_0_-1px_1px_rgba(0,0,0,0.4),0_12px_40px_rgba(0,0,0,0.55)] transition-all duration-400 ${
          scrolled
            ? "border-white/[0.18] bg-neutral-950/65 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_16px_50px_rgba(0,0,0,0.7)]"
            : ""
        }`}
      >
        {/* Specular Liquid Sheen on Top */}
        <div className="pointer-events-none absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        {/* Logo Avatar */}
        <a
          href="#home"
          className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full p-[1px] transition-transform duration-200 hover:scale-105"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          style={{
            background: logoHovered
              ? "linear-gradient(135deg, #60a5fa 0%, #a855f7 100%)"
              : "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.08) 100%)",
          }}
        >
          <span className="flex h-full w-full items-center justify-center rounded-full bg-[#09090b]/90 shadow-inner">
            <span
              className={`text-xs sm:text-[13px] font-display italic font-semibold tracking-tighter text-white transition-transform duration-200 ${
                logoHovered ? "scale-110" : ""
              }`}
            >
              EJ
            </span>
          </span>
        </a>

        {/* Subtle Divider */}
        <span className="h-4 w-px bg-white/10 mx-0.5" />

        {/* Nav Links with Smooth Floating Pill */}
        <div className="flex items-center gap-0.5">
          {NAV_LINKS.map((link) => {
            const isCurrent = active === link.label;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setActive(link.label)}
                className={`relative px-2.5 sm:px-3.5 py-1.5 text-xs sm:text-[13px] font-medium transition-colors duration-200 ${
                  isCurrent
                    ? "text-white"
                    : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                {isCurrent && (
                  <motion.div
                    layoutId="liquidActivePill"
                    className="absolute inset-0 rounded-full border border-white/15 bg-white/[0.1] shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] backdrop-blur-sm"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}

          {/* Resume Link */}
          <a
            href="/Ethan_Joseph_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="relative px-2.5 sm:px-3.5 py-1.5 text-xs sm:text-[13px] font-medium text-neutral-400 hover:text-neutral-200 transition-colors duration-200 rounded-full hover:bg-white/[0.05]"
          >
            Resume
          </a>
        </div>

        {/* Subtle Divider */}
        <span className="h-4 w-px bg-white/10 mx-0.5" />

        {/* Contact / Email Action Button (Smooth Spring Expanding Pill, Direct mailto) */}
        <motion.a
          layout
          href="mailto:josepe15@mcmaster.ca"
          onMouseEnter={() => setSayHiHovered(true)}
          onMouseLeave={() => setSayHiHovered(false)}
          transition={{
            layout: { type: "spring", stiffness: 420, damping: 32 },
          }}
          className="relative group inline-flex items-center justify-center overflow-hidden rounded-full border border-white/[0.12] bg-white/[0.04] px-3.5 sm:px-4 py-1.5 text-xs sm:text-[13px] font-medium text-neutral-200 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)] transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.09] hover:text-white"
        >
          <span
            className={`absolute inset-0 rounded-full transition-opacity duration-300 pointer-events-none ${
              sayHiHovered
                ? "opacity-100 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                : "opacity-0"
            }`}
          />
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={sayHiHovered ? "email" : "label"}
              initial={{ opacity: 0, y: 5, filter: "blur(3px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -5, filter: "blur(3px)" }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="relative z-10 flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>{sayHiHovered ? "josepe15@mcmaster.ca" : "Say hi"}</span>
              <span className="text-[10px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </motion.span>
          </AnimatePresence>
        </motion.a>
      </nav>
    </header>
  );
};

export default Navbar;
