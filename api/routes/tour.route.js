import express from 'express';
import { createTour, deleteTour, getTour, getTours,  updateTour } from '../controllers/tour.controller.js';



const router = express.Router();


router.post('/create' , createTour);
router.delete('/delete/:id', deleteTour);
router.post('/update/:id'   , updateTour);
router.get('/get/:id', getTour);
router.get('/get' , getTours);


export default router;
