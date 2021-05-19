import React, { useEffect } from 'react'
import LinkContextContainer from './LinkContextContainer'
import SideNavBar from './SideNavBar'
import {Layout} from "antd"
import swal from '@sweetalert/with-react'
import { useHistory } from 'react-router'


function MainContainer(props) {
    let history = useHistory()
  useEffect(()=>{
      if(!localStorage.getItem("pos_token")){
          history.push("/login")
          swal({
            text:"Please Log-in first.",
            icon:"error",
            timer:1500,
            button:false
        })
      }
  },[])
    return (
        <div className="mainContainer_box">
            <Layout>
            <SideNavBar/>
            <LinkContextContainer/>
            </Layout>
        </div>
    )
}

export default MainContainer
