import { handleDemoCall, type DemoEnv } from "../../server/demo-call";

export function onRequest(context: { request: Request; env: DemoEnv }): Promise<Response> {
  return handleDemoCall(context.request, context.env);
}
