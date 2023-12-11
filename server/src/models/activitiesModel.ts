
import mongoose, { Schema, Document } from 'mongoose';
import { IActivity } from '../utils/types';

// Define the Mongoose schema for the activity

const activitySchema: Schema = new Schema({
    activityName: { type: String, required: true },
    activityId: { type: String, required: true, unique: true },
    sessions: {
        sunday: [
            {
                startTime: { type: String, required: true },
                endTime: { type: String, required: true },
                slots: { type: Number, required: true },
            },
        ],
        monday: [
            {
                startTime: { type: String, required: true },
                endTime: { type: String, required: true },
                slots: { type: Number, required: true },
            },
        ],
        tuesday: [
            {
                startTime: { type: String, required: true },
                endTime: { type: String, required: true },
                slots: { type: Number, required: true },
            },
        ],
        wednesday: [
            {
                startTime: { type: String, required: true },
                endTime: { type: String, required: true },
                slots: { type: Number, required: true },
            },
        ],
        thursday: [
            {
                startTime: { type: String, required: true },
                endTime: { type: String, required: true },
                slots: { type: Number, required: true },
            },
        ],
        friday: [
            {
                startTime: { type: String, required: true },
                endTime: { type: String, required: true },
                slots: { type: Number, required: true },
            },
        ],
        saturday: [
            {
                startTime: { type: String, required: true },
                endTime: { type: String, required: true },
                slots: { type: Number, required: true },
            },
        ],
    }
});

// Create and export the Mongoose model for the activity
export default mongoose.model<IActivity>('Activity', activitySchema);
