
import { Request, Response } from "express";
import UserDataModel from "../models/userDataModel";

export async function checkLoginController(req:Request,res:Response){

    const {username,email,firstname,lastname}=(req as any).user.data;
    const user=await UserDataModel.findOne({username:username});
    if(!user){
        return res.status(401).send("Error in finding user");
    } 
    res.status(200).send({username,email,firstname,lastname});
}