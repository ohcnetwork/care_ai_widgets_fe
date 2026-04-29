import {
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Info,
  ShieldAlert,
} from "lucide-react";
import { useState } from "react";

import {
  AlertItem,
  AlertOutput,
  AlertSeverity,
} from "@/components/AIWidgets/types";

const SEVERITY_CONFIG: Record<
  AlertSeverity,
  {
    icon: typeof Info;
    container: string;
    iconClass: string;
    title: string;
  }
> = {
  info: {
    icon: Info,
    container: "border-blue-200 bg-blue-50 text-blue-900",
    iconClass: "text-blue-500",
    title: "text-blue-800",
  },
  warning: {
    icon: AlertTriangle,
    container: "border-amber-200 bg-amber-50 text-amber-900",
    iconClass: "text-amber-500",
    title: "text-amber-800",
  },
  critical: {
    icon: ShieldAlert,
    container: "border-rose-200 bg-rose-50 text-rose-900",
    iconClass: "text-rose-500",
    title: "text-rose-800",
  },
};

export function AlertWidget({ output }: { output: AlertOutput }) {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-600">
        {output.title}
      </h4>

      {output.alerts.map((alert, i) => (
        <AlertRow key={i} alert={alert} />
      ))}

      {output.source_note && (
        <p className="text-[11px] italic text-gray-400">{output.source_note}</p>
      )}
    </div>
  );
}

function AlertRow({ alert }: { alert: AlertItem }) {
  const [expanded, setExpanded] = useState(false);
  const config = SEVERITY_CONFIG[alert.severity] ?? SEVERITY_CONFIG.info;
  const Icon = config.icon;

  return (
    <div className={`rounded-md border ${config.container}`}>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center gap-2.5 px-3 py-2 text-left"
      >
        <Icon className={`h-4 w-4 shrink-0 ${config.iconClass}`} />
        <p className={`min-w-0 flex-1 text-xs font-medium ${config.title}`}>
          {alert.title}
        </p>
        {expanded ? (
          <ChevronDown className="h-3 w-3 shrink-0 opacity-50" />
        ) : (
          <ChevronRight className="h-3 w-3 shrink-0 opacity-50" />
        )}
        <span
          className={`shrink-0 rounded border px-1.5 py-px text-[10px] font-medium uppercase tracking-wide ${config.container}`}
        >
          {alert.severity}
        </span>
      </button>
      {expanded && alert.why && (
        <div className="border-t border-current/10 px-3 py-1.5 text-[11px] leading-relaxed opacity-80">
          {alert.why}
        </div>
      )}
    </div>
  );
}
