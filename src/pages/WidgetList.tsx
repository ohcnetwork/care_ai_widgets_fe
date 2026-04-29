import { Toaster } from "sonner";

import { AIWidgetsSettingsPage } from "@/components/AIWidgets/SettingsPage";

export default function WidgetList() {
  return (
    <>
      <Toaster position="top-center" richColors closeButton />
      <AIWidgetsSettingsPage />
    </>
  );
}
