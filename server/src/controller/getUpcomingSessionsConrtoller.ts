import { Request, Response } from 'express';
import UserDataModel from '../models/userDataModel';
import { IActivity } from '../utils/types';
import { IBookedSession } from '../models/bookedSessions';

interface IUserDetails {
    username: string;
    password: string;
    role: 'user' | 'admin'; 
    firstname: string;
    lastname: string;
    email: string;
    bookedActivities: IBookedSession[]; 
}


export const getUpcomingSessionController = async (req: Request, res: Response) => {
    const username = req.user?.data.username;
    console.log("USERID", username);
    if (username === undefined) {
        res.status(400).send("User not found");
        return;
    }

    // Use type assertion here
    const userDetails = await UserDataModel.findOne({ username: username }).populate("bookedActivities") as IUserDetails;
    console.log(userDetails);

    if (!userDetails || userDetails.bookedActivities.length === 0) {
        res.status(404).send("No upcoming sessions found for the user");
        return;
    }

    const upcomingSession: IBookedSession[] = userDetails.bookedActivities.filter((activity: IBookedSession) => {
        const currentDate = new Date();
        // Concatenating the date and time into a format that can be parsed by the Date constructor
        const activityDateTime = new Date(`${activity.activityDate}T${activity.activityTime}`);
        return activityDateTime > currentDate;
    });
    
    return res.status(200).json({upcomingSession});
};