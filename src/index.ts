import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import cardRoutes from './routes/cardRoutes';  //importing card routes

dotenv.config();    //loading environment variables from .env file
const app = express();

app.use(cors());  //enabling cross-origin resource sharing (CORS) for all routes
app.use(express.json());  //parsing JSON bodies

app.use('/api/cards', cardRoutes);  //mounting card routes under /api/cards path

//starting the server:
const PORT = process.env.PORT || 3000;  //setting the port from environment variable or defaulting to 3000
app.listen(PORT, () => {    //starting the server and listening on the specified port
    console.log('Server is listening on port ' + PORT);  //logging the port number to the console
})