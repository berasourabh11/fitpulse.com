import express from 'express';
import router from './routes';
import cors from 'cors';
import 'dotenv/config';
import connectdb from './utils/connectdb';
import cookieParser from 'cookie-parser';

const app = express();

const corsOptions = {
    origin: 'https://fit-pulse-n4m4.onrender.com', 
    credentials: true, 
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(router);

app.listen(3000, async () => {
    await connectdb();
    
    console.log('Listening on port 3000');
});

