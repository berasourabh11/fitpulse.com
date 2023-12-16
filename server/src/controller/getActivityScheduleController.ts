import { Request, Response } from 'express';
import activityModel from '../models/activitiesModel';

const getActivityScheduleController = async (req: Request, res: Response) => {
    try {
        const activityId = req.body.activityId;
        // Retrieve the activity model based on the activity name
        const activity = await activityModel.findOne({ activityId });
        console.log(activity);
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }

        // Extract the weekdays object from the activity model
        const { sessions } = activity;

        return res.json({ weeklySchedule:sessions });
    } catch (error) {
        console.error('Error retrieving activity schedule:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export default getActivityScheduleController;
