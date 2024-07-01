export const mailerReducer = (state={},action) => {
    switch(action.type){
      case "MAIL_SEND_REQUEST":
          return{loading:true};
      case "MAIL_SEND_SUCCESS":
              return{loading:false,success:true};
      case "MAIL_SEND_FAIL":
              return{error:action.payload};
      default : return state
      }
  }