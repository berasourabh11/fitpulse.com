import express , {Request,Response} from 'express';
import validate from './middleware/validateResource';
import getSessionsByDate from './schema/getSessionsByDate';
import addActivityController from './controller/addActivityController';
import SignupSchema from './schema/signupSchema';
import { signUpController } from './controller/signUpController';
import { loginController } from './controller/loginController';
import loginSchema from './schema/loginSchema';
import { addActivitySchema } from './schema/addActivitySchema';
import { bookSessionController } from './controller/booksessionController';
import verifyToken from './middleware/verifyToken';
import bookSessionSchema from './schema/bookSessionSchema';
import { getSessionsByDateController } from './controller/getSessionsByDateController';
import getAllActivitiesController from './controller/getAllActivityController';
import getActivityScheduleController  from './controller/getActivityScheduleController';
const router = express.Router();

// Define your routes here

router.get("/api/healthcheck",(req:Request,res:Response)=>{
    res.status(200).send("I am alive");
});

router.get("/api/getSessionsByDate/",validate(getSessionsByDate),getSessionsByDateController);

router.post("/api/addActivty/",validate(addActivitySchema),addActivityController);

router.post("/api/signup/",validate(SignupSchema),signUpController);

router.get("/api/login/",validate(loginSchema),loginController);

router.post("/api/booksession/",verifyToken,validate(bookSessionSchema),bookSessionController);

router.get("/api/getAllActivities/",getAllActivitiesController);

router.get("/api/getActivitySchedule/",getActivityScheduleController);


export default router;
