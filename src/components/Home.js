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
            {/* <Carousel autoplaySpeed={4000} className="carousel"   effect="fade" dots={{className:"dots"}}  draggable > */}
                <div className="img_box" style={{display:"flex"}} >
                    <div className="img_box_text">
                        <div className="text_box">
                        <span className="textH1">Point Of Sale</span>
                        <p className="textP">The POS system is bridged solution for managing online and physical store inventory</p>
                        </div>
                    </div>
                    <div className="img1" ><img className="IMG" src="/assets/home.svg" width={"100%"} alt="img"/></div>
                </div>

                {/* <div className="img_box">
                    <img className="img2"  src="/assets/Home2.png" width={"100%"}  alt="img"/>
                    <div className="img_box_text2">
                        <p className="textP2">Stock Control & Mapping</p>
                        <p className="textP2" style={{justifyContent:"flex-end"}}>Manage Your Purchases & Transfers</p>
                        <p className="textP2">Smart Reciepts,Reports and More...</p>
                    </div>
                </div> */}
             {/* </Carousel>      */}
             </div>      

    )
}

export default Home
