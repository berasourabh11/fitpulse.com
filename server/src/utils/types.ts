import Document from "mongoose";

export type UserLoginDetails = {
    token: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
};

export type timeDetails={
    hours: number;
  minutes: number;
  seconds: number;
  am_pm: string;
}


export interface ISession {
    startTime: String;
    endTime: String;
    slots: number;
}

export interface IWeekdays {
    [key: string]: ISession[]; 
}

export interface IActivity extends Document {
    activityName: string;
    activityId: number;
    sessions: IWeekdays;
    imageUrl: string;
}

export type sessonType = {
    startTime: timeDetails,
    endTime: timeDetails,
    slots: number
}