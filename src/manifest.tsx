import { Sparkles } from "lucide-react";
import { lazy } from "react";

import routes from "./routes";

const manifest = {
  plugin: "care_ai_widgets_fe",
  routes,
  extends: [],
  components: {
    EncounterOverviewTop: lazy(() => import("./components/EncounterWidgets")),
  },
  userNavItems: [
    {
      url: "ai-widgets",
      name: "AI Widgets",
      icon: <Sparkles />,
    },
  ],
  devices: [],
};

export default manifest;
