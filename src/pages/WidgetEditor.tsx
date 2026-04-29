import { useAtom } from "jotai";
import { useMemo, useState } from "react";

import useAuthUser from "@/hooks/useAuthUser";

import { EditorDialog } from "@/components/AIWidgets/EditorDialog";
import { newWidgetId, widgetsAtomFor } from "@/components/AIWidgets/store";
import { Widget } from "@/components/AIWidgets/types";

interface Props {
  widgetId?: string;
}

export default function WidgetEditor({ widgetId }: Props) {
  const authUser = useAuthUser();
  const widgetsAtom = useMemo(
    () => widgetsAtomFor(authUser.id ?? authUser.username),
    [authUser.id, authUser.username],
  );
  const [widgets, setWidgets] = useAtom(widgetsAtom);

  const existing = widgetId
    ? widgets.find((w) => w.id === widgetId)
    : undefined;

  const [draft] = useState<Widget>(
    existing ?? {
      id: newWidgetId(),
      name: "",
      type: "markdown",
      prompt: "",
      model: "gpt-4.1-mini",
      enabled: true,
    },
  );

  const [open, setOpen] = useState(true);

  const handleSave = (next: Widget) => {
    setWidgets((prev) => {
      const exists = prev.some((w) => w.id === next.id);
      if (exists) return prev.map((w) => (w.id === next.id ? next : w));
      return [...prev, next];
    });
    // Navigate back
    window.history.back();
  };

  return (
    <EditorDialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) window.history.back();
      }}
      widget={draft}
      onSave={handleSave}
    />
  );
}
