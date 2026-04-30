import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

import {
  AlertItem,
  AlertLevel,
  AlertsOutput,
} from "@/components/AIWidgets/types";

const LEVEL_CONFIG: Record<
  AlertLevel,
  { label: string; labelBg: string; border: string; bg: string; text: string }
> = {
  critical: {
    label: "HIGH",
    labelBg: "bg-red-700 text-white",
    border: "border-red-200",
    bg: "bg-red-50",
    text: "text-red-700",
  },
  warning: {
    label: "MEDIUM",
    labelBg: "bg-yellow-500 text-white",
    border: "border-yellow-300",
    bg: "bg-yellow-50",
    text: "text-yellow-700",
  },
  info: {
    label: "LOW",
    labelBg: "bg-gray-500 text-white",
    border: "border-gray-200",
    bg: "bg-gray-50",
    text: "text-gray-600",
  },
};

export function AlertsWidget({ output }: { output: AlertsOutput }) {
  return (
    <div className="flex flex-col gap-2 text-sm text-gray-800">
      {output.alerts.map((alert, idx) => (
        <AlertRow key={idx} alert={alert} />
      ))}
      {output.source_note && (
        <p className="text-[10px] italic text-gray-400">{output.source_note}</p>
      )}
    </div>
  );
}

function AlertRow({ alert }: { alert: AlertItem }) {
  const [expanded, setExpanded] = useState(false);
  const config = LEVEL_CONFIG[alert.level] ?? LEVEL_CONFIG.info;

  return (
    <div
      className={`overflow-hidden rounded-lg border ${config.border} ${config.bg}`}
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className={`flex w-full items-center gap-0 text-left ${config.bg}`}
      >
        <div
          className={`flex h-auto w-20 shrink-0 items-center justify-center self-stretch px-2 py-2 text-[10px] font-bold uppercase tracking-wide ${config.labelBg}`}
        >
          {config.label}
        </div>
        <p
          className={`min-w-0 flex-1 truncate px-3 py-2 text-xs font-medium text-gray-800`}
        >
          {alert.title}
        </p>
        {expanded ? (
          <ChevronDown className="mr-3 h-3.5 w-3.5 shrink-0 text-gray-400" />
        ) : (
          <ChevronRight className="mr-3 h-3.5 w-3.5 shrink-0 text-gray-400" />
        )}
      </button>
      {expanded && (
        <div
          className={`border-t ${config.border} ${config.bg} px-3 py-2 text-[11px] leading-relaxed text-gray-700`}
        >
          {alert.message}
          {alert.recommendation && (
            <p className={`mt-1 text-[11px] font-medium ${config.text}`}>
              ↳ {alert.recommendation}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
