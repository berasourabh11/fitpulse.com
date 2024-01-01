import { Request, Response } from 'express';
import UserDataModel from '../models/userDataModel';
import { IActivity } from '../utils/types';


export const getBookedSessionsController = async (req: Request, res: Response) => {
    const username = req.user?.data.username;
    console.log("USERID",username);
    if(username===undefined){
        res.status(500).send("Error in getting Details");
        return;
    }
    const userDetails=await UserDataModel.findOne({username:username}).populate("bookedActivities");
    console.log(userDetails)
    if(userDetails===null){
        res.status(500).send("Error in getting Details");
        return;
    }
    const bookedActivitites=userDetails.bookedActivities;
    console.log(bookedActivitites);
    return res.status(200).send(bookedActivitites);
};
