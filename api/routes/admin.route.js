import express from 'express' ;
import { deleteUser, getUser, updateUser } from '../controllers/admin.controller.js';



const router = express.Router();

router.get('/get' , getUser);
router.delete('/delete/:id' , deleteUser);
router.post('/update/:id' , updateUser);

export default router
