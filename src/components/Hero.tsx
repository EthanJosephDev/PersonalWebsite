import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import gsap from "gsap";
import Navbar from "./Navbar";
import mcmasterShield from "@/assets/mcmaster-shield.png";
import donemakerLogo from "@/assets/donemaker-logo.jpg";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2 },
        0.1
      );

      tl.fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1,
          stagger: 0.1,
        },
        0.3
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex flex-col">
      <Navbar />

      {/* Background video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          src="/black-hole.mp4"
          poster="/black-hole.jpg"
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6 mt-8">
          Ethan Joseph
        </h1>

        <div className="blur-in flex flex-col items-center justify-center gap-2 mb-8">
          <p className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-lg md:text-xl lg:text-2xl text-muted">
            <span className="font-display italic text-text-primary">
              Software Engineering
            </span>
            <span className="inline-flex items-center gap-1.5">
              @ McMaster
              <img
                src={mcmasterShield}
                alt="McMaster University Shield"
                className="inline-block h-[18px] sm:h-[21px] md:h-[23px] w-auto object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)] translate-y-[-0.5px]"
              />
            </span>
          </p>

          <p className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-base md:text-lg lg:text-xl text-muted">
            <span className="text-muted/70 text-sm md:text-base">prev.</span>
            <span className="font-display italic text-text-primary">
              Software Engineer Intern
            </span>
            <span className="inline-flex items-center gap-1.5">
              @ DoneMaker
              <img
                src={donemakerLogo}
                alt="DoneMaker Logo"
                className="inline-block h-[17px] w-[17px] sm:h-[19px] sm:w-[19px] rounded-full object-cover border border-white/20 drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]"
              />
            </span>
          </p>
        </div>

        <p className="blur-in text-sm md:text-base text-muted leading-relaxed max-w-lg mb-12">
          Full-stack and backend engineering focused on applied AI and agentic systems.
        </p>

        {/* CTA & Social Buttons */}
        <div className="blur-in flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <ContactButton />
          <ViewResumeButton />
          <SocialIconButton
            href="https://github.com/klazhiki"
            icon={Github}
            label="GitHub Profile"
          />
          <SocialIconButton
            href="https://www.linkedin.com/in/ethan-joseph-990a29282/"
            icon={Linkedin}
            label="LinkedIn Profile"
          />
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="blur-in absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs text-muted uppercase tracking-[0.2em]">
          SCROLL
        </span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden">
          <div className="w-full h-1/2 bg-text-primary animate-scroll-down" />
        </div>
      </div>
    </section>
  );
};

const SocialIconButton = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group relative inline-flex h-[46px] w-[46px] sm:h-[50px] sm:w-[50px] items-center justify-center overflow-hidden rounded-full border border-white/[0.14] bg-neutral-950/45 text-neutral-300 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.22),0_10px_35px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-white/35 hover:bg-white/[0.1] hover:text-white hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_12px_40px_rgba(0,0,0,0.65),0_0_20px_rgba(255,255,255,0.15)]"
    >
      {/* Specular hairline top sheen */}
      <span className="pointer-events-none absolute inset-x-2 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
      <Icon className="relative z-10 h-4 w-4 sm:h-[18px] sm:w-[18px] transition-transform duration-200 group-hover:scale-110" />
    </motion.a>
  );
};

const ContactButton = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      layout
      href="mailto:josepe15@mcmaster.ca"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      transition={{
        layout: { type: "spring", stiffness: 380, damping: 28 },
      }}
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/[0.16] bg-neutral-950/50 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.28),0_10px_35px_rgba(0,0,0,0.55)] transition-colors duration-300 hover:border-white/35 hover:bg-white/[0.1] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_12px_40px_rgba(0,0,0,0.65),0_0_25px_rgba(59,130,246,0.2)]"
    >
      {/* Specular hairline top sheen */}
      <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={hovered ? "email" : "contact"}
          initial={{ opacity: 0, y: 5, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -5, filter: "blur(3px)" }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="relative z-10 flex items-center gap-1.5 whitespace-nowrap"
        >
          <span>{hovered ? "josepe15@mcmaster.ca" : "Contact"}</span>
          <span className="text-xs text-neutral-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            ↗
          </span>
        </motion.span>
      </AnimatePresence>
    </motion.a>
  );
};

const ViewResumeButton = () => {
  return (
    <a
      href="/Ethan_Joseph_Resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-white/[0.13] bg-neutral-950/40 px-7 py-3.5 text-sm font-medium text-neutral-300 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_10px_35px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:text-white hover:scale-105 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_12px_40px_rgba(0,0,0,0.6)]"
    >
      {/* Specular hairline top sheen */}
      <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <span className="relative z-10 flex items-center gap-1.5">
        View Resume
        <span className="text-xs text-neutral-400 transition-transform duration-200 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          ↗
        </span>
      </span>
    </a>
  );
};

export default Hero;
