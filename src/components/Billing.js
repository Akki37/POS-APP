import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Route, useHistory} from "react-router-dom"
import { addBill } from '../Actions/CustomersProductsBillsActions'
import BillingProduct from './BillingProduct'
import CustForminBilling from './CustForminBilling'
import {Table,Space,Breadcrumb,Button,Card} from "antd"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faRupeeSign} from "@fortawesome/free-solid-svg-icons"
import {DeleteOutlined,MinusOutlined,PlusOutlined} from "@ant-design/icons"
import BillModal from "./BillModal"
import "../stylesheets/Billing.css"
import swal from '@sweetalert/with-react'
function Billing(props) {
    const dispatch = useDispatch()
    const[addProduct,setAddProduct]=useState([])
    let history = useHistory()
    const billingCustomer = useSelector(state => state.BusinessData.billingCustomer)

    useEffect(()=>{
        if(!localStorage.getItem("pos_token")){
            history.push("/login")
            swal({
                title:"Please Log-in first.",
                icon:"error",
                timer:1500,
                button:false
            })
        }
    },[])

    function postBill(){
        const billObject={
                date:new Date().toLocaleDateString("en-ZA"),
            customer:billingCustomer._id,
           lineItems:LineItems()
        }
        dispatch(addBill(billObject,setAddProduct,posted))
    }
    function posted(id){
        let type = "billing"
        let string="main"
        history.push(`/${string}/${type}/billingmodal/${id}`)
    }
    function LineItems(){
        return addProduct.map((product)=>{
         return {product:product._id,quantity:product.quantity}})
    }
    function BillingObjects(Product,unit){
        if(addProduct.length<1){
            setAddProduct([{...Product,quantity:Number(unit)}])
        }else{
            let flag = false
            const result = addProduct.map((product)=>{
            if(Product._id === product._id){
                flag=true
                if(unit==="1"){
                    return {...product,quantity:product.quantity+1}
                    }else{
                    return {...product,quantity:product.quantity-1}
                    }
            }
            else{
                    return {...product}
            }
        })
        if(flag){
            setAddProduct(result)
        }else{
            setAddProduct([...result,{...Product,quantity:Number(unit)}])
        } 
    }
    }
    function removeProduct(id){
       const result = addProduct.filter((product)=>{
           return id !== product._id
       })
       setAddProduct(result)
    }

    function Quantity(props){
        const {prod} =props
        return <><button disabled={prod.quantity===1} className="quantityBtn" onClick={ ()=>{BillingObjects(prod,"-1")}}><MinusOutlined/></button>
                                        {prod.quantity}
                 <button className="quantityBtn"  onClick={()=> {BillingObjects(prod,"1")}}><PlusOutlined/></button>
        </>
    }
    const columns =[{title: 'S.no',dataIndex: 'key',width:100},
     {title: "Product" ,
             children:[{title: 'Name'  ,dataIndex: 'name',key: 'name'},
                       {title: 'Price',dataIndex: 'price',key: 'price'}]},
     {title: 'Quantity',dataIndex: 'quantity',width:200 },
     {title: 'Total',dataIndex:'total',width:200},
    
    ]

    const Data=()=>{ 
        const result = addProduct.map((product,i)=>{
        return {
                key     : i+1,
                name    : product.name,
                price   : product.price,
                unit    : product.quantity,
                quantity: (
                    <Space size="large" >
                     <Quantity prod={product} />
                    <Breadcrumb.Separator/>
                     <DeleteOutlined className="delete" onClick={()=>removeProduct(product._id)}/>
                    </Space> ),
                total   :`${product.quantity * product.price}/-`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            }
          })
          return result
        }
    return (
        <div>
            <CustForminBilling />
            <div className="search_N_Add">
            <BillingProduct   BillingObjects={BillingObjects}  Sno={addProduct.length}/>             
            </div>
            <Table columns={columns}  bordered dataSource={Data()} pagination={false} style={{maxHeight:"500px"}} scroll={{y:"500px"}}
             footer={pageData => {
                let totalItems = 0;
                let totalAmount = 0;
                let totalProducts = 0;
        
                pageData.forEach(({ unit,price }) => {
                  totalProducts += 1;
                  totalAmount += price * unit;
                  totalItems += unit;
                });
                return (
                    <div>
                        <div style={{display:"flex",justifyContent:"space-between",padding:"5px 20px"}}>
                        <div><b>Total Product : </b> {totalProducts}</div>
                        <div><b>Total Items : </b>{totalItems}</div>
                        <div colSpan="1"><b>Total Amount : <FontAwesomeIcon icon={faRupeeSign}/>  </b>{`${totalAmount}/-`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                        </div>
                        <hr style={{border:"1px solid gray",borderRadius:"50%"}}/>
                        <div style={{display:"flex",justifyContent:"flex-end"}} >
                        {!billingCustomer._id || !addProduct.length ? <Button type="ghost" >Generate Bill</Button> : <Button type="primary" onClick={postBill}>Generate Bill</Button>  }</div>
                    </div>
                    );
                }}
            />
           
            <Route path="/:string/:type/billingmodal/:id" exact component={BillModal}/>
          
        </div>
    )
}

export default Billing
