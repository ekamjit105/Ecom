const express = require("express");
const router = express.Router();
const productModel = require("../models/productModel");

router.post("/getproductsbycat",async(req,res)=>{
    //console.log("req body" ,req)
    const cobj = req.body
    try {
        //console.log('in getoneclass router');
       console.log("recieved object: ",cobj);
    
       let products={};

        // Use the `find` method to get an array of class objects based on the class IDs
        if(cobj.subcat!=="NA")
        products = await productModel.find({ category: cobj.cat, subcategory:cobj.subcat });
        else
        products = await productModel.find({ category: cobj.cat});
        

        console.log("Products in server for "+cobj.cat+" "+cobj.subcat+" : "+products.length);
    
        res.json(products); // Send the array of class objects as a JSON response

      } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
      }
    });

    router.post("/getdealsproducts",async(req,res)=>{
    
      try {
          
         let products={};

          products = await productModel.find({ discount: { $gt: 0 } });
          //console.log("discounted products:",products)
          res.json(products); // Send the array of class objects as a JSON response
  
        } catch (error) {
          console.error(error);
          res.status(500).send('Server Error');
        }
      });  
    


router.post("/getproductbyid",async(req,res)=>{
  //console.log("req body" ,req)
  const idobj = req.body
  try {
      //console.log('in getoneclass router');
     //console.log("recieved object: ",idobj);
     const id=idobj.id
  
     let product={};

      // Use the `find` method to get an array of class objects based on the class IDs
      
      product = await productModel.findOne({ _id:id});
      

      //console.log("One Product in server for id: "+id);
      //console.log(product)

      res.json(product); // Send the array of class objects as a JSON response

    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });

  
router.post("/deleteproduct", async (req, res) => {
  console.log("body:",req.body)
   
  const pid = req.body.pid;
  try {
   console.log("productid:", pid)
   const deletedOrder = await productModel.findByIdAndDelete({_id:pid});

   if (!deletedOrder) {
     return res.status(404).send("Product not found");
   }

   console.log("Product deleted successfully:", deletedOrder);
   res.status(200).send("Product delivered successfully");
  } catch (error) {
    res.status(400).json({
      message: "Something Went Wront",
      error: error.stack,
    });
  }
});


router.post("/updateproduct", async (req, res) => {
  console.log("body:",req.body)
   //updating data other than images
  const pobj = req.body.pobj;
  try {
   console.log("pobj:", pobj)
   let product = await productModel.findOne({ _id: pobj._id });

   if (product) {
     // If product exists, update its properties
     product.pname=pobj.pname,
     product.brand=pobj.brand,
     product.pdesc=pobj.pdesc,
     product.category=pobj.category,
     product.subcategory=pobj.subcategory,
     product.price=pobj.price,
     product.discount=pobj.discount,
     product.basecat=pobj.basecat,
     product.variants=pobj.variants,
     product.filters=pobj.filters
   } 
   await product.save();

   res.status(200).send("Cat Updated successfully");
  } catch (error) {
    res.status(400).json({
      message: "Something Went Wront",
      error: error.stack,
    });
  }
});



module.exports = router;