import { Request, Response } from 'express';
import { IActivity } from '../models/activitiesModel';
import ActivityModel from '../models/activitiesModel';
const addActivityController = async (req: Request, res: Response) => {
    try {
        const activityDetails: IActivity = req.body;
        const newActivity = new ActivityModel(activityDetails);
        await newActivity.save();
        res.status(200).json({ message: 'Activity created successfully' });
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default addActivityController;