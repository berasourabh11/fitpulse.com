
import mongoose, { Schema, Document } from 'mongoose';
import { IActivity } from '../utils/types';

// Define the Mongoose schema for the activity

const activitySchema: Schema = new Schema({
    activityName: { type: String, required: true },
    activityId: { type: String, required: true, unique: true },
    sessions: {
        sunday: [
            {
                startTime: { type: Date, required: true },
                endTime: { type: Date, required: true },
                slots: { type: Number, required: true },
            },
        ],
        monday: [
            {
                startTime: { type: Date, required: true },
                endTime: { type: Date, required: true },
                slots: { type: Number, required: true },
            },
        ],
        tuesday: [
            {
                startTime: { type: Date, required: true },
                endTime: { type: Date, required: true },
                slots: { type: Number, required: true },
            },
        ],
        wednesday: [
            {
                startTime: { type: Date, required: true },
                endTime: { type: Date, required: true },
                slots: { type: Number, required: true },
            },
        ],
        thursday: [
            {
                startTime: { type: Date, required: true },
                endTime: { type: Date, required: true },
                slots: { type: Number, required: true },
            },
        ],
        friday: [
            {
                startTime: { type: Date, required: true },
                endTime: { type: Date, required: true },
                slots: { type: Number, required: true },
            },
        ],
        saturday: [
            {
                startTime: { type: Date, required: true },
                endTime: { type: Date, required: true },
                slots: { type: Number, required: true },
            },
        ],
    }
});

// Create and export the Mongoose model for the activity
export default mongoose.model<IActivity>('Activity', activitySchema);
