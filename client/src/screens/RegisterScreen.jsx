import React from 'react'
import axios from 'axios'
import {Form, Container, Button} from 'react-bootstrap'
import {useState} from 'react'
import {loginUser, registerUser} from '../actions/userAction'
import {useSelector, useDispatch } from 'react-redux'

const RegisterScreen = () => {
  const [name,setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    
    const [exists,setExists] = useState(true);
    const [checked,setChecked] = useState(false);
    const [OTP, setOTP] = useState('');
    const [verified, setVerified] = useState(false);
    const [matched, setMatched] = useState(false);


    const dispatch = useDispatch()
    const registerState = useSelector((state) => state.registerReducer);
    const { success } = registerState;
    
    const registerHandler = async() =>{
    
        if(password!==confirmpassword)
        {
            alert("paswords do not match!")
        }
        else{

        //CHECK IF USER ALREADY EXISTS

        const reqobj = {
          email:email
        }
        var response = await axios.post("/api/users/finduser",reqobj);
        setExists(response.data.exists);
        setChecked(true);

        if(!response.data.exists)
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
   }



   const OTPMatcher = async() =>{
    const OTPobj={email:email,OTP:OTP};
        
    var response = await axios.post("/api/users/validateOTP",OTPobj);
    var {matched}=response.data;
    if(matched)
    {

        const user = {name:name,email:email,password:password, addresses:[address,]}
        alert("Congratulations! New Account created Successfully. Check your mail for credentials.")

        dispatch(registerUser(user))
        var mailobj = {
            to:email,
            subject:"TrendIn: Congratulations on creating a new account!",
            text:"Your Account password is : "+password+". Keep it safe and enjoy shopping!"
        }
          
        response = await axios.post("/api/mail/sendmail",mailobj);
        setMatched(true);
        user = {email,password}
        
    }
    setVerified(true);
}
    

 return (
    <>
    
    
    <Container>
    
    {exists?
    
      <Form>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">  
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        
          
        {email!=='' && checked && exists ?
        <Form.Text className="text-muted">Email already exists</Form.Text>
        :
        <Form.Text className="text-muted">We'll never share your email with anyone else.
        </Form.Text>}

      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group> 
      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" value={confirmpassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Add Primary Address</Form.Label>
        <Form.Control type="text" placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)}/>
      </Form.Group> 
     {name&&email&&address&&password?(<><Button variant="primary" onClick={registerHandler}>
        Send OTP
      </Button></>):(<><Button disabled variant="primary" onClick={registerHandler}>
        Send OTP
      </Button></>)}
     
      
    </Form>
    
    : //does not exist
    <Container style={{textAlign:"center"}}><center>{!matched?<Form style={{width:"50%", textAlign:"center"}}>
        <center><br></br><br></br><h5 style={{"color":"lightgreen"}}>OTP sent to email successfully</h5></center>
        <Form.Group className="mb-3" controlId="formBasicEmail"><br></br>
            <Form.Control type="text" placeholder="Enter OTP" value={OTP} onChange={(e)=>setOTP(e.target.value)}/>
        </Form.Group>
            {OTP!=='' && verified && !matched ?<Form.Text className="text-muted">
            OTP does not match
            </Form.Text>:<h1></h1>}
            <Button variant="primary" onClick={OTPMatcher}>
            Register
            </Button>
            </Form>
        :   <>

            </>
        }</center></Container>
    
    }
    
    </Container>
    </>
  )

}

export default RegisterScreen