const initialResponseError = {registration:"",login:""}

const responseErrorReducer = (state=initialResponseError,action) =>{
    switch(action.type){
        case "REGISTRATION_ERROR":{
            return {...state,registration:action.payload}
        }
        case "LOGIN_ERROR":{
            return{...state,login:action.payload}
        }
        case"RESET":{
            return{...initialResponseError}
        }
        default:{
            return state
        }
    }
}
export default responseErrorReducer