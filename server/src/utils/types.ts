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
    startTime: Date;
    endTime: Date;
    slots: number;
}

export interface IWeekdays {
    sunday:ISession[];
    monday:ISession[];
    tuesday:ISession[];
    wednesday:ISession[];
    thursday:ISession[];
    friday:ISession[];
    saturday:ISession[];
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