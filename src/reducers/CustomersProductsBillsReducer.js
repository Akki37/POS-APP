const initialDataReport = {account: {} , customers : [] , products : [] ,bills : [], billingCustomer:{}}

const CustomersProductsBillsReducer = (state=initialDataReport,action) =>{
switch(action.type){
    case "CUTOMERS_FETHCED":{
        return {...state,customers:action.payload}
    }
    case "PRODUCTS_FETHCED":{
        return {...state,products:action.payload}
    }
    case "BILLS_FETHCED":{
        return {...state,bills:action.payload}
    }
    case "ACCOUNT_FETHCED":{
        return {...state,account:action.payload}
    }
    case "BILLINGCUSTOMER":{
        return {...state,billingCustomer:action.payload}
    }
    default:{
        return state
    }
}
}
export default CustomersProductsBillsReducer