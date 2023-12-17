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
import multer from 'multer';
import cloudinary from './services/cloudinary';
import bodyParser from 'body-parser';

const router = express.Router();
const storage = multer.diskStorage({});
const upload = multer({storage});

//test route for file upload
router.post("/api/upload",upload.single('file'),async (req,res:Response)=>{
    console.log(req.file);
    console.log(req.body);
    res.status(200).send("File uploaded successfully");
});

// Define your routes here

router.get("/api/healthcheck",(req:Request,res:Response)=>{
    res.status(200).send("I am alive");
});

router.get("/api/getSessionsByDate/",validate(getSessionsByDate),getSessionsByDateController);

// ...


router.post("/api/addActivty/", upload.single('file'),(req, res, next) => {
    if (req.body.activityDetails) {
        req.body.activityDetails = JSON.parse(req.body.activityDetails);
    }
    console.log(req.body);
    next();
},validate(addActivitySchema), addActivityController);

// ...

router.post("/api/addActivty/",upload.single('file'),addActivityController);

router.post("/api/signup/",validate(SignupSchema),signUpController);

router.get("/api/login/",validate(loginSchema),loginController);

router.post("/api/booksession/",verifyToken,validate(bookSessionSchema),bookSessionController);

router.get("/api/getAllActivities/",getAllActivitiesController);

router.get("/api/getActivitySchedule/",getActivityScheduleController);


export default router;
