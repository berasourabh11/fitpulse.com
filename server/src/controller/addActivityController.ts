import { Request, Response } from 'express';
import ActivityModel from '../models/activitiesModel';
import timeConverter from '../utils/timeConverter';
import { sessonType } from '../utils/types';
import { convertTimeTo24HrFormat } from '../utils/convertTimeToSting';
import Cloudinary from '../services/cloudinary';



const addActivityController = async (req: Request, res: Response) => {
    try {
        const activityDetails = req.body.activityDetails !== undefined ? JSON.parse(req.body.activityDetails) : null;
        if(!activityDetails){
            return res.status(400).json({message: "Invalid request body structure"});
        }
        const { activityName, activityId, sessions } = activityDetails;

        if (typeof activityName !== 'string' || typeof activityId !== 'string') {
            throw new Error('Invalid request body structure');
        }

        const existingActivity = await ActivityModel.findOne({ activityId: activityId });
        if (existingActivity) {
            res.status(409).json({message: "Activity already exists"});
            return;
        }

        if (!req.file) {
            throw new Error('No image file provided');
        }
        const result = await Cloudinary.uploader.upload(req.file.path);
        const imageUrl = result.url;

        const convertedSessions = {
            activityName: activityName,
            activityId: activityId,
            imageUrl: imageUrl,
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
