import { z } from "zod";

const bookSessionSchema = z.object({
    body: z.object({
        activityName: z.string(),
        activityId: z.number(),
        sessionTime: z.object({
            date: z.string(),
            hours: z.number(),
            minutes: z.number(),
            seconds: z.number(),
            am_pm: z.string()
        })
    })
});

export default bookSessionSchema;
