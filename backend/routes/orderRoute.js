const express=require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, getupdateOrderstatus, deleteOrder, placeOrderOnline, paymentVerification } = require("../controllers/orderController");
const { isAuthenticatedUser, authoriseRole } = require("../middleware/auth");

const router=express.Router()
router.route("/order/new").post(isAuthenticatedUser,newOrder);
router.route("/paymentonline").post(isAuthenticatedUser,placeOrderOnline);
// router.route("/hello").post(isAuthenticatedUser,checkout);
router.route("/payment/verification").post(isAuthenticatedUser,paymentVerification);
router.route("/order/:id").get(isAuthenticatedUser,getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser,myOrders);
router.route("/admin/orders").get(isAuthenticatedUser,authoriseRole,getAllOrders);
router.route("/admin/order/:id").put(isAuthenticatedUser,authoriseRole,getupdateOrderstatus).delete(isAuthenticatedUser,authoriseRole,deleteOrder)

module.exports=router;