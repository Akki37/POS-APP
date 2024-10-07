import React, { useEffect } from 'react'
import LinkContextContainer from './LinkContextContainer'
import SideNavBar from './SideNavBar'
import SweetAlert2 from 'react-sweetalert2';
import { useHistory } from 'react-router'
import "../stylesheets/MainContainer.css"


function MainContainer (props) {
  let history = useHistory()
  useEffect(() => {
    if (!localStorage.getItem("pos_token")) {
      history.push("/login")
      SweetAlert2({
        text:"Please Log-in first.",
        icon:"error",
        timer:1500,
        button:false
      })
    }
  }, [history]);
  return <div className="mainContainer_box">
    <SideNavBar/>
    <LinkContextContainer/>
  </div>;
}

export default MainContainer
