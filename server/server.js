const express = require('express')

const connectDB = require('./config/config') //./ means in current directory go to config folder and import from config.js file
const dotenv=require('dotenv')

const multer = require('multer')
const path=require('path')

const morgan = require('morgan')

//config dotenv
dotenv.config()
//The config() function is a method provided by the dotenv package. 
//It loads the variables from the .env file and makes them available as key-value pairs in the process.env object, 
//which is a built-in object in Node.js for accessing environment variables.


//call function to connect to mongodb
connectDB()


const app =  express()
//created a REST object 'app' to use the express functions 

//middleware
app.use(express.json())
app.use(morgan('dev'))

//route

app.use("/api/cats",require("./routes/categoryRoute"));
app.use("/api/users",require("./routes/userRoute"));
app.use("/api/products",require("./routes/productRoute"));
app.use("/api/mail",require("./routes/mailerRoute"));
app.use("/api/orders",require("./routes/orderRoute"));

app.get('/',(req,res)=>{
    res.send("<h1>hello from node server via nodemon</h1>")
})

    //CRUD Operations : GET POST PUT DELETE
    //this function takes two parameters => 1. Path 2.(req,res)=>{} callback function
    //req => data given by user
    //res => to send data to user

const port=process.env.PORT || 8080;
//create a port to run on
app.listen(8080, ()=>{
    console.log(`Server running on ${process.env.NODE_ENV} mode, on port ${port}`)
})


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'public/images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }
})

const productstorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'public/product-images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({
    storage:storage
})

const productupload = multer({
    storage:productstorage
})


const ImageModel = require('./models/imagesModel')
const CatModel = require('./models/categoryModel')
const ProductModel = require('./models/productModel')
const productModel = require('./models/productModel')

app.post('/upload',upload.single('file'),(req,res)=>{
    console.log(req.file)
    ImageModel.create({image:req.file.filename})
    .then(result=>res.json(result))
    .catch(err=>console.log(err))

})

app.post('/uploadcatimg',upload.single('file'),async(req,res)=>{
    
    console.log(req.body)
    console.log(req.file)
    //const cobj = JSON.parse(req.body.cobj);
    const cobj = JSON.parse(req.body.cobj);
  
    console.log(cobj)

    let category = await CatModel.findOne({ name: cobj.name });

    if(category)
    {
        category.name= cobj.name,
        category.hpos= cobj.hpos,
        category.catimg=req.file.filename
    }
    else{
        category = new CatModel({
            name: cobj.name,
            hpos: cobj.hpos,
            // Add other properties as needed
            catimg: req.file.filename
          });
    }

    
    await category.save();




    res.status(200).send("Cat Updated successfully");

/*
    ImageModel.create({image:req.file.filename})
    .then(result=>res.json(result))
    .catch(err=>console.log(err))
*/
})


app.post('/uploadsubcatimg',upload.single('file'),async(req,res)=>{
    
    console.log(req.body)
    console.log(req.file)
    //const cobj = JSON.parse(req.body.cobj);
    const cobj = JSON.parse(req.body.cobj);
  
    console.log(cobj)

    let category = await CatModel.findOne({ name: cobj.name, parent:cobj.parent });
    let parentcategory = await CatModel.findOne({ name: cobj.parent});
    if(category)
    {
        category.name = cobj.name;
        category.parent=cobj.parent,
        category.basecat=cobj.basecat,
        category.filters=cobj.filters,
        category.variants=cobj.variants,
        category.catimg=req.file.filename
    }
    else{
        category = new CatModel({
            name : cobj.name,
            parent:cobj.parent,
            basecat:cobj.basecat,
            filters:cobj.filters,
            variants:cobj.variants,
            isMain:false,
            // Add other properties as needed
            catimg: req.file.filename
          });

          parentcategory.basecat=[...parentcategory.basecat,cobj.name]
        
    }

    
    await category.save();

    await parentcategory.save();



    res.status(200).send("Cat Updated successfully");

/*
    ImageModel.create({image:req.file.filename})
    .then(result=>res.json(result))
    .catch(err=>console.log(err))
*/
})


app.post('/uploadproductimg',productupload.array('file'),async(req,res)=>{
    
    const files = req.files;

    const pobj = JSON.parse(req.body.pobj);
  
    console.log(pobj)
    console.log(files)


    let farr=[]
    files.forEach(e => {
        farr=[...farr,e.filename]
    });
    console.log("farr:",farr)


    if(pobj._id)
    {
        //Update Existing product

        let product = await productModel.findOne({ _id: pobj._id});
        if(product)
        {
            product.pname=pobj.pname,
            product.brand=pobj.brand,
            product.pdesc=pobj.pdesc,
            product.category=pobj.category,
            product.subcategory=pobj.subcategory,
            product.price=pobj.price,
            product.discount=pobj.discount,
            product.basecat=pobj.basecat,
            product.variants=pobj.variants,
            product.filters=pobj.filters,
            product.pimage=farr
        }
        await product.save();

    }
    else
    {
        product = new productModel({
            pname:pobj.name,
            brand:pobj.brand,
            pdesc:pobj.desc,
            category:pobj.category,
            subcategory:pobj.basecategry,
            price:pobj.price,
            discount:pobj.discount,
            basecat:pobj.basecat,
            variants:pobj.variants,
            filters:pobj.filters,
            pimage:farr
          });
          
    await product.save();
    }




    res.status(200).send("Products Updated successfully");

/*
    ImageModel.create({image:req.file.filename})
    .then(result=>res.json(result))
    .catch(err=>console.log(err))
*/
})



app.use(express.static('public'))

app.get('/getImage',(req,res)=>{
    ImageModel.find()
    .then(images=>res.json(images))
    .catch(Err=>res.json(err))
})