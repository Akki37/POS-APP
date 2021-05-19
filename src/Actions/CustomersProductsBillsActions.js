import axios from "axios"
// import configStore from "../store/configStore"
//---------------------------------Account Fetching-----------------------------------//
//------------------------------------------------------------------------------------//
// const store = configStore()
export const startFetchingAccount = () => {
    return dispatch => {
        axios.get("http://dct-billing-app.herokuapp.com/api/users/account",
            {
                "headers": {
                    "Authorization": `Bearer ${localStorage.getItem("pos_token")}`
                }
            })
            .then((response) => {
                const result = response.data
                dispatch(accountFetched(result))
                dispatch(account_net_error(""))
            })
            .catch((err) => {
                dispatch(account_net_error(err.message))
            })
    }
}
export const accountFetched = (n) => {
    return {
        type: "ACCOUNT_FETHCED",
        payload: n
    }
}
export const account_net_error = (n) => {
    return {
        type: "ACCOUNT_NET_ERROR",
        payload: n
        
    }
}
//----------------------------Customers Adding and Fetching----------------------------//
//------------------------------------------------------------------------------------//

export const startFetchingCustomers = () => {
    return (dispatch) => {
        axios.get("http://dct-billing-app.herokuapp.com/api/customers",
            {
                "headers": {
                    "Authorization": `Bearer ${localStorage.getItem("pos_token")}`
                }
            })
            .then((response) => {
                const result = response.data
                dispatch(customersFetched(result))
                dispatch(customers_net_error(""))
            })
            .catch((err) => {
                dispatch(customers_net_error(err.message))
            })
    }
}
export const customersFetched = (n) => {
    return {
        type: "CUTOMERS_FETHCED",
        payload: n
    }
}
export const customers_net_error = (n) => {
    return {
        type: "CUSTOMERS_NET_ERROR",
        payload: n
    }
}

    //-----------Edit Customer by Id-----------//
    export const EditCustomerBy_Id =(data,id,edited)=>{
    return dispatch=>{
    axios.put(`http://dct-billing-app.herokuapp.com/api/customers/${id}`,data,
    {
        "headers": {
            "Authorization": `Bearer ${localStorage.getItem("pos_token")}`
        }
    })
    .then((response)=>{
        console.log(response)
        dispatch(startFetchingCustomers())
        dispatch(customers_net_error(""))
        edited()

    })
    .catch((err)=>{
        dispatch(customers_net_error(err.message))
    })
    }
    }
          //-----------Add customer-----------//
export const addcustomer = (n,resetForm) => {
    return dispatch => {
        axios.post("http://dct-billing-app.herokuapp.com/api/customers",n,
            {
                "headers": {
                    "Authorization": `Bearer ${localStorage.getItem("pos_token")}`
                }
            })
            .then((response) => {
                const result =response.data
                dispatch(startFetchingCustomers())
                dispatch(addbillingCustomer(result))
                resetForm()
                dispatch(customers_net_error(""))
            })
            .catch((err) => {
                dispatch(customers_net_error(err.message))
            })
    }
}


           //-----------Remove customer-----------//
export const removeCustomer = (id) => {
    return dispatch => {
        axios.delete(`http://dct-billing-app.herokuapp.com/api/customers/${id}`,
            {
                "headers": {
                    "Authorization": `Bearer ${localStorage.getItem("pos_token")}`
                }
            })
            .then((response) => {
                dispatch(startFetchingCustomers())
                dispatch(customers_net_error(""))
            })
            .catch((err) => {
                dispatch(customers_net_error(err.message))
            })
    }
}
//-------------------------------Products Adding Fetching------------------------------//
//------------------------------------------------------------------------------------//


export const startFetchingProducts = () => {
    return dispatch => {
        axios.get("http://dct-billing-app.herokuapp.com/api/products",
            {
                "headers": {
                    "Authorization": `Bearer ${localStorage.getItem("pos_token")}`
                }
            })
            .then((response) => {
                const result = response.data
                dispatch(productsFetched(result))
                dispatch(products_net_error(""))
            })
            .catch((err) => {
                dispatch(products_net_error(err.message))
            })
    }
}
export const productsFetched = (n) => {
    return {
        type: "PRODUCTS_FETHCED",
        payload: n
    }
}
export const products_net_error = (n) => {
    return {
        type: "PRODUCTS_NET_ERROR",
        payload: n
    }
}

            //-----------Editproduct by Id-----------//
export const EditProductBy_Id =(data,id,edited)=>{
    return dispatch=>{
        axios.put(`http://dct-billing-app.herokuapp.com/api/products/${id}`,data,
        {
            "headers": {
                "Authorization": `Bearer ${localStorage.getItem("pos_token")}`
            }
        })
        .then((response)=>{
            dispatch(startFetchingProducts())
            dispatch(products_net_error(""))
            edited()
        })
        .catch((err)=>{
            dispatch(products_net_error(err.message))
        })
    }
}

            //-----------Add product-----------//
export const addProduct = (n,resetForm) => {
    return dispatch => {
        axios.post("http://dct-billing-app.herokuapp.com/api/products",n,
            {
                "headers": {
                    "Authorization": `Bearer ${localStorage.getItem("pos_token")}`
                }
            })
            .then((response) => {
                dispatch(startFetchingProducts())
                dispatch(products_net_error(""))
                resetForm()
            })
            .catch((err) => {
                dispatch(products_net_error(err.message))
            })
    }
}
          //-----------Remove Product-----------//
export const removeProduct = (id) => {
    return dispatch => {
        axios.delete(`http://dct-billing-app.herokuapp.com/api/products/${id}`,
            {
                "headers": {
                    "Authorization": `Bearer ${localStorage.getItem("pos_token")}`
                }
            })
            .then((response) => {
                console.log(response)
                dispatch(startFetchingProducts())
                dispatch(products_net_error(""))

            })
            .catch((err) => {
                dispatch(products_net_error(err.message))
            })
    }
}

//--------------------------------Bills Create Fetching--------------------------------//
//------------------------------------------------------------------------------------//
export const startFetchingBills = () => {
    return dispatch => {
        axios.get("http://dct-billing-app.herokuapp.com/api/bills",
            {
                "headers": {
                    "Authorization": `Bearer ${localStorage.getItem("pos_token")}`
                }
            })
            .then((response) => {
                const result = response.data
                dispatch(billsFetched(result))
                dispatch(bills_net_error(""))
            })
            .catch((err) => {
                dispatch(bills_net_error(err.message))
            })
    }
}
export const billsFetched = (n) => {
    return {
        type: "BILLS_FETHCED",
        payload: n
    }
}
export const bills_net_error = (n) => {
    return {
        type: "BILLS_NET_ERROR",
        payload: n
    }
}
             //-----------Add Bill-----------//
export const addBill = (n,setAddProduct,posted) => {
    return dispatch => {
        axios.post("http://dct-billing-app.herokuapp.com/api/bills", n,
            {
                "headers": {
                    "Authorization": `Bearer ${localStorage.getItem("pos_token")}`
                }
            })
            .then((response) => {
                dispatch(bills_net_error(""))
                dispatch((startFetchingBills()))
                dispatch(addbillingCustomer({}))
                setAddProduct([])
                posted(response.data._id)
            })
            .catch((err) => {
                dispatch(bills_net_error(err.message))
            })
    }
}
            //----------Add Billing Customer-----//
export const  addbillingCustomer = (n)=>{
    return {
        type:"BILLINGCUSTOMER",
        payload:n
    }
}
             //-----------Remove Bill-----------//
export const removeBill = (id) => {
    return dispatch => {
        axios.delete(`http://dct-billing-app.herokuapp.com/api/bills/${id}`,
            {
                "headers": {
                    "Authorization": `Bearer ${localStorage.getItem("pos_token")}`
                }
            })
            .then((response) => {
                console.log(response)
                dispatch(startFetchingBills())
                dispatch(bills_net_error(""))
            })
            .catch((err) => {
                dispatch(bills_net_error(err.message))
            })
    }
}