import { Request, Response } from 'express';
import activitiesModel from '../models/activitiesModel';

const getAllActivityController = async (req: Request, res: Response) => {
    try {
        const activities = await activitiesModel.find({});
        const activityNames = activities.map((activity: any) => {
            return { activityName: activity.activityName, activityId: activity.activityId , imageurl: activity.imageurl};
        });
        return res.status(200).json({ activities: activityNames });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export default getAllActivityController;
