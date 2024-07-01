import axios from "axios";

export const sendMail = (mailobj) =>async(dispatch)=>{
    
    
    dispatch({ type: "SEND_MAIL_REQUEST" });
    try{
    const response =  await axios.post('/api/mail/sendmail',mailobj);
    dispatch({ type: "SEND_MAIL_SUCCESS" });
    }
    catch(error){
        console.log(error);
        dispatch({ type: "SEND_MAIL_FAIL" });
    }
}