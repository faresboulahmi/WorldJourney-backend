import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createTour, deleteTour, getTour, getTours,  updateTour } from '../controllers/tour.controller.js';



const router = express.Router();


router.post('/create' , verifyToken , createTour);
router.delete('/delete/:id' , verifyToken , deleteTour);
router.post('/update/:id' , verifyToken  , updateTour);
router.get('/get/:id', getTour);
router.get('/get' , getTours);


export default router;