import { inngest } from "@/services/inngest/client";
import { serve } from "inngest/next";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [],
});
