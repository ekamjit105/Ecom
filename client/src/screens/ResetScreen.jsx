import React, {useState} from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import axios from 'axios';

const ResetScreen = () => {

    const [email, setEmail] = useState('')
    const [exists,setExists] = useState(false);
    const [checked,setChecked] = useState(false);
    const [OTP, setOTP] = useState('');
    const [verified, setVerified] = useState(false);
    const [matched, setMatched] = useState(false);


    const OTPHandler = async() =>{

        //sending API Request directly from here rather than making an action and reducer
        const reqobj = {
            email:email
        }
        var response = await axios.post("/api/users/finduser",reqobj);
        setExists(response.data.exists);
        setChecked(true);

        //sending OTP
        if(response.data.exists)
        {
        var x = Math.floor(Math.random()*1000000);
        x=x.toString();
        var mailobj = {
            to:email,
            subject:"TrendIn: OTP for account verification",
            text:"Your OTP for account verification is : "+x
        }
        response = await axios.post("/api/mail/sendmail",mailobj);


        const OTPobj={email:email,OTP:x};
            
        response = await axios.post("/api/users/saveOTP",OTPobj);
        }  
    }

    const OTPMatcher = async() =>{
        const OTPobj={email:email,OTP:OTP};
            
        var response = await axios.post("/api/users/validateOTP",OTPobj);
        var {matched, password}=response.data;
        if(matched)
        {
            var mailobj = {
                to:email,
                subject:"TrendIn: Password for re-login",
                text:"Your Account password is : "+password+". Keep it safe and enjoy shopping!"
            }
            response = await axios.post("/api/mail/sendmail",mailobj);
            setMatched(true);
        }
        setVerified(true);
    }

  return (
  
  <>
    
    <Container style={{"width":"30%", "margin-top":"5%","border":"1px solid lightgrey","padding":"2%"}}>
    <h3>Reset your Password</h3>
    <br></br><br></br>
    
    {!exists?
    
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>
        {email!=='' && checked && !exists ?<Form.Text className="text-muted">
          Email does not exist
        </Form.Text>:<h1></h1>}
      <Button variant="primary" onClick={OTPHandler}>
        SendOTP
      </Button>
    </Form>
    :
        <Container>{!matched?<Form>
        <center><h5 style={{"color":"lightgreen"}}>OTP sent to email successfully</h5></center>
        <Form.Group className="mb-3" controlId="formBasicEmail"><br></br>
            <Form.Control type="text" placeholder="Enter OTP" value={OTP} onChange={(e)=>setOTP(e.target.value)}/>
        </Form.Group>
            {OTP!=='' && verified && !matched ?<Form.Text className="text-muted">
            OTP does not match
            </Form.Text>:<h1></h1>}
            <Button variant="primary" onClick={OTPMatcher}>
            Send password on mail
            </Button>
            </Form>
        :   <>
            {alert('Password sent on mail')}
            {window.location.href="/login"}

            </>
        }</Container>
    }
    </Container>




    
    </>
  )
}

export default ResetScreen