import { HttpMethod } from "@/lib/request";

import { AskRequest, AskResponse } from "@/components/AIWidgets/types";

const aiWidgetsApi = {
  ask: {
    path: "/api/care_ai/encounter/{encounterId}/ask/",
    method: HttpMethod.POST,
    TResponse: {} as AskResponse,
    TRequest: {} as AskRequest,
  },
} as const;

export default aiWidgetsApi;
