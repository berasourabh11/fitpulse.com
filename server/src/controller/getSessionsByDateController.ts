import { Request, Response } from 'express';
import activitiesModel from '../models/activitiesModel';
import { bookedSessionModel, IBookedSession } from '../models/bookedSessions';


export const getSessionsByDateController = async (req: Request, res: Response) => {
  try {
    const { activityName, activityId, date } = req.body;

    const weekday = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
    const activity = await activitiesModel.findOne({ activityName, activityId });
    const bookedSessions = await bookedSessionModel.find({ activityName, activityId, activityDate: date }).populate('sessionUsers');
    const bookedSessionsByTime: any = {};

    if (activity === null) {
      return res.status(400).json({ sessions: [] });
    }
    if (bookedSessions !== null) {
      bookedSessions.forEach((session: IBookedSession) => {
        if (!bookedSessionsByTime[session.activityTime]) {
          bookedSessionsByTime[session.activityTime] = [];
        }
        bookedSessionsByTime[session.activityTime] = session.sessionUsers.map((user: any) => {
          return { userName: user.username, firstname: user.firstname, lastname: user.lastname };
        });
      });
    }

    const sessions = activity.sessions[weekday.toLowerCase()];
    // add session users to sessions
    const sessionDetails = sessions.map((session: any) => {
      return {
        startTime: session.startTime,
        endTime: session.endTime,
        slots: session.slots - (bookedSessionsByTime[session.startTime] ? bookedSessionsByTime[session.startTime].length : 0),
        // users: bookedSessionsByTime[session.startTime],
      }
    }
    );
    res.status(200).json({ sessions: sessionDetails });

  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Error occurred' });
  }
};
