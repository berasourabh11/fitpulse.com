import { Request, Response } from 'express';
import { convertTimeTo24HrFormat } from '../utils/convertTimeToSting';
import activitiesModel from '../models/activitiesModel';
import { IActivity } from '../utils/types';
import { IBookedSession, bookedSessionModel } from '../models/bookedSessions';

interface SessionTime {
    date: string;
    hours: number;
    minutes: number;
    seconds: number;
    am_pm: string;
}

interface BookSessionRequestBody {
    activityName: string;
    activityId: number;
    sessionTime: SessionTime;
}



export const bookSessionController = async (req: Request, res: Response) => {
    try {
        const { activityName, activityId, sessionTime }: BookSessionRequestBody = req.body;
        const { date, hours, minutes, seconds, am_pm } = sessionTime;
        const startTime = convertTimeTo24HrFormat({ hours, minutes, seconds, am_pm });
        // find out day of the week using date which is a string in format DD-MM-YYYY
        const dayInWords = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(date));
        const activity:IActivity | null = await activitiesModel.findOne({activityName,activityId});
        if (!activity) {
            res.status(400).json({ message: 'Activity not found' });
            return;
        }
        const sessions = activity.sessions[dayInWords.toLowerCase()];
        const session = sessions.find((session) => session.startTime === startTime);
        if (!session) {
            res.status(400).json({ message: 'Session not found' });
            return;
        }
        const bookedSession = await bookedSessionModel.findOne({activityName,startTime});
        if(bookedSession){
            if(bookedSession.sessionUsers.length>=session.slots){
                res.status(400).json({ message: 'Session is full' });
                return;
            }
        }

        res.status(200).json({ message: 'Session booked successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};