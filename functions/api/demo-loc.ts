import { handleDemoLoc, type DemoEnv } from "../../server/demo-call";

export function onRequest(context: { request: Request; env: DemoEnv }): Promise<Response> {
  return handleDemoLoc(context.request, context.env);
}
