const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");

//GET ALL PIZZA || @GET REQUEST
router.post("/placeOrder", async (req, res) => {
  try {
    const order = req.body
    const neworder = new Order(order)
    neworder.save()
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(404)
  }
});

router.post("/myOrders", async (req, res) => {
  try {
    
    const {userId} = req.body
    const orders = await Order.find({userId}).sort({ _id: "-1" });
    res.send(orders);
  
  } catch (error) {
    res.status(404).json({message:"error in getting order"})
  }
});


router.get("/alluserorder", async (req, res) => {
  try {
    const orders = await Order.find({});
   // console.log("orders in server", orders)
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).json({
      message: "Something Went Wrong",
      error: error.stack,
    });
  }
});

router.post("/deliverorder", async (req, res) => {
  const orderid = req.body.orderid;
  try {
    const order = await Order.findOne({ _id: orderid });
    order.isDelivered = true;
    await order.save();
    res.status(200).send("Order deliverd success");
  } catch (error) {
    res.status(400).json({
      message: "Something Went Wront",
      error: error.stack,
    });
  }
});

router.post("/deleteorder", async (req, res) => {
  console.log("body:",req.body)
   
  const orderid = req.body.orderid;
  try {
   console.log("orderid:", orderid)
   const deletedOrder = await Order.findByIdAndDelete({_id:orderid});

   if (!deletedOrder) {
     return res.status(404).send("Order not found");
   }

   console.log("Order deleted successfully:", deletedOrder);
   res.status(200).send("Order delivered successfully");
  } catch (error) {
    res.status(400).json({
      message: "Something Went Wront",
      error: error.stack,
    });
  }
});


router.post("/updateorder", async (req, res) => {
  const order = req.body.order;
  try {
    console.log("updating order:",order)
    const foundorder = await Order.findOne({ _id: order._id });
    console.log("found order..",foundorder)
    foundorder.status = order.status;
    await foundorder.save();
    res.status(200).send("Order update success");
  } catch (error) {
    res.status(400).json({
      message: "Something Went Wrong",
      error: error.stack,
    });
  }
});


module.exports = router;