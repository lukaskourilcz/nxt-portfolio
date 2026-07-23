import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowDownToLine, Check, FileText, GitBranch, ShieldCheck } from "lucide-react";
import type { Work } from "@/lib/content-schema";
import { cn } from "@/lib/utils";
import { ProjectPreview } from "@/components/project-preview";

function BankingVisual() {
  return (
    <div aria-hidden className="relative grid h-full min-h-72 place-items-center overflow-hidden bg-elevated p-6 sm:p-10">
      <div className="absolute inset-0 bg-[linear-gradient(var(--border-subtle)_1px,transparent_1px),linear-gradient(90deg,var(--border-subtle)_1px,transparent_1px)] bg-[size:48px_48px] opacity-35" />
      <div className="relative w-full max-w-sm border border-edge-strong bg-canvas/85 p-4">
        <div className="flex items-center justify-between border-b border-edge pb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          <span>controlled migration</span>
          <ShieldCheck className="h-4 w-4 text-confidential" />
        </div>
        <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="border border-edge bg-subtle p-3">
            <p className="font-mono text-[10px] text-muted">legacy</p>
            <div className="mt-3 space-y-2"><i className="block h-px bg-edge-strong" /><i className="block h-px bg-edge-strong" /><i className="block h-px bg-edge-strong" /></div>
          </div>
          <GitBranch className="h-5 w-5 text-accent" />
          <div className="border border-accent/35 bg-accent-muted p-3">
            <p className="font-mono text-[10px] text-accent">boundary</p>
            <div className="mt-3 space-y-2"><i className="block h-px bg-accent/35" /><i className="block h-px bg-accent/35" /><i className="block h-px bg-accent/35" /></div>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
          <span className="border border-edge p-2 text-center">map</span>
          <span className="border border-edge p-2 text-center">test</span>
          <span className="border border-edge p-2 text-center">release</span>
        </div>
      </div>
    </div>
  );
}

function ScienceVisual() {
  return (
    <div aria-hidden className="relative grid h-full min-h-72 place-items-center overflow-hidden bg-elevated p-6 sm:p-10">
      <div className="absolute left-[12%] top-0 h-full w-px bg-edge" />
      <div className="relative grid w-full max-w-md grid-cols-[0.72fr_1fr] items-center gap-4">
        <div className="-rotate-2 border border-edge-strong bg-primary p-4 text-canvas shadow-[8px_8px_0_var(--border-subtle)]">
          <FileText className="h-5 w-5" />
          <div className="mt-8 space-y-2 opacity-45"><i className="block h-px bg-canvas" /><i className="block h-px bg-canvas" /><i className="block h-px bg-canvas" /><i className="block h-px bg-canvas" /></div>
          <p className="mt-7 font-mono text-[9px] uppercase tracking-[0.14em]">scientific paper</p>
        </div>
        <div className="border border-edge-strong bg-canvas/90 p-4">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
            <span>metadata</span><ArrowDownToLine className="h-4 w-4 text-accent" />
          </div>
          <dl className="mt-4 space-y-3">
            {["schema", "source", "evidence", "review"].map((label, index) => (
              <div key={label} className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-2 text-[10px]">
                <dt className="font-mono text-muted">{label}</dt>
                <dd className="h-px bg-edge-strong" />
                <Check className={cn("h-3 w-3", index === 3 ? "text-secondary" : "text-accent")} />
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

function AuthenticProductVisual({ item }: { item: Work }) {
  if (!item.preview && !item.image) return null;
  return (
    <div className="relative grid h-full min-h-72 place-items-center overflow-hidden bg-[linear-gradient(135deg,var(--surface),var(--canvas))] p-5 sm:p-9">
      <div className="absolute inset-x-0 top-9 h-px bg-accent/35" aria-hidden />
      <div className="relative aspect-[16/10] w-full overflow-hidden border border-edge-strong bg-canvas shadow-[12px_12px_0_var(--border-subtle)]">
        {item.preview ? (
          <ProjectPreview
            slug={item.id}
            alt={item.image?.alt ?? item.title}
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.012]"
          />
        ) : (
          <Image
            src={item.image!.src}
            alt={item.image!.alt}
            fill
            sizes="(max-width: 1023px) 100vw, 48vw"
            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.012]"
          />
        )}
      </div>
    </div>
  );
}

export function ProjectVisual({ item, className }: { item: Work; className?: string }) {
  // A recorded preview, when present, takes over the visual slot; otherwise the
  // hand-built abstract visuals (banking, science) or a static screenshot stand.
  let visual: ReactNode = null;
  if (item.preview || item.image) {
    visual = <AuthenticProductVisual item={item} />;
  } else if (item.id === "banking-modernization") {
    visual = <BankingVisual />;
  } else if (item.id === "ersilia-ai-tooling") {
    visual = <ScienceVisual />;
  }
  return <div className={cn("border-edge", className)}>{visual}</div>;
}
