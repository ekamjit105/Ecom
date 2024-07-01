const mongoose = require('mongoose')

const OTPSchema = mongoose.Schema(
    {
        email:{type : String
        },
        OTP:{type : String
        },
    },
);

const OTPModel = mongoose.model("otp", OTPSchema);
module.exports = OTPModel;
