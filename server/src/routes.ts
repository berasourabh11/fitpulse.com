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
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { createOrder } from './services/payment';
import { checkLoginController } from './controller/checkLogin';
import verfiyPaymentController from './controller/verifyPaymentController';
import { getBookedSessionsController } from './controller/getBookedSessionsController';
import { getUpcomingSessionController } from './controller/getUpcomingSessionsConrtoller';

const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
});
const upload = multer({storage: cloudStorage});


const router = express.Router();


//test route for file upload
router.post("/api/payment/createOrder",async (req,res:Response)=>{
    const paymentstatues=await createOrder(req.body.amount,req.body.currency,req.body.receipt);
    if(!paymentstatues){
        res.status(500).send("Error in payment");
    }else{
        res.status(200).send(paymentstatues);
    }

});


router.get("/api/loginCheck",verifyToken,checkLoginController);

// Define your routes here

router.get("/api/healthcheck",(req:Request,res:Response)=>{
    res.status(200).send("I am alive");
});

router.post("/api/getSessionsByDate/",validate(getSessionsByDate),getSessionsByDateController);

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

router.post("/api/login/",validate(loginSchema),loginController);

router.post("/api/booksession/",verifyToken,validate(bookSessionSchema),bookSessionController);

router.get("/api/getAllActivities/",getAllActivitiesController);

router.get("/api/getActivitySchedule/",getActivityScheduleController);


router.post('/api/payment/verifyPayment', verfiyPaymentController);

router.post('/api/logout', async (req, res) => {
    res.clearCookie('jwt');
    res.status(200).json({ message: 'Logged out successfully' });
});

router.get('/api/getBookedSessions', verifyToken , getBookedSessionsController);
router.get('/api/getUpcomingBookedSessions', verifyToken , getUpcomingSessionController);

export default router;
