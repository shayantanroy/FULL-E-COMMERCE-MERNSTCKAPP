const express=require("express");
const { registerUser, loginUser, logoutUser,forgotPassword, resetpassword, userDetails, updateuser, getalluser, getsingleuser, updateuserrole, deleteuser, updatePassword } = require("../controllers/userController");
const { isAuthenticatedUser, authoriseRole } = require("../middleware/auth");

const router=express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
// router.route("/login").get(loginUser);(use post because token create)
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetpassword); 
router.route("/me").get(isAuthenticatedUser,userDetails);
router.route("/me/update").put(isAuthenticatedUser,updateuser);
router.route("/admin/users").get(isAuthenticatedUser,authoriseRole,getalluser);
router.route("/admin/user/:id").get(isAuthenticatedUser,authoriseRole,getsingleuser).put(isAuthenticatedUser,authoriseRole,updateuserrole).delete(isAuthenticatedUser,authoriseRole,deleteuser);
// router.route("/password/update").put(isAuthenticatedUser, updatePassword);



   module.exports=router;
