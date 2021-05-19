import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Route, useHistory } from "react-router";
import './App.css';
import { loginDone } from "./Actions/register_loginActions";
import Home from "./components/Home";
import LogIn from "./components/LogIn";
import NavBar from "./components/NavBar";
import RegisterForm from "./components/RegisterForm";
import MainContainer from "./components/MainContainer";
import { startFetchingAccount, startFetchingBills, startFetchingCustomers, startFetchingProducts } from "./Actions/CustomersProductsBillsActions";



function App(props) {
  const dispatch = useDispatch()
  const loggedin = useSelector(state => state.status.loggedin)
  useEffect(()=>{
    if(localStorage.getItem("pos_token")){
      dispatch(loginDone(true))
      dispatch(startFetchingCustomers())
      dispatch(startFetchingAccount())
      dispatch(startFetchingBills())
      dispatch(startFetchingProducts())
    }
  },[loggedin])
  return (
    <div className="App">
          <NavBar/>
          <Route path="/" exact component={Home}/>
          <Route path="/register"  component={RegisterForm}/>
          <Route path="/login"  component={LogIn}/>
          <Route path="/main" component={MainContainer}/>
    </div>
  );
}

export default App;
