import axios from "axios"
//------------------------Registration--------------------------//
export  const startRegisterUser =(n,registration_done)=>{
    return dispatch =>{
        axios.post("https://dct-billing-app.herokuapp.com/api/users/register",n)
        .then((response)=>{
            const result = response.data
               dispatch(registration_net_error(""))
            if(result.errmsg){
               dispatch(registerationError(result.keyValue.email ? "Email" : "Username")) 
            }else{
               dispatch(registerationError("")) 
               registration_done()

            }
        })
        .catch((err)=>{
               dispatch(registration_net_error(err.message))
               dispatch(registerationError("")) 
        })
    }
}
export const registerationError = (n)=>{
    return {
        type:"REGISTRATION_ERROR",
        payload:n
    }
}
export const registration_net_error =(n)=>{
    return {
        type:"REGISTRATION_NET_ERROR",
        payload:n
    }
}
//------------------------Log In--------------------------//
export  const startLoginUser =(n,loggedIn_done)=>{
    return dispatch =>{
        axios.post("https://dct-billing-app.herokuapp.com/api/users/login",n)
        .then((response)=>{
            const result = response.data
            dispatch(login_net_error(""))
            if(result.errors){
                dispatch(loginDone(false))
                dispatch(loginError(result.errors)) 
            }else{
                localStorage.setItem("pos_token",result.token)
                dispatch(loginDone(true))
                dispatch(loginError("")) 
                loggedIn_done()
             }
        })
        .catch((err)=>{
                dispatch(login_net_error(err.message))
                dispatch(loginDone(false))
                dispatch(loginError("")) 
        })
    }
}
export const loginDone =(n)=>{
    return {
        type:"LOGIN_DONE",
        payload:n
    }
}
export const loginError = (n)=>{
    return {
        type:"LOGIN_ERROR",
        payload:n
    }
}
export const login_net_error =(n)=>{
    return {
        type:"LOGIN_NET_ERROR",
        payload:n
    }
}
//---------------Reset----------------

export const reset=()=>{
    return {
        type:"RESET"
    }
}
