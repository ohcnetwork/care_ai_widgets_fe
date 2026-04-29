import { lazy } from "react";

const WidgetList = lazy(() => import("./pages/WidgetList"));
const WidgetEditor = lazy(() => import("./pages/WidgetEditor"));

const routes = {
  "/facility/:facilityId/users/:user/ai-widgets": () => <WidgetList />,
  "/facility/:facilityId/users/:user/ai-widgets/new": () => <WidgetEditor />,
  "/facility/:facilityId/users/:user/ai-widgets/:id": ({
    id,
  }: {
    id: string;
  }) => <WidgetEditor widgetId={id} />,
};

export default routes;
