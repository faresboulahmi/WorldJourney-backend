import express from 'express';
import { deleteUser, test, updateUser,  getUser} from '../controllers/user.controller.js';



const router = express.Router();

router.get('/test', test);
router.post('/update/:id' updateUser)
router.delete('/delete/:id' deleteUser)
router.get('/get/:id', getUser)


export default router;
