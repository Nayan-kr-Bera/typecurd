import express from "express";

const router = express.Router();

import upload from '../middleware/file';
import ProductController from "../controller/product.controller";


router.post('/product', upload.single('file'), ProductController.createproduct); // File upload
router.get('/products', ProductController.getAllProduct );
router.get('/product/:id', ProductController.getProduct);
router.put('/product/:id', upload.single('file'), ProductController.Updateproduct);
router.delete('/product/:id', ProductController.deleteProduct);

export default router;
