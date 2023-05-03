const initialStatus = {loggedin : false}

const register_loginReducer = (state=initialStatus,action)=>{
 switch(action.type){
     case "LOGIN_DONE":{
         return {...state,loggedin:action.payload}
     }
     default:{
         return state
     }
 }
}
export default register_loginReducer