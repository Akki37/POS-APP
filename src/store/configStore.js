import {createStore , combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import CustomersProductsBillsReducer from "../reducers/CustomersProductsBillsReducer"
import networkErrorReducer from "../reducers/networkErrorReducer"
import register_loginReducer  from "../reducers/register_loginReducer"
import responseErrorReducer from "../reducers/responseErrorReducer"

function configStore() {
    const store = createStore(
    combineReducers(
        { status:register_loginReducer,
          networkError:networkErrorReducer,
          responseError:responseErrorReducer ,
          BusinessData : CustomersProductsBillsReducer }
                                            ),
    applyMiddleware(thunk))
    return store
}

export default configStore
