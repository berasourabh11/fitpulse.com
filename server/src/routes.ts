import express , {Request,Response} from 'express';
import validate from './middleware/validateResource';
import getSessionsSchema from './schema/getSessionsSchema';
import { getSessionController } from './controller/getSessionController';
import addActivityController from './controller/addActivityController';
import SignupSchema from './schema/signupSchema';
import { signUpController } from './controller/signUpController';
import { loginController } from './controller/loginController';
import loginSchema from './schema/loginSchema';
import { addActivitySchema } from './schema/addActivitySchema';
const router = express.Router();

// Define your routes here

router.get("/api/healthcheck",(req:Request,res:Response)=>{
    res.status(200).send("I am alive");
});

// router.get("/api/getSessions/",validate(getSessionsSchema),getSessionController);

router.post("/api/addActivty/",validate(addActivitySchema),addActivityController);

router.post("/api/signup/",validate(SignupSchema),signUpController);

router.get("/api/login/",validate(loginSchema),loginController);

export default router;
