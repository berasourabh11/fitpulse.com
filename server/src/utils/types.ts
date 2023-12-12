import Document from "mongoose";

export type TokenPair = {
    accesstoken: string;
    refreshToken: string;
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
    activityId: string;
    sessions: IWeekdays;
}

export type sessonType = {
    startTime: timeDetails,
    endTime: timeDetails,
    slots: number
}