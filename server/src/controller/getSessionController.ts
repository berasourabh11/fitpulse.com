import { Request, Response } from 'express';
import getActivityDetails from "../services/getActivityDetails"

export const getSessionController = async (req: Request, res: Response) => {
    const { activityName } = req.query;

    // Retrieve activity details based on activityName
    try {
        const activityDetails = await getActivityDetails(activityName as string);
        if (activityDetails === null) {
            res.sendStatus(404);
            return;
        }
        // Send activity details as response
        res.json(activityDetails);
    } catch (error) {
        console.error('Error retrieving activity details:', error);
        res.sendStatus(500).send(error);
    }
};

