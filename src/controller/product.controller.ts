import { Request, Response } from "express";
import { Product } from "../db/db";
import { uploadOnCloudnary } from '../utils/cloudinary';
import  fs from 'fs'; 

const ProductController = {
  async getAllProduct(req: Request, res: Response)  {
    try {
      // Fetch all products from the database
      const products = await Product.find();

      // Return products with a success status
        res.status(200).json({
        success: true,
        data: products,
        message: "Products fetched successfully.",
      });
    } catch (error) {
      console.error("Error fetching products:", error);

      // Handle the error with a generic message and log the actual error
        res.status(400).json({
        success: false,
        message: "Failed to fetch products. Please try again later.", 
      });
    }
  },

 async  getProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
   
     res.status(200).json({
        success: true,
        data: product,
        message: "Products fetched successfully.",
      });
    } catch (error) {
      console.log("Error get products:", error);
        res.status(400).json({
        success: false,
        message: "Failed to get products. Please try again later.",
      });
    }
  },

  async createproduct(req: Request, res: Response) {
    try {
      const { name, price, description, quantity} = req.body;

    // Define the file object from req.file
    let cloudnaryResponse;
    if (req?.file?.path) {
   
        cloudnaryResponse = await uploadOnCloudnary(req?.file?.path || "");
        
        if (!cloudnaryResponse) {
             res.status(404).json({ message: 'User image is required' });
        }
         // Delete the local file after successful upload
         fs.unlinkSync(req.file.path);
    }

      const product = new Product({
        name,
        price,
        description,
        quantity,
        file: cloudnaryResponse?.url || '',
      });


        await product.save();

        res.status(201).json({ massage: "product added successfully", data: product });
    } catch (err) {
      console.log(err);
        res.sendStatus(400);
    }
  },
    
  async Updateproduct(req:Request,res:Response){
    
    const {id} = req.params;
    const {name,price,description,quantity} = req.body;
          try {

              let cloudnaryResponse;
              if (req?.file?.path) {

                
                cloudnaryResponse = await uploadOnCloudnary(req?.file?.path || "");
                  
                if (!cloudnaryResponse) {
                     res.status(404).json({ message: 'User image is required' });
                }
                 // Delete the local file after successful upload
                 fs.unlinkSync(req.file.path);
                }
                  
              

              const product = await Product.findById(id);
             
              if(product){
                  product.name = name;
                  product.price = price;
                  product.description = description;
                  product.quantity = quantity;
                  product.file = cloudnaryResponse?.url || product.file;
                  await product.save();
                 res.status(200).json({massage:"product updated successfully",data:product});
              }
            }
          catch (err) {
               console.log(err);
               res.sendStatus(400);
          }
},

      async deleteProduct(req:Request,res:Response) {
          try {
              const {id} = req.params;
              await Product.findByIdAndDelete({_id: id});
               res.status(200).json({massage:"product deleted successfully"});
          } catch (err) {
            console.log(err);
               res.sendStatus(400);
          }
      }
};

export default ProductController;
