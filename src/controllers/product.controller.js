import Product from "../models/product.schema.js";
import formidable from "formidable";
import { supabaseFileUpload, supabaseDeleteFile } from "../service/imageUpload.js";
import mongoose from "mongoose";
import CustomError from "../utils/customError.js";
import asyncHandler from "../service/asyncHandler.js";
import config from "../config/index.js";
import fs from "fs";

// 🧩 Add Product
export const addProduct = asyncHandler(async (req, res) => {
  const form = formidable({ multiples: true, keepExtensions: true });

  // Parse form data in a promise
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });

  const { name, price, description, collectionId } = fields;

  if (!name || !price || !description || !collectionId) {
    throw new CustomError("Please fill all required fields", 400);
  }

  const productId = new mongoose.Types.ObjectId().toHexString();

  // Handle file uploads
  const fileArray = Array.isArray(files.photos)
    ? files.photos
    : files.photos
    ? [files.photos]
    : [];

  const imgArrayResp = await Promise.all(
    fileArray.map(async (file, index) => {
      const fileBuffer = fs.readFileSync(file.filepath);

      const upload = await supabaseFileUpload({
        bucketName: config.SUPABASE_BUCKET,
        key: `products/${productId}/photo_${index + 1}.png`,
        fileBuffer,
        contentType: file.mimetype,
      });

      return { secure_url: upload.secure_url };
    })
  );

  // Save product in DB
  const createdProduct = await Product.create({
    _id: productId,
    name,
    price: Number(price),
    description,
    collectionId,
    photos: imgArrayResp,
  });

  if (!createdProduct) {
    throw new CustomError("Product creation failed in DB", 400);
  }

  res.status(201).json({
    success: true,
    message: "Product added successfully",
    product: createdProduct,
  });
});

// 🧾 Get All Products
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  if (!products || products.length === 0) {
    throw new CustomError("No products found", 404);
  }

  res.status(200).json({
    success: true,
    products,
  });
});

// 🔍 Get Product by ID
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    throw new CustomError("Product not found", 404);
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// 🧭 Get Products by Collection ID
export const getProductByCollectionId = asyncHandler(async (req, res) => {
  const { id: collectionId } = req.params;

  const products = await Product.find({ collectionId });

  if (!products || products.length === 0) {
    throw new CustomError("No products found for this collection", 404);
  }

  res.status(200).json({
    success: true,
    products,
  });
});

// ✏️ Update Product
export const updateProduct = asyncHandler(async (req, res) => {
  const { id: productId } = req.params;
  const updates = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    throw new CustomError("Product not found", 404);
  }

  // Update fields
  Object.assign(product, updates);

  const updatedProduct = await product.save();

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product: updatedProduct,
  });
});


// 🗑️ Delete Product
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findById(productId);

  if (!product) {
    throw new CustomError("Product not found", 404);
  }

  // Delete images from Supabase
  await Promise.all(
    product.photos.map(async (photo, index) => {
      await supabaseDeleteFile({
        bucketName: config.SUPABASE_BUCKET,
        key: `products/${product._id.toString()}/photo_${index + 1}.png`,
      });
    })
  );

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});


// import Product from "../models/product.schema.js";
// import formidable from "formidable";
// import { supabaseFileUpload, supabaseDeleteFile } from "../service/imageUpload.js";
// import mongoose from "mongoose";
// import CustomError from "../utils/customError.js";
// import asyncHandler from "../service/asyncHandler.js";
// import config from "../config/index.js";
// import fs from "fs";

// // 🧩 Add Product
// export const addProduct = asyncHandler(async (req, res) => {
//   const form = formidable({ multiples: true, keepExtensions: true });

//   form.parse(req, async (err, fields, files) => {
//     if (err) {
//       throw new CustomError(err.message || "Something went wrong", 500);
//     }

//     const { name, price, description, collectionId } = fields;

//     if (!name || !price || !description || !collectionId) {
//       throw new CustomError("Please fill all required fields", 400);
//     }

//     const productId = new mongoose.Types.ObjectId().toHexString();

//     // Handle file uploads (Supabase)
//     const fileArray = Array.isArray(files.photos)
//       ? files.photos
//       : files.photos
//       ? [files.photos]
//       : [];

//     const imgArrayResp = await Promise.all(
//       fileArray.map(async (file, index) => {
//         const data = fs.readFileSync(file.filepath);

//         const upload = await supabaseFileUpload({
//           bucketName: config.SUPABASE_BUCKET,
//           key: `products/${productId}/photo_${index + 1}.png`,
//           body: data,
//           contentType: file.mimetype,
//         });

//         return { secure_url: upload.publicUrl };
//       })
//     );

//     // Save product in DB
//     const createdProduct = await Product.create({
//       _id: productId,
//       name,
//       price,
//       description,
//       collectionId,
//       photos: imgArrayResp,
//     });

//     if (!createdProduct) {
//       throw new CustomError("Product creation failed in DB", 400);
//     }

//     res.status(201).json({
//       success: true,
//       message: "Product added successfully",
//       product: createdProduct,
//     });
//   });
// });

// // 🧾 Get All Products
// export const getAllProducts = asyncHandler(async (req, res) => {
//   const products = await Product.find();

//   if (!products || products.length === 0) {
//     throw new CustomError("No products found", 404);
//   }

//   res.status(200).json({
//     success: true,
//     products,
//   });
// });

// // 🔍 Get Product by ID
// export const getProductById = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   const product = await Product.findById(id);

//   if (!product) {
//     throw new CustomError("Product not found", 404);
//   }

//   res.status(200).json({
//     success: true,
//     product,
//   });
// });

// // 🧭 Get Products by Collection ID
// export const getProductByCollectionId = asyncHandler(async (req, res) => {
//   const { id: collectionId } = req.params;

//   const products = await Product.find({ collectionId });

//   if (!products || products.length === 0) {
//     throw new CustomError("No products found for this collection", 404);
//   }

//   res.status(200).json({
//     success: true,
//     products,
//   });
// });

// // 🗑️ Delete Product
// export const deleteProduct = asyncHandler(async (req, res) => {
//   const { id: productId } = req.params;

//   const product = await Product.findById(productId);

//   if (!product) {
//     throw new CustomError("Product not found", 404);
//   }

//   // Delete images from Supabase
//   await Promise.all(
//     product.photos.map(async (photo, index) => {
//       await supabaseDeleteFile({
//         bucketName: config.SUPABASE_BUCKET,
//         key: `products/${product._id.toString()}/photo_${index + 1}.png`,
//       });
//     })
//   );

//   await product.deleteOne();

//   res.status(200).json({
//     success: true,
//     message: "Product deleted successfully",
//   });
// });
