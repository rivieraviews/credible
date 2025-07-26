//this file is for defining the API endpoints related to cards

import express from 'express';
import { createCard, getAllCards } from '../controllers/cardController';    //importing the controller function

const router = express.Router();    //creating a new router instance (a router is a mini express application)

router.get('/', getAllCards);   //route to get all cards

router.post('/', createCard);  //route to create a new card

export default router;  //exporting the router to be used elsewhere in the application