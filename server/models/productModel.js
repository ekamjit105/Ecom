const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    pname: {
      type: String,
      required: true,
    },
    pdesc: {
        type: String,
        required: true,
      },
    pimage: [],
    brand: {
          type: String,
          required: true,
        },
    category: {
        type: String,
        required: true,
            },
    subcategory: {
        type: String,
        required: true,
            },
    basecat: [],
    price:{
        type:Number
    },
    discount:{
        type:Number
    },
    filters: {
      type: Object,
      required: true,
    },
    variants: [],
  },
  { timestamps: true }
);

const productModel = mongoose.model("products", productSchema);
module.exports = productModel;
