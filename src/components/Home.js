import React, { useEffect } from 'react'
import {Carousel} from "antd"
import {ArrowRightOutlined} from "@ant-design/icons"
import "../stylesheets/Home.css"
import { useHistory } from 'react-router'
function Home(props){
    let history=useHistory()
    useEffect(()=>{
         if(localStorage.getItem("pos_token")){
             history.push("/main/dashboard")
         }
    },[])
    return (
        <div className="carousel_fluid">
                <div className="img_box" style={{display:"flex"}} >
                    <div className="img_box_text">
                        <div className="text_box">
                        <span className="textH1">Point Of Sale</span>
                        <p className="textP">The POS system is bridged solution for managing online and physical store inventory</p>
                        </div>
                        <div className="cred_box">
                            <div className="dummyCred_box">
                                <div className="dummyText">Email : client123@gmail.com</div>
                                <div className="dummyText">Password : client123@</div>
                            </div>
                            <div className="dummyCredTitle">
                                Dummy credentials for testing
                            </div>
                        </div>
                    </div>
                    <div className="img1" ><img className="IMG" src="/assets/home.svg" width={"100%"} alt="img"/></div>
                </div>
             </div>      

    )
}

export default Home
