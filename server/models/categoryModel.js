const mongoose = require("mongoose");

const catSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parent: {
        type: String,
        default:"NA"
      },
    basecat: {
      type:Array,
      default:[]
    },
    filters: {
      type: Object,
    },
    variants: {
      type:Array,
      default:[]
    },
    isMain: {
        type: Boolean,
        default:true
      },
    hpos:{
      type:Number,
      default:1
    },
    catimg:{
      type:String,
      default:"6.jpg"
    },
  },
  { timestamps: true }
);

const catModel = mongoose.model("categories", catSchema);
module.exports = catModel;
