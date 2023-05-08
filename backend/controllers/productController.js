const Product=require("../models/productModel")
const asyncCatcherr=require("../middleware/asyncCatcherr")
const errorhander=require("../utils/errorhander")
const ApiFeatures=require("../utils/apifeature");
const cloudinary = require("cloudinary");

// create product---admin
 exports.createproduct=asyncCatcherr(async(req,res,next)=>{
    // (req.user.id get from auth.js file in req.user )
//     let images = [];

//     if (typeof req.body.images === "string") {
//       images.push(req.body.images);
//     } else {
//       images = req.body.images;
//     }
  
//     const imagesLinks = [];
  
//     for (let i = 0; i < images.length; i++) {
//       const result = await cloudinary.v2.uploader.upload(images[i], {
//         folder: "products",

//       });
  
//       imagesLinks.push({
//         public_id: result.public_id,
//         url: result.secure_url,
//       });
//     }
  
//     req.body.images = imagesLinks;
//     req.body.user = req.user.id;
//     // req.body.user=req.user.id
//     const product=await Product.create(req.body);
//     res.status(201).json({
//         success:true,
//         product
//     })
//  })
let images = [];

if (typeof req.body.images === "string") {
  images.push(req.body.images);
} else {
  images = req.body.images;
}

const imagesLinks = [];

for (let i = 0; i < images.length; i++) {
  const result = await cloudinary.v2.uploader.upload(images[i], {
    folder: "products",
    // chunk_size:6000000,
  });

  imagesLinks.push({
    public_id: result.public_id,
    url: result.secure_url,
  });
}

req.body.images = imagesLinks;
req.body.user = req.user.id;

const product = await Product.create(req.body);

res.status(201).json({
  success: true,
  product,
});
});


  
// get all products
exports.getproducts=asyncCatcherr(async(req,res,next)=>{
  // return next(new errorhander("product not found",500));

    const resPerPage=8;
    const productsCount=await Product.countDocuments();
    const apiFeatures=new ApiFeatures(Product.find(),req.query)
    .search()
    .filter();
    // .pagination(resPerPage);
   
    //  let products=await apiFeatures.query;
    //  let filterproductsCount=products.length;
    //  apiFeatures.pagination(resPerPage);
    //  products=await apiFeatures.query;

    let products = await apiFeatures.query;

    let filteredProductsCount = products.length;
  
    apiFeatures.pagination(resPerPage);
  
    products = await apiFeatures.query.clone();


    res.status(200).json({
        succes:true,
        
        productsCount,
        resPerPage, 
      filteredProductsCount,
      products,
    });


});

exports.adminproducts=asyncCatcherr(async(req,res,next)=>{
  const products=await Product.find();
  res.status(200).json({
    succes:true,
    products,
  })
})




// products update---admin
exports.updateproduct=asyncCatcherr(async(req,res,next)=>{
   
    let product=await Product.findById(req.params.id)
    // if(!product){
    //     res.status(500).json({
    //         succes:false,
    //         message:"product not found"
    //     })
    // }
    if(!product){
        return next(new errorhander("product not found",404));
    }


    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    if (images !== undefined) {
      // Deleting Images From Cloudinary
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }
  
      const imagesLinks = [];
  
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });
  
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
  
      req.body.images = imagesLinks;
    }
  
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,
        runValidators:true,
    useFindAndModify:false});
    
    res.status(200).json({
        succes:true,
        product
    })

})
// delete product ---admin
exports.deleteproduct=asyncCatcherr(async(req,res,next)=>{
    const product=await Product.findById(req.params.id)
    // if(!product){
    //    return res.status(500).json({
    //         succes:false,
    
    //         message:"product not found"
    //     })
    // }
    if(!product){
        return next(new errorhander("product not found",404));
    }
    await product.remove()
    res.status(200).json({
        succes:true,
        message:"product deleted"
    })

})
// products details
exports.productdetails=asyncCatcherr(async(req,res,next)=>{
    

    const product=await Product.findById(req.params.id)
    // if(!product){
    //     res.status(500).json({
    //         succes:false,
    //         message:"product not found"
    //     })
    // }
    if(!product){
        return next(new errorhander("product not found",404));
    }
    res.status(200).json({
        succes:true,
         product
    })

})
// // Create New Review or Update the review
// exports.getreviews = asyncCatcherr(async (req, res, next) => {
//     const { rating, comment, productId } = req.body;
  
//     const reviews = {
//       user: req.user._id,
//       name: req.user.name,
//       rating: Number(rating),
//       comment,
//     };
  
//     const product = await Product.findById(productId);
  
//     const isReviewed = product.reviews.find(
//       (rev) => rev.user.toString() === req.user._id.toString()
//     );
  
//     if (isReviewed) {
//       product.reviews.forEach((rev) => {
//         if (rev.user.toString() === req.user._id.toString())
//           (rev.rating = rating), (rev.comment = comment);
//       });
   
//     }
//      else {
//       product.reviews.push(reviews);
//       product.numOfReviews = product.reviews.length;
//     }
  
//     let avg = 0;
  
//     product.reviews.forEach((rev) => {
//       avg += rev.rating;
//     });
  
//     product.rating= avg / product.reviews.length;
  
//     await product.save({ validateBeforeSave: false });
  
//     res.status(200).json({
//       success: true,
//     });
//   });



  exports.getreviews = asyncCatcherr(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const reviews = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const product = await Product.findById(productId);
  
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(reviews);
      product.numOfReviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.rating = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });
  








// Get All Reviews of a product
exports.getProductReviews = asyncCatcherr(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
  
    if (!product) {
      return next(new errorhander("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  });
  
  // Delete Review
  exports.deleteReview = asyncCatcherr(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new errorhander("Product not found", 404));
    }
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });

