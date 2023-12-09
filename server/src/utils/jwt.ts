import { sign } from "jsonwebtoken";
import { IUserData } from "../models/userDataModel";

export function generateJWT(data: IUserData, secretToken: string , expiresIn:string): string {
    // Replace with your JWT generation logic
    const token = sign({ data }, secretToken, { expiresIn: expiresIn });
    return token;
}