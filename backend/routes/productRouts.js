import express from 'express'
import { getAllProducts, createProduct, updateProductById, deleteProductById, getProductById } from '../controllers/productController.js'; // ✅ Named Import

const router = express.Router();

router.get("/get-all-products",getAllProducts);
router.get("/:id",getProductById)
router.post("/create-product", createProduct)
router.put("/:id",updateProductById)
router.delete("/:id",deleteProductById)

export default router;