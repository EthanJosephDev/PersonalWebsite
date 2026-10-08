import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Code2,
  FileCode2,
  GitBranch,
  GitPullRequest,
  Menu,
  ScanLine,
  ShieldCheck,
  Terminal,
  X,
} from "lucide-react";
import "./sentinel.css";

const contact =
  "mailto:founder@ethanjoseph.dev?subject=Sentinel%20early%20access";

const stages = [
  {
    name: "Discover",
    icon: ScanLine,
    title: "Read the system. Find the weakness.",
    description:
      "A discovery agent maps repository context and follows how untrusted input moves through the code, looking for vulnerabilities that isolated pattern matches can miss.",
    file: "api/routes/documents.ts",
    label: "Potential path traversal",
    code: [
      "router.get('/documents/:name', (req, res) => {",
      "  const name = req.params.name;",
      "  const file = path.join(DOCUMENTS_DIR, name);",
      "  return res.sendFile(file);",
      "});",
    ],
    note: "User-controlled input reaches a filesystem operation.",
    status: "Candidate identified",
    line: 2,
  },
  {
    name: "Validate",
    icon: ShieldCheck,
    title: "Ask whether it can actually be exploited.",
    description:
      "A validation agent would investigate the reachable attack path and test exploitability, separating a plausible concern from a finding worth an engineer’s time.",
    file: "analysis / attack-path",
    label: "Trace the trust boundary",
    code: [
      "SOURCE   req.params.name",
      "   ↓     user-controlled path segment",
      "TRANSFORM   path.join(DOCUMENTS_DIR, name)",
      "   ↓     no containment check",
      "SINK     res.sendFile(file)",
    ],
    note: "Planned: validate reachability and exploit conditions.",
    status: "Validation design",
    line: 3,
  },
  {
    name: "Remediate",
    icon: GitPullRequest,
    title: "Turn the finding into a focused fix.",
    description:
      "A remediation agent would use the investigation to propose a targeted code change, with an explanation of the vulnerability and the reasoning behind the patch.",
    file: "proposed patch / documents.ts",
    label: "Constrain the resolved path",
    code: [
      "+ const file = path.resolve(DOCUMENTS_DIR, name);",
      "+ const relative = path.relative(DOCUMENTS_DIR, file);",
      "+ if (relative.startsWith('..') ||",
      "+     path.isAbsolute(relative)) {",
      "+   return res.sendStatus(403);",
      "+ }",
    ],
    note: "Illustrative patch; production fixes need context and review.",
    status: "Remediation design",
    line: 2,
  },
  {
    name: "Verify",
    icon: Check,
    title: "A patch is only the beginning.",
    description:
      "A verification agent would re-examine the changed code and run relevant checks to assess whether the fix closes the original issue without introducing a regression.",
    file: "verification / proposed checks",
    label: "Close the feedback loop",
    code: [
      "[ ] Re-evaluate the original attack path",
      "[ ] Reject paths outside the document root",
      "[ ] Preserve valid document access",
      "[ ] Check edge cases and regressions",
      "[ ] Return evidence for human review",
    ],
    note: "Planned verification checks, not executed test results.",
    status: "Verification design",
    line: -1,
  },
];

function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 36"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 2 29 8.5v10L16 34 3 18.5v-10L16 2Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="m9 12 7-3.5 7 3.5v5.5L16 26l-7-8.5V12Z" fill="currentColor" />
      <path
        d="M16 2v7M3 8.5l6 3.5m20-3.5L23 12M16 26v8"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function RepositoryVisual() {
  return (
    <div
      className="s-repo-visual"
      role="img"
      aria-label="Conceptual repository map: Sentinel connects entry points, data flow, and trust boundaries to investigate a potential vulnerability."
    >
      <div className="s-visual-top">
        <span>
          <span className="s-dot" /> REPOSITORY INTELLIGENCE
        </span>
        <span>FIG. 001</span>
      </div>
      <svg
        className="s-repo-map"
        viewBox="0 0 560 450"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="s-glow">
            <stop stopColor="#c8ed8c" stopOpacity=".12" />
            <stop offset="1" stopColor="#c8ed8c" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id="s-line"
            x1="100"
            y1="0"
            x2="460"
            y2="400"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#c8ed8c" stopOpacity=".1" />
            <stop offset=".5" stopColor="#c8ed8c" stopOpacity=".7" />
            <stop offset="1" stopColor="#c8ed8c" stopOpacity=".1" />
          </linearGradient>
        </defs>
        <circle cx="280" cy="221" r="220" fill="url(#s-glow)" />
        <g stroke="#b2c59d" strokeOpacity=".12">
          <ellipse
            cx="280"
            cy="220"
            rx="205"
            ry="76"
            transform="rotate(-30 280 220)"
          />
          <ellipse
            cx="280"
            cy="220"
            rx="205"
            ry="76"
            transform="rotate(30 280 220)"
          />
          <ellipse
            cx="280"
            cy="220"
            rx="205"
            ry="76"
            transform="rotate(90 280 220)"
          />
          <circle cx="280" cy="220" r="168" strokeDasharray="2 7" />
          <path d="M280 27v386M63 220h434" strokeDasharray="3 7" />
        </g>
        <g stroke="url(#s-line)" strokeWidth="1.2">
          <path d="m280 60 139 80v160l-139 80-139-80V140L280 60Z" />
          <path d="m280 112 94 54v108l-94 54-94-54V166l94-54Z" />
          <path d="m141 140 233 134M419 140 186 274M280 60v268M141 300l233-134M419 300l-233-134M280 380V112" />
          <path d="m141 140 139-28 139 28-45 134-94 106-94-106-45-134ZM141 300l45-134 94-106 94 106 45 134-139 28-139-28Z" />
        </g>
        <path
          className="s-trace"
          d="M141 140 280 220 419 300"
          stroke="#c8ed8c"
          strokeWidth="2"
        />
        <g fill="#c8ed8c">
          {[
            [280, 60],
            [419, 140],
            [419, 300],
            [280, 380],
            [141, 300],
            [141, 140],
            [280, 112],
            [374, 166],
            [374, 274],
            [280, 328],
            [186, 274],
            [186, 166],
          ].map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={i < 6 ? 3 : 2}
              opacity={i < 6 ? 0.9 : 0.5}
            />
          ))}
        </g>
        <circle
          cx="280"
          cy="220"
          r="44"
          fill="#151b13"
          stroke="#c8ed8c"
          strokeOpacity=".4"
        />
        <circle cx="280" cy="220" r="51" stroke="#c8ed8c" strokeOpacity=".12" />
        <path d="m280 195 18 9v14l-18 24-18-24v-14l18-9Z" fill="#c8ed8c" />
        <path
          d="m280 203 11 5.5v7.5L280 231l-11-15v-7.5l11-5.5Z"
          fill="#151b13"
        />
        <g fontFamily="monospace" fontSize="10" fill="#a0ab98">
          <text x="297" y="59">
            ENTRY POINT
          </text>
          <text x="65" y="326">
            DATA FLOW
          </text>
          <text x="364" y="330">
            TRUST BOUNDARY
          </text>
        </g>
        <g>
          <rect
            x="27"
            y="106"
            width="139"
            height="36"
            rx="5"
            fill="#1c211b"
            stroke="#414d36"
          />
          <circle cx="43" cy="124" r="3" fill="#c8ed8c" />
          <text
            x="55"
            y="128"
            fontFamily="monospace"
            fontSize="10"
            fill="#d6ddce"
          >
            routes / api.ts
          </text>
        </g>
        <g>
          <rect
            x="367"
            y="261"
            width="165"
            height="36"
            rx="5"
            fill="#24251c"
            stroke="#6a6540"
          />
          <circle cx="383" cy="279" r="3" fill="#e4c785" />
          <text
            x="395"
            y="283"
            fontFamily="monospace"
            fontSize="10"
            fill="#e4d7b6"
          >
            Investigate boundary
          </text>
        </g>
      </svg>
      <div className="s-visual-bottom">
        <span>Context before conclusions.</span>
        <span>
          CONCEPTUAL VIEW <ArrowUpRight size={12} />
        </span>
      </div>
    </div>
  );
}

export default function Sentinel() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeStage, setActiveStage] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const menuButton = useRef<HTMLButtonElement>(null);
  const stage = stages[activeStage];

  useEffect(() => {
    const previous = document.title;
    document.title =
      "Sentinel Security Labs — The autonomous AI security engineer";
    return () => {
      document.title = previous;
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [menuOpen]);

  return (
    <div className="sentinel">
      <a className="s-skip" href="#sentinel-main">
        Skip to content
      </a>
      <header className="s-header">
        <div className="s-container s-nav">
          <a
            className="s-brand"
            href="/sentinel/"
            aria-label="Sentinel Security Labs home"
          >
            <Mark />
            <span>
              sentinel<span className="s-brand-sub">SECURITY LABS</span>
            </span>
          </a>
          <nav className="s-desktop-nav" aria-label="Main navigation">
            <a href="#platform">Platform</a>
            <a href="#architecture">Architecture</a>
            <a href="#vision">Our vision</a>
          </nav>
          <a className="s-nav-cta" href={contact}>
            Get early access <ArrowUpRight size={15} />
          </a>
          <button
            ref={menuButton}
            className="s-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="s-mobile-nav"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        <nav
          id="s-mobile-nav"
          className="s-mobile-nav"
          aria-label="Mobile navigation"
          hidden={!menuOpen}
        >
          {[
            ["Platform", "#platform"],
            ["Architecture", "#architecture"],
            ["Our vision", "#vision"],
            ["Get early access", contact],
          ].map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>
              {label}
              <ArrowUpRight size={16} />
            </a>
          ))}
        </nav>
      </header>

      <main id="sentinel-main">
        <section className="s-hero s-container" aria-labelledby="s-hero-title">
          <div className="s-hero-copy">
            <div className="s-eyebrow">
              <span className="s-dot" /> AUTONOMOUS SECURITY. HUMAN AMBITION.
            </div>
            <h1 id="s-hero-title">
              Your code <br className="s-mobile-hero-break" />moves fast.
              <br />
              Security should
              <br />
              <span>think ahead.</span>
            </h1>
            <p className="s-hero-tagline">
              The autonomous AI security engineer
              <br className="s-desktop-break" /> for modern codebases.
            </p>
            <p className="s-hero-description">
              From understanding your repository to finding a path to a fix.
              We’re building Sentinel to turn security from an endless queue
              into work that gets done.
            </p>
            <div className="s-hero-actions">
              <a className="s-button s-button-primary" href={contact}>
                Get early access <ArrowUpRight size={18} />
              </a>
              <a className="s-text-link" href="#architecture">
                Explore the architecture <ArrowDown size={15} />
              </a>
            </div>
            <div className="s-hero-note">
              <span className="s-small-dot" /> In active development. Built for
              what comes next.
            </div>
          </div>
          <RepositoryVisual />
          <div className="s-hero-footer">
            <span>LESS NOISE. MORE UNDERSTANDING.</span>
            <span>
              REPOSITORY-AWARE <i /> AI-NATIVE <i /> REMEDIATION-FOCUSED
            </span>
          </div>
        </section>

        <section
          id="platform"
          className="s-platform s-section"
          aria-labelledby="s-platform-title"
        >
          <div className="s-container">
            <div className="s-section-top">
              <span className="s-eyebrow">
                01 / A DIFFERENT KIND OF SECURITY
              </span>
              <span className="s-section-aside">
                Built to understand, not just flag.
              </span>
            </div>
            <div className="s-intro-grid">
              <h2 id="s-platform-title">
                Another alert isn’t
                <br />
                <span>the answer.</span>
              </h2>
              <div>
                <p className="s-lead">
                  Your team needs a way through the noise.
                </p>
                <p>
                  Finding a suspicious line is only the start. Someone still has
                  to understand the surrounding system, investigate the risk,
                  and work out a fix. That’s the gap Sentinel is built to close.
                </p>
              </div>
            </div>
            <div className="s-principles">
              <article>
                <div className="s-principle-icon">
                  <GitBranch size={22} />
                  <span>01</span>
                </div>
                <h3>Understand the codebase.</h3>
                <p>
                  Security context lives across files and functions. Sentinel’s
                  prototype analyzes repositories to investigate code in
                  context.
                </p>
                <span className="s-card-foot">
                  CONTEXT OVER PATTERN MATCHES
                </span>
              </article>
              <article>
                <div className="s-principle-icon">
                  <ScanLine size={22} />
                  <span>02</span>
                </div>
                <h3>Investigate what matters.</h3>
                <p>
                  Our next step: specialized agents that interrogate potential
                  findings and validate exploitability before asking for your
                  attention.
                </p>
                <span className="s-card-foot">EVIDENCE OVER ALERT VOLUME</span>
              </article>
              <article>
                <div className="s-principle-icon">
                  <GitPullRequest size={22} />
                  <span>03</span>
                </div>
                <h3>Move toward resolution.</h3>
                <p>
                  AI-assisted remediation today. A connected workflow for
                  proposing and verifying fixes is the direction we’re building
                  toward.
                </p>
                <span className="s-card-foot">PROGRESS OVER BACKLOGS</span>
              </article>
            </div>
          </div>
        </section>

        <section
          id="architecture"
          className="s-workflow s-section"
          aria-labelledby="s-workflow-title"
        >
          <div className="s-container">
            <div className="s-section-top">
              <span className="s-eyebrow">02 / THE AUTONOMOUS WORKFLOW</span>
              <span className="s-status">NEXT-PHASE ARCHITECTURE</span>
            </div>
            <div className="s-workflow-heading">
              <h2 id="s-workflow-title">
                One mission.
                <br />
                <span>Specialized minds.</span>
              </h2>
              <p>
                We’re designing a Claude-powered team of agents, each
                responsible for a different part of the security investigation.
                From the first signal to a verified fix.
              </p>
            </div>
            <div
              className="s-agent-tabs"
              role="tablist"
              aria-label="Explore the planned agent workflow"
            >
              {stages.map((item, index) => (
                <button
                  key={item.name}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  id={`s-tab-${index}`}
                  role="tab"
                  aria-selected={activeStage === index}
                  aria-controls="s-agent-panel"
                  tabIndex={activeStage === index ? 0 : -1}
                  onClick={() => setActiveStage(index)}
                  onKeyDown={(event) => {
                    let next = index;
                    if (event.key === "ArrowRight")
                      next = (index + 1) % stages.length;
                    else if (event.key === "ArrowLeft")
                      next = (index + stages.length - 1) % stages.length;
                    else if (event.key === "Home") next = 0;
                    else if (event.key === "End") next = stages.length - 1;
                    else return;
                    event.preventDefault();
                    setActiveStage(next);
                    tabRefs.current[next]?.focus();
                  }}
                >
                  <span className="s-tab-number">0{index + 1}</span>
                  <item.icon size={19} />
                  <span>{item.name}</span>
                  <ChevronRight className="s-tab-chevron" size={16} />
                </button>
              ))}
            </div>
            <div
              className="s-agent-panel"
              id="s-agent-panel"
              role="tabpanel"
              aria-labelledby={`s-tab-${activeStage}`}
              tabIndex={0}
            >
              <div className="s-agent-description">
                <span className="s-eyebrow">
                  AGENT 0{activeStage + 1} / {stage.name.toUpperCase()}
                </span>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
                <div className="s-agent-state">
                  <span className="s-dot" />
                  {stage.status}
                </div>
              </div>
              <div className="s-code-window">
                <div className="s-code-title">
                  <span>
                    <FileCode2 size={14} />
                    {stage.file}
                  </span>
                  <span>ILLUSTRATIVE</span>
                </div>
                <div className="s-code-label">
                  <span className="s-small-dot" />
                  {stage.label}
                </div>
                <pre aria-label="Illustrative security investigation">
                  <code>
                    {stage.code.map((line, index) => (
                      <span
                        className={`s-code-line ${index === stage.line ? "s-code-highlight" : ""} ${activeStage === 2 ? "s-code-added" : ""}`}
                        key={`${activeStage}-${index}`}
                      >
                        <span className="s-line-number" aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {line}
                      </span>
                    ))}
                  </code>
                </pre>
                <div className="s-code-note">
                  <Terminal size={14} />
                  <span>{stage.note}</span>
                </div>
              </div>
            </div>
            <p className="s-workflow-disclaimer">
              An interactive look at our planned architecture. This example is
              illustrative; autonomous validation and fix verification are in
              development.
            </p>
          </div>
        </section>

        <section
          className="s-capabilities s-section"
          aria-labelledby="s-capabilities-title"
        >
          <div className="s-container">
            <div className="s-section-top">
              <span className="s-eyebrow">
                03 / BUILT FROM A WORKING FOUNDATION
              </span>
              <span className="s-section-aside">
                A prototype today. A bigger vision ahead.
              </span>
            </div>
            <div className="s-capabilities-grid">
              <div className="s-capabilities-copy">
                <h2 id="s-capabilities-title">
                  Real code.
                  <br />
                  Real complexity.
                  <br />
                  <span>A running start.</span>
                </h2>
                <p>
                  Sentinel began with repository-aware security analysis. We’re
                  evolving that foundation into an autonomous application
                  security platform.
                </p>
                <a className="s-text-link" href={contact}>
                  Talk to the founder <ArrowUpRight size={16} />
                </a>
                <div className="s-engine-label">
                  <Code2 size={17} />
                  <span>AI-native, from the first commit.</span>
                </div>
              </div>
              <div className="s-capability-list">
                <div className="s-list-heading">
                  <span>CURRENT PROTOTYPE</span>
                  <span className="s-small-dot" />
                </div>
                {[
                  [
                    "Repository-aware analysis",
                    "Investigates software repositories with codebase context, rather than treating every file as an island.",
                  ],
                  [
                    "AI-powered vulnerability detection",
                    "Uses Gemini to identify potential security weaknesses and produce structured findings.",
                  ],
                  [
                    "Incremental rescanning",
                    "Revisits changed code so analysis can keep moving with the repository.",
                  ],
                  [
                    "SARIF exports",
                    "Exports findings in a standard format for use in compatible security tooling.",
                  ],
                  [
                    "AI-assisted remediation",
                    "Helps turn a finding into a proposed code change for an engineer to review.",
                  ],
                ].map(([title, text], index) => (
                  <article key={title}>
                    <span className="s-capability-index">0{index + 1}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                    <Check size={15} />
                  </article>
                ))}
                <div className="s-next-up">
                  <span>NEXT UP</span>
                  <p>
                    Claude-powered multi-agent orchestration, exploitability
                    validation, and fix verification.
                  </p>
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="vision"
          className="s-vision s-section"
          aria-labelledby="s-vision-title"
        >
          <div className="s-container s-vision-inner">
            <div>
              <span className="s-eyebrow">04 / THE LONG VIEW</span>
              <Mark className="s-vision-mark" />
            </div>
            <div>
              <h2 id="s-vision-title">
                Software is being built
                <br />
                at a new speed.
                <br />
                <span>Security needs a new mind.</span>
              </h2>
              <p>
                We believe the future of application security is an engineer
                that can reason about your system, investigate its weaknesses,
                and help make it stronger.
              </p>
              <p>
                Sentinel Security Labs is an early-stage company building toward
                that future: autonomous security engineers that take on the
                investigative work, so people can focus on the decisions that
                matter.
              </p>
              <span className="s-vision-signature">
                SENTINEL SECURITY LABS <span> / </span> INDEPENDENTLY BUILDING
              </span>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="s-contact"
          aria-labelledby="s-contact-title"
        >
          <div className="s-container s-contact-inner">
            <div className="s-eyebrow">
              <span className="s-dot" /> HELP SHAPE WHAT COMES NEXT
            </div>
            <h2 id="s-contact-title">
              Build fast.
              <br />
              <span>Stay a step ahead.</span>
            </h2>
            <p>
              Building a modern codebase? We’d like to hear how your team
              approaches security. Get in touch about early access to Sentinel.
            </p>
            <a className="s-button s-button-primary" href={contact}>
              Let’s talk Sentinel <ArrowUpRight size={18} />
            </a>
            <a
              className="s-contact-email"
              href="mailto:founder@ethanjoseph.dev"
            >
              founder@ethanjoseph.dev <ArrowRight size={14} />
            </a>
            <span className="s-contact-watermark" aria-hidden="true">
              sentinel
            </span>
          </div>
        </section>
      </main>

      <footer className="s-footer s-container">
        <a
          className="s-brand"
          href="/sentinel/"
          aria-label="Sentinel Security Labs home"
        >
          <Mark />
          <span>
            sentinel<span className="s-brand-sub">SECURITY LABS</span>
          </span>
        </a>
        <p>© {new Date().getFullYear()} Sentinel Security Labs</p>
        <div>
          <a href="mailto:founder@ethanjoseph.dev">
            Contact <ArrowUpRight size={13} />
          </a>
          <a href="/">
            Ethan Joseph <ArrowUpRight size={13} />
          </a>
        </div>
      </footer>
    </div>
  );
}
