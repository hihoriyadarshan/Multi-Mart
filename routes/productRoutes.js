import express from "express";
import {createProductController,getProductController,getSingleProductController,productPhotoController,deleteProductController,updateProductController}from "../controllers/productController.js";
import { isAdmin, requireSignIn ,} from "../middleware/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post("/create-product",requireSignIn,isAdmin,formidable(),createProductController);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);

//routes update
router.put("/update-product/:pid",requireSignIn,isAdmin,formidable(),updateProductController);

export default router