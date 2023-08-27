import express from 'express'
import {registerController,loginController,testController,forgotPasswordController} from '../controllers/authController.js'
import { requireSignIn,isAdmin } from '../middleware/authMiddleware.js';


//router object
const router =express.Router()

//routing

//REGISTER 
router.post("/register", registerController);

//LOGIN 
router.post("/login", loginController);

//forgot Password
router.post("/forgot-password", forgotPasswordController);

//test
router.get("/test",requireSignIn,isAdmin,testController)

//protected auth routes
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });   


 



export default router