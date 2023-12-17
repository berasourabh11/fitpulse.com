import { z } from 'zod';
import getActivityDetails from '../services/getActivityDetails';

const TimeSchema = z.object({
    hours: z.number(),
    minutes: z.number(),
    seconds: z.number(),
    am_pm: z.enum(["AM", "PM"]),
});

const SessionSchema = z.object({
    startTime: TimeSchema,
    endTime: TimeSchema,
    slots: z.number(),
});

const DaySessionsSchema = z.array(SessionSchema);

const DaySchema = z.object({
    monday: DaySessionsSchema,
    tuesday: DaySessionsSchema,
    wednesday: DaySessionsSchema,
    thursday: DaySessionsSchema,
    friday: DaySessionsSchema,
    saturday: DaySessionsSchema,
    sunday: DaySessionsSchema,
});

export const addActivitySchema = z.object({
    body: z.object({
            activityName: z.string(),
            activityId: z.number(),
            sessions: DaySchema,
        })
});


