
import mongoose, { Schema, Document } from 'mongoose';

export interface IUserData extends Document {
  username: string;
  password: string;
  role: 'user' | 'admin'; 
  firstname: string;
  lastname: string;
  email: string;
  bookedActivities: mongoose.Types.ObjectId[]; 
}
  const UserData: Schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], required: true },
    email: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    bookedActivities: {
      type: [Schema.Types.ObjectId],
      ref: 'bookedsessions',
      default: [], // Default value is an empty array
    },
  });

  const UserDataModel = mongoose.model<IUserData>('Users', UserData);

  export default UserDataModel;
