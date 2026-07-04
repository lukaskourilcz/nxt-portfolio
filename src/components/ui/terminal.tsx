"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useAnimationControls,
  useInView,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

type TokenType =
  | "command"
  | "flag"
  | "string"
  | "number"
  | "operator"
  | "path"
  | "variable"
  | "comment"
  | "default";

type Token = { type: TokenType; value: string };

function tokenizeBash(text: string): Token[] {
  const tokens: Token[] = [];
  const words = text.split(/(\s+)/);

  let isFirstWord = true;

  for (const word of words) {
    if (/^\s+$/.test(word)) {
      tokens.push({ type: "default", value: word });
      continue;
    }

    if (word.startsWith("#")) {
      tokens.push({ type: "comment", value: word });
      continue;
    }

    if (word.startsWith("$")) {
      tokens.push({ type: "variable", value: word });
      isFirstWord = false;
      continue;
    }

    if (word.startsWith("--") || word.startsWith("-")) {
      tokens.push({ type: "flag", value: word });
      isFirstWord = false;
      continue;
    }

    if (/^["'].*["']$/.test(word)) {
      tokens.push({ type: "string", value: word });
      isFirstWord = false;
      continue;
    }

    if (/^\d+$/.test(word)) {
      tokens.push({ type: "number", value: word });
      isFirstWord = false;
      continue;
    }

    if (/^[|>&<]+$/.test(word)) {
      tokens.push({ type: "operator", value: word });
      isFirstWord = true;
      continue;
    }

    if (word.includes("/") || word.startsWith(".") || word.startsWith("~")) {
      tokens.push({ type: "path", value: word });
      isFirstWord = false;
      continue;
    }

    if (isFirstWord) {
      tokens.push({ type: "command", value: word });
      isFirstWord = false;
      continue;
    }

    tokens.push({ type: "default", value: word });
  }

  return tokens;
}

const tokenColors: Record<TokenType, string> = {
  command: "text-emerald-400",
  flag: "text-sky-400",
  string: "text-amber-300",
  number: "text-purple-400",
  operator: "text-red-400",
  path: "text-cyan-300",
  variable: "text-pink-400",
  comment: "text-zinc-500",
  default: "text-zinc-300",
};

function SyntaxHighlightedText({ text }: { text: string }) {
  return (
    <>
      {tokenizeBash(text).map((token, i) => (
        <span key={i} className={tokenColors[token.type]}>
          {token.value}
        </span>
      ))}
    </>
  );
}

// macOS-style traffic light. The glyph fades in on hover of the whole cluster;
// clicking any light shakes the window (the buttons are decorative).
function TrafficLight({
  color,
  label,
  glyph,
  onActivate,
}: {
  color: string;
  label: string;
  glyph: React.ReactNode;
  onActivate: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onActivate}
      className={cn(
        "flex h-3.5 w-3.5 items-center justify-center rounded-full text-black/65",
        color
      )}
    >
      <span className="opacity-0 transition-opacity duration-150 group-hover:opacity-100">
        {glyph}
      </span>
    </button>
  );
}

const glyphClass = "block h-2.5 w-2.5";

const CloseGlyph = (
  <svg viewBox="0 0 10 10" className={glyphClass} aria-hidden>
    <path
      d="M2.4 2.4 7.6 7.6 M7.6 2.4 2.4 7.6"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

const MinimizeGlyph = (
  <svg viewBox="0 0 10 10" className={glyphClass} aria-hidden>
    <path
      d="M2.2 5 7.8 5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

const FullscreenGlyph = (
  <svg viewBox="0 0 10 10" className={glyphClass} fill="currentColor" aria-hidden>
    <path d="M2 2 6 2 2 6 Z" />
    <path d="M8 8 4 8 8 4 Z" />
  </svg>
);

type Phase =
  | "idle"
  | "typing"
  | "executing"
  | "outputting"
  | "pausing"
  | "done";

type Line = { type: "command" | "output"; content: string };

type TerminalProps = {
  commands?: string[];
  outputs?: Record<number, string[]>;
  username?: string;
  className?: string;
  typingSpeed?: number;
  delayBetweenCommands?: number;
  initialDelay?: number;
};

// Auto-typing terminal: types each command, prints its outputs, then moves on.
// Starts once it scrolls into view.
export function Terminal({
  commands = [],
  outputs = {},
  username = "user",
  className,
  typingSpeed = 50,
  delayBetweenCommands = 800,
  initialDelay = 500,
}: TerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.1 });
  const reduce = useReducedMotion();
  const shakeControls = useAnimationControls();

  const [lines, setLines] = useState<Line[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [commandIdx, setCommandIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [outputIdx, setOutputIdx] = useState(-1);
  const [phase, setPhase] = useState<Phase>("idle");
  const [cursorVisible, setCursorVisible] = useState(true);

  const currentCommand = commands[commandIdx] || "";
  const currentOutputs = useMemo(
    () => outputs[commandIdx] || [],
    [outputs, commandIdx]
  );
  const isLastCommand = commandIdx === commands.length - 1;

  // The lights don't do anything — wobble the window to make that clear.
  const shake = () => {
    if (reduce) return;
    shakeControls.start({
      x: [0, -6, 6, -5, 5, -3, 3, 0],
      transition: { duration: 0.45, ease: "easeInOut" },
    });
  };

  useEffect(() => {
    if (!inView || phase !== "idle") return;
    const t = setTimeout(() => setPhase("typing"), initialDelay);
    return () => clearTimeout(t);
  }, [inView, phase, initialDelay]);

  useEffect(() => {
    if (phase !== "typing") return;

    if (charIdx < currentCommand.length) {
      const t = setTimeout(() => {
        setCurrentText(currentCommand.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, typingSpeed + Math.random() * 30);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setPhase("executing"), 80);
    return () => clearTimeout(t);
  }, [phase, charIdx, currentCommand, typingSpeed]);

  useEffect(() => {
    if (phase !== "executing") return;

    setLines((prev) => [...prev, { type: "command", content: currentCommand }]);
    setCurrentText("");

    if (currentOutputs.length > 0) {
      setOutputIdx(0);
      setPhase("outputting");
    } else if (isLastCommand) {
      setPhase("done");
    } else {
      setPhase("pausing");
    }
  }, [phase, currentCommand, currentOutputs.length, isLastCommand]);

  useEffect(() => {
    if (phase !== "outputting") return;

    if (outputIdx >= 0 && outputIdx < currentOutputs.length) {
      const t = setTimeout(() => {
        setLines((prev) => [
          ...prev,
          { type: "output", content: currentOutputs[outputIdx] },
        ]);
        setOutputIdx((i) => i + 1);
      }, 150);
      return () => clearTimeout(t);
    }

    const t = setTimeout(
      () => setPhase(isLastCommand ? "done" : "pausing"),
      300
    );
    return () => clearTimeout(t);
  }, [phase, outputIdx, currentOutputs, isLastCommand]);

  useEffect(() => {
    if (phase !== "pausing") return;
    const t = setTimeout(() => {
      setCharIdx(0);
      setOutputIdx(-1);
      setCommandIdx((c) => c + 1);
      setPhase("typing");
    }, delayBetweenCommands);
    return () => clearTimeout(t);
  }, [phase, delayBetweenCommands]);

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [lines, phase]);

  const prompt = (
    <span className="text-zinc-500">
      <span className="text-sky-500">{username}</span>
      <span className="text-emerald-600">:</span>
      <span className="text-sky-400">~</span>
      <span className="text-zinc-500">$</span>{" "}
    </span>
  );

  return (
    <div
      ref={containerRef}
      className={cn("mx-auto w-full max-w-xl px-4 font-mono text-xs", className)}
    >
      <motion.div
        animate={shakeControls}
        className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/90 shadow-2xl backdrop-blur-sm"
      >
        <div className="flex items-center gap-2 bg-zinc-800/90 px-4 py-3">
          <div className="group flex items-center gap-1.5">
            <TrafficLight
              color="bg-red-500"
              label="Close"
              glyph={CloseGlyph}
              onActivate={shake}
            />
            <TrafficLight
              color="bg-yellow-500"
              label="Minimize"
              glyph={MinimizeGlyph}
              onActivate={shake}
            />
            <TrafficLight
              color="bg-green-500"
              label="Fullscreen"
              glyph={FullscreenGlyph}
              onActivate={shake}
            />
          </div>
          <div className="flex-1 text-center">
            <span className="truncate text-xs text-zinc-400">
              {username} — bash
            </span>
          </div>
          <div className="w-[52px]" />
        </div>

        <div
          ref={contentRef}
          className="no-visible-scrollbar h-56 overflow-y-auto p-4 font-mono sm:h-72 md:h-80"
        >
          {lines.map((line, i) => (
            <div key={i} className="leading-relaxed whitespace-pre-wrap">
              {line.type === "command" ? (
                <span>
                  {prompt}
                  <SyntaxHighlightedText text={line.content} />
                </span>
              ) : (
                <span className="text-zinc-400">{line.content}</span>
              )}
            </div>
          ))}

          {phase === "typing" && (
            <div className="leading-relaxed whitespace-pre-wrap">
              {prompt}
              <SyntaxHighlightedText text={currentText} />
              <span className="ml-0.5 inline-block h-4 w-2 bg-zinc-300 align-middle" />
            </div>
          )}

          {(phase === "done" ||
            phase === "pausing" ||
            phase === "outputting") && (
            <div className="leading-relaxed whitespace-pre-wrap">
              {prompt}
              <span
                className={cn(
                  "inline-block h-4 w-2 bg-zinc-300 align-middle transition-opacity duration-100",
                  !cursorVisible && "opacity-0"
                )}
              />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
