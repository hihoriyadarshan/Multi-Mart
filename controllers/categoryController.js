import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
import SubCategory from "../models/sub-categoryModel.js";
import subCategoryModel from "../models/sub-categoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category Already Exisits",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "new category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Errro in Category",
    });
  }
};

//update category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

// get all category

export const categoryControlller = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Categories List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};

// single category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get SIngle Category SUccessfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Category",
    });
  }
};

//delete category
export const deleteCategoryCOntroller = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Categry Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting category",
      error,
    });
  }
};

//count category

export const CategoryCountController = async (req, res) => {
  try {
    const total = await categoryModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in Category count",
      error,
      success: false,
    });
  }
};

//create sub- category

export const createSubCategoryController = async (req, res) => {
  try {
    const { s_name, category } = req.body;

    // Check if required fields are present
    if (!s_name || !category) {
      return res.status(400).json({ error: "Name and category are required" });
    }

    // Check if the specified category exists (you may need to validate this further)
    const existingCategory = await categoryModel.findById(category);
    if (!existingCategory) {
      return res.status(400).json({ error: "Category not found" });
    }

    const subCategory = new SubCategory({
      s_name,
      category,
      slug: slugify(s_name),
    });

    await subCategory.save();

    res
      .status(201)
      .json({ message: "Sub-category created successfully", subCategory });
  } catch (error) {
    console.error("Sub-category creation error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the sub-category" });
  }
};

//sub-category count

export const sub_CategoryCountController = async (req, res) => {
  try {
    const total = await SubCategory.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in Category count",
      error,
      success: false,
    });
  }
};

// get all sub-category

export const get_all_sub_categoryControlller = async (req, res) => {
  try {
    const category = await SubCategory.find({});
    res.status(200).send({
      success: true,
      message: "All Sub-Categories List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all sub-categories",
    });
  }
};

//delete sub-category

export const deletesubCategoryCOntroller = async (req, res) => {
  try {
    const { id } = req.params;
    await subCategoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "sub-Categry Deleted  Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting sub-category",
      error,
    });
  }
};

//update sub-category

export const updatesubCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await subCategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};
