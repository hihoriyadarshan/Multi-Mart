import express from "express";
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";
import {
  createCategoryController,
  updateCategoryController,
  categoryControlller,
  singleCategoryController,
  deleteCategoryCOntroller,
  createSubCategoryController,
  CategoryCountController,
  sub_CategoryCountController,
  get_all_sub_categoryControlller,
  deletesubCategoryCOntroller,
  updatesubCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

//routes
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//getALl category
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryCOntroller
);

//category count

router.get("/category-count", requireSignIn, isAdmin, CategoryCountController);

//create-sub category
router.post(
  "/subcategories",
  requireSignIn,
  isAdmin,
  createSubCategoryController
);

//get all sub-category

router.get("/get_all_subcategory", get_all_sub_categoryControlller);

//update-sub category

router.put(
  "/update-subcategory/:id",
  requireSignIn,
  isAdmin,
  updatesubCategoryController
);

//sub-category count
router.get(
  "/sub-category-count",
  requireSignIn,
  isAdmin,
  sub_CategoryCountController
);


//delete sub-category
router.delete(
  "/delete-subcategory/:id",
  requireSignIn,
  isAdmin,
  deletesubCategoryCOntroller
);


export default router;
