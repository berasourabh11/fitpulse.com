import mongoose, { Schema, Document } from 'mongoose';

interface IBookedSession extends Document {
    activityName: string;
    activityId: string;
    activityDate: Date;
    activityTime: string;
    activityDay: string;
    sessionUsers: mongoose.Types.ObjectId[]; // Use mongoose.Types.ObjectId as the type
}

const bookedSessionSchema: Schema = new Schema({
    activityName: { type: String, required: true },
    activityId: { type: String, required: true },
    activityDate: { type: String, required: true },
    activityTime: { type: String, required: true },
    activityDay: { type: String, required: true },
    sessionUsers: {
        type: [Schema.Types.ObjectId],
        ref: 'Users',
        default: [], // Default value is an empty array
    },
});

const bookedSessionModel = mongoose.model<IBookedSession>('BookedSessions', bookedSessionSchema);

export { bookedSessionModel, IBookedSession };