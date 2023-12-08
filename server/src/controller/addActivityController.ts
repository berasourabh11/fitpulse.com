import { Request, Response } from 'express';
import { IActivity } from '../models/activitiesModel';
import ActivityModel from '../models/activitiesModel';
import timeConverter from '../utils/timeConverter';

const addActivityController = async (req: Request, res: Response) => {
    try {
        const { activityName, activityId, weekdays } = req.body.activityDetails;

        // Validate types of activityName, activityId, and weekdays
        if (typeof activityName !== 'string' || typeof activityId !== 'string' || !Array.isArray(weekdays)) {
            throw new Error('Invalid request body structure');
        }

        const convertedDays = weekdays.map((day: any) => {
            return {
                day: day.day,
                sessions: day.sessions.map((session: any) => {
                    return {
                        startTime: timeConverter(session.startTime),
                        endTime: timeConverter(session.endTime),
                    };
                }),
            };
        });

        const activityDetails= {
            activityName: activityName,
            activityId: activityId,
            weekdays: convertedDays,
        };

        const newActivity = new ActivityModel(activityDetails);
        await newActivity.save();
        res.status(200).json({ message: 'Activity created successfully' });
    } catch (error) {
        // Handle any errors that occur during the process
        console.log(error);
        res.status(500).json({ error: `Internal Server Error` });
    }
};

export default addActivityController;