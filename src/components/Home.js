import React, { useEffect } from 'react'
import {Carousel} from "antd"
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

            <Carousel autoplaySpeed={4000} autoplay effect="fade" style={{backgroundColor:"white"}} draggable >
                <div className="img_box" >
                    <div className="img_box_text">
                        <h1 className="textH1">Point Of Sale</h1>
                        <p className="textP">The POS system is bridged solution for managing online and physical store inventory</p>
                    </div>
                    <img className="img1" src="/assets/Home1.png" width={"100%"} alt="img"/>
                </div>

                <div className="img_box">
                    <img className="img2"  src="/assets/Home2.png" width={"100%"}  alt="img"/>
                    <div className="img_box_text2">
                        <p className="textP2">Stock Control & Mapping</p>
                        <p className="textP2" style={{justifyContent:"flex-end"}}>Manage Your Purchases & Transfers</p>
                        <p className="textP2">Smart Reciepts,Reports and More...</p>
                    </div>
                </div>
             </Carousel>           

    )
}

export default Home
