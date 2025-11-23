import Product from "../models/product.schema.js"
import Coupon from "../models/coupon.schema.js"
import Order from "../models/order.schema.js"
import asyncHandler from "../service/asyncHandler.js"
import CustomError from "../../utils/customError.js"
import razorpay from "../config/razorpay.config.js"

export const generateRazorpayOrderId = asyncHandler(async(req, res)=>{
    const {products, couponCode} = req.body

    if(!products || products.length === 0){
        throw new CustomError("No product found", 400)
    }

    let totalAmount = 0
    let discountAmount = 0

    let productPriceCalc = Promise.all (
        products.map(async(product) => {
            const {productId, count} = product;
            const productFromDB = await Product.findById(productId)
            if (!productFromDB){
                throw new CustomError("No product found", 400)
            }
            if (productFromDB.stock < count){
                return res.status(400).json({
                    error: "Product quantity not in stock"
                })
            }
            totalAmount += productFromDB.price * count
        })
    )
    await productPriceCalc;

    if (couponCode) {
    const validCoupon = await Coupon.findOne({ code: couponCode });
    if (validCoupon) {
      discountAmount = (totalAmount * validCoupon.discount) / 100;
      totalAmount -= discountAmount;
    }
  }

    const options = {
        amount:Math.round(totalAmount * 100),
        currency: "INR",
        receipt: `receipt ${new Date().getTime()}`
    }
    const order = await razorpay.orders.create(options)

    if (!order) {
        throw new CustomError("UNable to generate order", 400)
    }

    res.status(200).json({
        success: true,
        message: "razorpay order id generated successfully",
        order
    })
})

export const generateOrder = asyncHandler(async(req,res)=>{
    const {transactionId, products, totalAmount, paymentInfo, coupon} = req.body
    
if (!transactionId || !products || products.length === 0) {
    throw new CustomError("Invalid order data", 400);
  }

  const newOrder = await Order.create({
    user: req.user._id,
    products,
    totalAmount,
    transactionId,
    paymentInfo,
    status: "Processing",
  });

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    order: newOrder,
  });
})

export const getMyOrders = asyncHandler(async(req,res)=>{
    //const {transactionId, products, coupon} = req.body
    const orders = await Order.find({ user: req.user._id })
    .populate("products.productId", "name price")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    orders,
  });
})

export const getAllOrders = asyncHandler(async(req,res)=>{
    //const {transactionId, products, coupon} = req.body
    const orders = await Order.find()
    .populate("user", "name email")
    .populate("products.productId", "name price")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    orders,
  });
})

export const updateOrderStatus = asyncHandler(async(req,res)=>{
    //const {transactionId, products, coupon} = req.body
    const { orderId } = req.params;
  const { status } = req.body;

  const order = await Order.findById(orderId);
  if (!order) {
    throw new CustomError("Order not found", 404);
  }

  order.status = status || order.status;
  await order.save();

  res.status(200).json({
    success: true,
    message: "Order status updated successfully",
    order,
  });
})