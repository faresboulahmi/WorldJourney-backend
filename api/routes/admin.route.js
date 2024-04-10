import express from 'express' ;
import { deleteUser, getUser, updateUser } from '../controllers/admin.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.get('/get' , getUser);
router.delete('/delete/:id' , verifyToken , deleteUser);
router.post('/update/:id' , updateUser);

export default router