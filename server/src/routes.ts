import express , {Request,Response} from 'express';
import validate from './middleware/validateResource';
import getSessionsSchema from './schema/getSessionsSchema';
import { getSessionController } from './controller/getSessionController';
import addActivityController from './controller/addActivityController';

const router = express.Router();

// Define your routes here
router.get("/api/getSessions/",validate(getSessionsSchema),getSessionController);

router.get("/api/addActivty/",addActivityController);

export default router;
