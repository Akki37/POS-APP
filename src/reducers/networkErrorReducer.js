const initialNetworkError = {registration:"",login:"",account:"",customers:"",products:"",bills:""}

const networkErrorReducer = (state=initialNetworkError,action) =>{
    switch(action.type){
        case "REGISTRATION_NET_ERROR":{
            return {...state,registration:action.payload}
        }
        case "LOGIN_NET_ERROR":{
            return {...state,login:action.payload}
        }
        case "CUSTOMERS_NET_ERROR":{
            return {...state,customers:action.payload}
        }
        case "PRODUCTS_NET_ERROR": {
            return {...state,products:action.payload}
        }
        case "ACCOUNT_NET_ERROR":{
            return {...state,account:action.payload}
        }
        case"RESET":{
            return {...initialNetworkError}
        }
        default:{
            return state
        }
    }

}
export default networkErrorReducer