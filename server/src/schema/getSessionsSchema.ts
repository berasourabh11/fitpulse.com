import { z } from "zod";

const getSessionsSchema = z.object({
  query: z.object({
    sessionName: z.string({ required_error: "Session name is required"})
  }),
});

export default getSessionsSchema;
