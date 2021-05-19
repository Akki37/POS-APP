import React, {  useState } from 'react'
import {  useSelector } from 'react-redux'
import {Input,Menu} from "antd"
import {SearchOutlined} from "@ant-design/icons"
import "../stylesheets/BillingProduct.css"
function BillingProduct(props) {
    const{BillingObjects} = props

    const[productName,setProductName]=useState("")
    const[searchProduct,setSearchProduct]=useState([])

    const BusinessData = useSelector(state => state.BusinessData)
    const products = BusinessData.products

    const handleChange=(e)=>{
          setProductName(e.target.value)
          if(e.target.value.length >0){
          const result = products.filter((product)=>{
              return product.name.toLowerCase().includes(e.target.value.toLowerCase())
          })
            setSearchProduct(result)
        }else{
            setSearchProduct([])
        }
    }
        return  (<div className="searchProd">
                <Input type="text" className="searchInput2"  name="product" value={productName} prefix={<SearchOutlined />} autoComplete="off" placeholder="Search product to add" onChange={handleChange}/>
                    {searchProduct.length ? 
                    <Menu className="prod_menu">
                    {searchProduct.map((product)=>{
                    return  <Menu.Item key={product._id} style={{borderBottom:"1px solid #e4e4e4e7"}}  onClick={()=>{setSearchProduct([]);
                            setProductName(""); BillingObjects(product,"1") }}>{product.name}/ Price : {product.price}
                            </Menu.Item>
                    })}
                </Menu>
                     : null}
                </div>
        )
}

export default BillingProduct
    