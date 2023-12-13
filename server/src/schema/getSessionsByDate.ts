import { z } from "zod";

const getSessionsByDate = z.object({
  body: z.object({
    activityName: z.string(), 
    activityId: z.string(),
    date: z.string(),
  }),
});

export default getSessionsByDate;
