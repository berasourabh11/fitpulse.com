import { Request, Response } from 'express';
import ActivityModel from '../models/activitiesModel';
import timeConverter from '../utils/timeConverter';
import { sessonType } from '../utils/types';
import { convertTimeTo24HrFormat } from '../utils/convertTimeToSting';


const addActivityController = async (req: Request, res: Response) => {
    try {
        const { activityName, activityId, sessions } = req.body.activityDetails;

        if (typeof activityName !== 'string' || typeof activityId !== 'string') {
            throw new Error('Invalid request body structure');
        }
        const convertedSessions = {
            activityName: activityName,
            activityId: activityId,
            sessions: {
                sunday: sessions.sunday.map((session: sessonType) => ({
                    startTime: convertTimeTo24HrFormat(session.startTime),
                    endTime: convertTimeTo24HrFormat(session.endTime),
                    slots: session.slots
                })),
                monday: sessions.monday.map((session: sessonType) => ({
                    startTime: convertTimeTo24HrFormat(session.startTime),
                    endTime: convertTimeTo24HrFormat(session.endTime),
                    slots: session.slots
                })),
                tuesday: sessions.tuesday.map((session: sessonType) => ({
                    startTime: convertTimeTo24HrFormat(session.startTime),
                    endTime: convertTimeTo24HrFormat(session.endTime),
                    slots: session.slots
                })),
                wednesday: sessions.wednesday.map((session: sessonType) => ({
                    startTime: convertTimeTo24HrFormat(session.startTime),
                    endTime: convertTimeTo24HrFormat(session.endTime),
                    slots: session.slots
                })),
                thursday: sessions.thursday.map((session: sessonType) => ({
                    startTime: convertTimeTo24HrFormat(session.startTime),
                    endTime: convertTimeTo24HrFormat(session.endTime),
                    slots: session.slots
                })),
                friday: sessions.friday.map((session: sessonType) => ({
                    startTime: convertTimeTo24HrFormat(session.startTime),
                    endTime: convertTimeTo24HrFormat(session.endTime),
                    slots: session.slots
                })),
                saturday: sessions.saturday.map((session: sessonType) => ({
                    startTime: convertTimeTo24HrFormat(session.startTime),
                    endTime: convertTimeTo24HrFormat(session.endTime),
                    slots: session.slots
                }))
            }
        }

        // Check if the activity already exists
        const activity = await ActivityModel.findOne({ activityId: activityId });
        if (activity) {
            res.status(409).json({message:"Activity already exists"});
            return;
        }

        // Create a new activity
        const newActivity = new ActivityModel(convertedSessions);
        await newActivity.save();

        res.status(200).json({ message: `Activity ${activityName} added successfully` });


    } catch (error) {
        // Handle any errors that occur during the process
        console.log(error);
        res.status(500).json({ error: `Internal Server Error` });
    }
};

export default addActivityController;
