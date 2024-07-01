const express = require("express");
const router = express.Router();
const catModel = require("../models/categoryModel");

//GET ALL PIZZA || @GET REQUEST
router.get("/getAllCategories", async (req, res) => {
  try {
    //console.log("in server")
    const cats = await catModel.find({});
    res.send(cats);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/getonecategory",async(req,res)=>{
 // console.log("req body" ,req)
  const {cat} = req.body
  try {
      //console.log('in getoneclass router');
     //console.log("recieved name: ",cat);
  
      // Use the `find` method to get an array of class objects based on the class IDs
      const onecat = await catModel.find({ name: cat });
  
      //console.log("onecat in server",onecat);
  
      res.json(onecat); // Send the array of class objects as a JSON response
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });

  router.post("/getonesubcategory",async(req,res)=>{
    //console.log("req body" ,req)
    const cobj = req.body
    try {
        //console.log('in getoneclass router');
       //console.log("recieved object: ",cobj);
    
        // Use the `find` method to get an array of class objects based on the class IDs
        const onesubcat = await catModel.find({ name: cobj.subcat, parent:cobj.cat });
    
        //console.log("onesubcat in server",onesubcat);
    
        res.json(onesubcat); // Send the array of class objects as a JSON response
      } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
      }
    });

    router.post("/deletecategory", async (req, res) => {
      console.log("body:", req.body);
    
      const cid = req.body.cid;
      try {
        console.log("catid:", cid);
    
        const thiscat = await catModel.findOne({ _id: cid });
        if (!thiscat) {
          return res.status(404).send("Category not found");
        }
    
        const parentcat = await catModel.findOne({ name: thiscat.parent });
        if (parentcat) {
          parentcat.basecat = parentcat.basecat.filter((e) => e !== thiscat.name);
          await parentcat.save();
        }
    
        const deletedCat = await catModel.findByIdAndDelete(cid);
    
        if (!deletedCat) {
          return res.status(404).send("Category not found");
        }
    
        console.log("Category deleted successfully:", deletedCat);
        res.status(200).send("Category deleted successfully");
      } catch (error) {
        res.status(400).json({
          message: "Something went wrong",
          error: error.stack,
        });
      }
    });


    router.post("/updatecategory", async (req, res) => {
      console.log("body:",req.body)
       //updating data other than images
      const cobj = req.body.cobj;
      try {
       console.log("cobj:", cobj)
       let category = await catModel.findOne({ _id: cobj._id });

       if (category) {
         // If category exists, update its properties
         category.name = cobj.name;
         category.hpos = cobj.hpos;
       } 
       await category.save();

       res.status(200).send("Cat Updated successfully");
      } catch (error) {
        res.status(400).json({
          message: "Something Went Wront",
          error: error.stack,
        });
      }
    });


    router.post("/updatesubcategory", async (req, res) => {
      console.log("body:",req.body)
       //updating data other than images
      const cobj = req.body.cobj;
      try {
       console.log("cobj:", cobj)
       let category = await catModel.findOne({ _id: cobj._id });

       if (category) {
         // If category exists, update its properties
         category.name = cobj.name;
         category.parent=cobj.parent,
         category.basecat=cobj.basecat,
         category.filters=cobj.filters,
         category.variants=cobj.variants
       } 
       await category.save();

       res.status(200).send("Cat Updated successfully");
      } catch (error) {
        res.status(400).json({
          message: "Something Went Wront",
          error: error.stack,
        });
      }
    });


module.exports = router;