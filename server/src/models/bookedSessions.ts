import mongoose, { Schema, Document } from 'mongoose';
import { IUserData } from './userDataModel';

interface IBookedSession extends Document {
    activityName: string;
    activityId: string;
    activityDate: Date;
    sessionUsers: IUserData[];
}

const bookedSessionSchema: Schema = new Schema({
    activityName: { type: String, required: true },
    activityId: { type: String, required: true },
    activityDate: { type: Date, required: true },
    sessionUsers: [{ type: Schema.Types.ObjectId, ref: 'Users' }]
});

const bookedSessionModel = mongoose.model<IBookedSession>('BookedSessions', bookedSessionSchema);

export { bookedSessionModel, IBookedSession };
