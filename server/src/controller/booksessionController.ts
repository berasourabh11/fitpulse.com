import { Request, Response } from 'express';
import { convertTimeTo24HrFormat } from '../utils/convertTimeToSting';
import activitiesModel from '../models/activitiesModel';
import { IActivity } from '../utils/types';
import { IBookedSession, bookedSessionModel } from '../models/bookedSessions';
import { IUserData } from '../models/userDataModel';

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
        // Check if the activity has not passed the current time
        if(isToday(date) && checkifSessionPassed(date,startTime)){
            res.status(400).json({ message: 'Session has already passed' });
            return;
        }




        let bookedSession:IBookedSession | null = await bookedSessionModel.findOne({activityName,activityDay:dayInWords.toLowerCase(),activityTime:startTime,activityDate:date});
        if(!bookedSession){
            bookedSession= new bookedSessionModel({activityName,activityId,activityDate:date,activityTime:startTime,activityDay:dayInWords.toLowerCase()});
        }

        // Check if the session is already booked
        if(bookedSession.sessionUsers.includes((req as any).user.data._id)){
            res.status(400).json({ message: 'Session already booked' });
            return;
        }

        if(bookedSession.sessionUsers.length>=session.slots){
            res.status(400).json({ message: 'No slots available' });
            return;
        }


        bookedSession.sessionUsers.push((req as any).user.data._id);
        await bookedSession.save();
        res.status(200).json({ message: 'Session booked successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

function checkifSessionPassed(date: string, startTime: string) {
    const currentDate = new Date();
    const sessionDate = new Date(date);
    const sessionTime = new Date(startTime);
    if (sessionDate < currentDate) {
        return true;
    }
    if (sessionDate === currentDate) {
        if (sessionTime < currentDate) {
            return true;
        }
    }
    return false;
}
function isToday(date: string) {
    const currentDate = new Date();
    const sessionDate = new Date(date);
    return (
        sessionDate.getDate() === currentDate.getDate() &&
        sessionDate.getMonth() === currentDate.getMonth() &&
        sessionDate.getFullYear() === currentDate.getFullYear()
    );
}
