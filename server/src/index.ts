import express from 'express';
import router from './routes';
import cors, { CorsOptions, CorsOptionsDelegate } from 'cors';
import 'dotenv/config';
import connectdb from './utils/connectdb';
import cookieParser from 'cookie-parser';

const app = express();

const allowedOrigins = ["https://fit-pulse-n4m4.onrender.com"];

const corsOptions: cors.CorsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'), false); 
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(router);

app.listen(3000, async () => {
    await connectdb();
    
    console.log('Listening on port 3000');
});

