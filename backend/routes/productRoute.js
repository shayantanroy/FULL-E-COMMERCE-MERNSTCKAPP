const express=require("express");
const { createproduct, getproducts, updateproduct, deleteproduct, productdetails, getProductReviews, getreviews, deleteReview, getpagination, adminproducts } = require("../controllers/productController");
const { isAuthenticatedUser, authoriseRole } = require("../middleware/auth");


const router=express.Router()
router.route("/products").get(getproducts)
router.route("/product/new").post(isAuthenticatedUser,authoriseRole,createproduct)
router.route("/product/:id").put(isAuthenticatedUser,authoriseRole,updateproduct).delete(isAuthenticatedUser,authoriseRole,deleteproduct).get(productdetails)
router.route("/review").put(isAuthenticatedUser,getreviews)
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser,deleteReview)
router.route("/admin/products").get(isAuthenticatedUser,authoriseRole,adminproducts)
module.exports=router;
