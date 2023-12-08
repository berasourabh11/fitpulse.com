
import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the activity document
export interface IActivity extends Document {
    activityName: string;
    activityId: string;
    weekdays: { day: string; sessions: { startTime: Date; endTime: Date }[] }[];
}

// Define the Mongoose schema for the activity

const activitySchema: Schema = new Schema({
    activityName: { type: String, required: true },
    activityId: { type: String, required: true, unique: true },
    weekdays: [
        {
            day: { type: String, required: true, unique: true },
            sessions: [
                {
                    startTime: { type: Date, required: true },
                    endTime: { type: Date, required: true },
                },
            ],
        },
    ],
});

// Create and export the Mongoose model for the activity
export default mongoose.model<IActivity>('Activity', activitySchema);
