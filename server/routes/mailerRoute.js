const express = require("express");
const router = express.Router();
var nodemailer = require('nodemailer');

//SEND MAIL || @POST REQUEST
router.post("/sendmail", async (req, res) => {

 const {to,subject,text} = req.body;
  try{

        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "ekamjits105@gmail.com",
            pass: "dadbrfexpbflwwmc"
            //account 2-step security app password : dadbrfexpbflwwmc
        }
        });

        var mailOptions = {
        from: 'ekamjits105@gmail.com',
        to: to,
        subject: subject,
        text: text
        };

        transporter.sendMail(mailOptions, function(error, info){
        
        if (error) {
            res.status(404).send('Error sending mail .. ' + error);
            
        } else {
            
            res.status(200).send('Email sent: ' + info.response);
        }
        });
    }
    catch(e)
    {
        console.log("Error in sending mail : "+e);
    }
});

module.exports = router;