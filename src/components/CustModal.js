import React, { useEffect, useState } from 'react'
import {Modal} from "antd"
import { useHistory, useParams } from 'react-router'
import axios from 'axios'
import Draggable from 'react-draggable';

function CustModal(props) {
    const{id}= useParams()
    let history= useHistory()

    const[visible,setVisible]  =useState(true)
    const[disabled,setDisabled]=useState(true)
    const[customer,setCustomer]=useState({})
    const[bounds,setBounds]    =useState({ left: 0, top: 0, bottom: 0, right: 0 })

    const draggleRef = React.createRef()
   useEffect(()=>{
    axios.get(`https://dct-billing-app.herokuapp.com/api/customers/${id}`,
    {
        "headers":{
            "Authorization" : `Bearer ${localStorage.getItem("pos_token")}`
        }
    })
    .then((response)=>{
        setCustomer(response.data)
    })
    .catch((err)=>{
        alert(err.message)
    })
},[id])

function handleClose(){
    setVisible(false)
}
 const onStart = ( uiData) => {
    const { clientWidth, clientHeight } = window?.document?.documentElement;
    const targetRect = draggleRef?.current?.getBoundingClientRect();
    setBounds({
        left: -targetRect?.left + uiData?.x,
        right: clientWidth - (targetRect?.right - uiData?.x),
        top: -targetRect?.top + uiData?.y,
        bottom: clientHeight - (targetRect?.bottom - uiData?.y),
    });
}
    return (
        <Modal
          title={
          <div style={{ width: '100%',fontVariant:"small-caps",fontSize:"25px",letterSpacing:"2px" ,cursor: 'move',}}
          onMouseOver={() => {setDisabled(!disabled)}}
          onMouseOut ={() => {setDisabled(!disabled)}}>
            {customer.name}
          </div>}
            visible={visible}
            onOk={handleClose}
            onCancel={handleClose}
            afterClose={()=>{history.push("/main/customers")}}
            modalRender={modal => (
            <Draggable
              disabled={disabled}
              bounds={bounds}
              onStart={(event, uiData) => onStart(event, uiData)}
            >
              <div ref={draggleRef}>{modal}</div>
            </Draggable>
          )}
      >
       <ul>
           <li><b>Customer Id : </b>{customer._id}</li>
           <li><b>Mobile no. :</b>{customer.mobile}</li>
           <li><b>Email :</b>{customer.email}</li>
           <li><b>Added on :</b>{new Date(customer.createdAt).toLocaleDateString()}</li>
           <li><b>Updated on :</b>{new Date(customer.updatedAt).toLocaleDateString()}</li>
       </ul>
      </Modal>
    )
}

export default CustModal
