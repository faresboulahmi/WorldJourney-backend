import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createReviews, deletedReviews, getReviewAdmin, getReviews,  updateReviews } from '../controllers/reviews.controller.js';


const router = express.Router();


router.post('/create' , verifyToken , createReviews);
router.delete('/delete/:id'  , deletedReviews);
router.post('/update/:id' , verifyToken , updateReviews);
router.get('/get' , getReviews);
router.get('/getAdmin' , getReviewAdmin)

export default router;