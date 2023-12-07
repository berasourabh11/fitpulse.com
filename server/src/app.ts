import express from 'express';
import router from './routes';
import cors from 'cors';
import 'dotenv/config';
import connectdb from './utils/connectdb';
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(router);

app.listen(1337, async () => {
    await connectdb();
    
    console.log('Listening on port 1337');
});

