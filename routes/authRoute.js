import express from 'express'
import {registerController,loginController,testController,forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController, getAllUsers, deleteuserController} from '../controllers/authController.js'
import { requireSignIn,isAdmin } from '../middleware/authMiddleware.js';


//router object
const router =express.Router()

//routing

//REGISTER 
router.post("/register", registerController);

//LOGIN 
router.post("/login", loginController);

//get ALl users 
router.get("/get-users",requireSignIn,isAdmin,getAllUsers); 

//delete Users
router.delete("/delete-user/:id",requireSignIn,isAdmin,deleteuserController);

//forgot Password
router.post("/forgot-password", forgotPasswordController);

//test
router.get("/test",requireSignIn,isAdmin,testController)

//protected user auth routes
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });   

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
 
//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//All orders
router.get("/all-orders", requireSignIn, getAllOrdersController);

// order status update
router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusController);

export default router