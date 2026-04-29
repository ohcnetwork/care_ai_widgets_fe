import { AlertTriangle, Info, ShieldAlert } from "lucide-react";

import { AlertOutput, AlertSeverity } from "@/components/AIWidgets/types";

const SEVERITY_CONFIG: Record<
  AlertSeverity,
  { icon: typeof Info; container: string; iconClass: string; title: string }
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

      {output.alerts.map((alert, i) => {
        const config = SEVERITY_CONFIG[alert.severity] ?? SEVERITY_CONFIG.info;
        const Icon = config.icon;

        return (
          <div
            key={i}
            className={`flex items-start gap-2.5 rounded-md border px-3 py-2.5 ${config.container}`}
          >
            <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${config.iconClass}`} />
            <div className="min-w-0 flex-1">
              <p className={`text-xs font-medium ${config.title}`}>
                {alert.title}
              </p>
              <p className="mt-0.5 text-[12px] leading-relaxed">
                {alert.message}
              </p>
            </div>
            <span
              className={`shrink-0 rounded border px-1.5 py-px text-[10px] font-medium uppercase tracking-wide ${config.container}`}
            >
              {alert.severity}
            </span>
          </div>
        );
      })}

      {output.source_note && (
        <p className="text-[11px] italic text-gray-400">{output.source_note}</p>
      )}
    </div>
  );
}
