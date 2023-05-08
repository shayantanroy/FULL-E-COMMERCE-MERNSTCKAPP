const Order=require("../models/orderModel");
const Product=require("../models/productModel");
const asyncCatcherr=require("../middleware/asyncCatcherr")
const errorhander=require("../utils/errorhander")
const ApiFeatures=require("../utils/apifeature")
const Payment=require("../models/Payment")
const crypto=require("crypto"); 
// const instance=require("../server");
const Razorpay=require("razorpay")

// Create new Order
exports.newOrder = asyncCatcherr(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const user = req.user._id;
  
    const orderOptions = {
      shippingInfo,
      orderItems,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user,
    };

    await Order.create({orderOptions});
  
    // const order = await Order.create({...orderOptions
    //   // shippingInfo,
    //   // orderItems,
    //   // paymentMethod,
    //   // itemsPrice,
    //   // taxPrice,
    //   // shippingPrice,
    //   // totalPrice,
    //   // paidAt: Date.now(),
    //   // user: req.user.id,
    // });
  
    res.status(201).json({
      success: true,
      // order,
      message: "Order Placed Successfully via Cash On Delivery",
    });
  });



  exports.placeOrderOnline = asyncCatcherr(async (req, res) => {
    const {
      shippingInfo,
      orderItems,
      paymentMethod,
      itemsPrice,
      // taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
  
    const user = req.user._id;
  
    const orderOptions = {
      shippingInfo,
      orderItems,
      paymentMethod,
      itemsPrice,
      // taxPrice,
      shippingPrice,
      totalPrice,
      user,
    };
    const instance= new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_API_SECRET,
    });
  
    const options = {
      amount: Number(totalPrice) * 100,
      currency: "INR",
    };
    const order = await instance.orders.create(options);

    res.status(201).json({
      success: true,
      order,
      orderOptions,
    });
  });




  exports.paymentVerification = asyncCatcherr(async (req, res, next) => {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      orderOptions,
    } = req.body;
  
    const body = razorpay_order_id + "|" + razorpay_payment_id;
  
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body)
      .digest("hex");
  
    const isAuthentic = expectedSignature === razorpay_signature;
  
    if (isAuthentic) {
      const payment = await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
  
      await Order.create({
        ...orderOptions,
        paidAt: new Date(Date.now()),
        paymentInfo: payment._id,
      });
  
      res.status(201).json({
        success: true,
        message: `Order Placed Successfully. Payment ID: ${payment._id}`,
      });
    } else {
      return next(new errorhander("Payment Failed", 400));
    }
  });


  // exports.checkout =asyncCatcherr (async (req, res) => {
  //   const instance= new Razorpay({
  //         key_id: process.env.RAZORPAY_API_KEY,
  //         key_secret: process.env.RAZORPAY_API_SECRET,
  //       });
  //   const options = {
  //     amount: Number(req.body.amount * 100),
  //     currency: "INR",
  //   };
  //   const order = await instance.orders.create(options);
  
  //   res.status(200).json({
  //     success: true,
  //     order,
  //   });
  // });

  
  
  



// get Single Order
exports.getSingleOrder = asyncCatcherr(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
  
    if (!order) {
      return next(new errorhander("Order not found with this Id", 404));
    }
  
    res.status(200).json({
      success: true,
      order,
    });
  });
  // get logged in user  Orders
exports.myOrders = asyncCatcherr(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });
  
    res.status(200).json({
      success: true,
      orders,
    });
  });
  // delete Order -- Admin
exports.deleteOrder = asyncCatcherr(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new errorhander("Order not found with this Id", 404));
    }
  
    await order.remove();
  
    res.status(200).json({
      success: true,
    });
  });
  // get all Orders -- Admin
exports.getAllOrders = asyncCatcherr(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});
  // update order status --admin

  exports.getupdateOrderstatus=asyncCatcherr
  (async(req,res,next)=>{
    const order=await Order.findById(req.params.id);

    if(order.orderStatus==="Delivered"){
      return next(new errorhander("product was delivered",400))
    }
    // if(order.orderStatus==="Shipped"){
    //   return next(new errorhander(" product shipped",400))
    // }
    order.orderItems.forEach(async(o)=>{
      await updateStock(o.product,o.quantity);
    });
    order.orderStatus=req.body.status;
    if(req.body.status==="Delivered"){
      order.deliveredAt=Date.now();

    }
    // if(order.orderStatus==="Shipped"){
    await order.save({ validateBeforeSave: false })
    res.status(200).json({
      success:true
    })
  })
  async function updateStock(id,quantity){
    const produc=await Product.findById(id);

    produc.Stock=produc.Stock-quantity;
    await produc.save({ validateBeforeSave: false });

  }