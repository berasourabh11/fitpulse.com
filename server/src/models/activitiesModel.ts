
import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the activity document
interface IActivity extends Document {
    activityName: string;
    activityId: string;
    weekdays: { day: string; sessions: { time: string; duration: number }[] }[];
}

// Define the Mongoose schema for the activity
const activitySchema: Schema = new Schema({
    activityName: { type: String, required: true },
    activityId: { type: String, required: true, unique: true },
    weekdays: [
        {
            day: { type: String, required: true,unique:true },
            sessions: [
                {
                    time: { type: String, required: true },
                    duration: { type: Number, required: true },
                },
            ],
        },
    ],
});

// Create and export the Mongoose model for the activity
export default mongoose.model<IActivity>('Activity', activitySchema);
