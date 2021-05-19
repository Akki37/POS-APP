import React, { useEffect,useState }  from 'react'
import {Link} from "react-router-dom"
import {  useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import {Line} from "react-chartjs-2"
import {Card,Table,Statistic,Select} from "antd"
import {ArrowUpOutlined,ArrowDownOutlined} from "@ant-design/icons"
import "../stylesheets/DashBoard.css"
import swal from "@sweetalert/with-react";

function DashBoard(props) {
    let history = useHistory()
    const customers = useSelector(state => state.BusinessData.customers)
    const products = useSelector(state => state.BusinessData.products)
    const bills = useSelector(state => state.BusinessData.bills)
    const account = useSelector(state => state.BusinessData.account)

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

    const[option,setOption]=useState(new Date().getFullYear())
    const[graphData ,setGData]=useState([])
    const[monthData,setMData]=useState([])

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
        if(bills.length){
            monthlyData(option)
        }
       
    },[bills])

   const lastFiveBills=()=>{
       const result = [...bills].reverse().filter((bill,i)=>{
           return  i < 5
       })
       return result
   }
   const findCust=(id,type)=>{
    const result = customers.find((customer)=>{
        return customer._id === id
    })
    if(result){
        const value = type === "name" ? result.name : result.mobile
        return value
    }else{
        return "not found"
    }
  }
   const columns=[{title: 'S.no',dataIndex: 'key'},
   {title: "Customer" ,
           children:[{title: 'Name'  ,dataIndex: 'name',key: 'name'},
                     {title: 'Mobile',dataIndex: 'mobile',key: 'mobile'}]},
   {title: 'Items',dataIndex: 'items',width:100 },{title:"Date",dataIndex:"date"},
   {title: 'Total',dataIndex:'total',width:150}]

   const data = lastFiveBills().map((bill,i)=>{
       return {
             key   :i+1,
             name  :findCust(bill.customer,"name"),
             mobile: findCust(bill.customer,"mobile"),
             items :bill.lineItems.length,
             date  :new Date(bill.createdAt).toLocaleDateString(),
             total :bill.total
       }
   })
   const yestTotalAmount =()=>{
       let sum = 0
       let d = new Date
       let year = d.getFullYear()
       let month =d.getMonth() 
       let date = d.getDate()
       let dateObj = `${date-1}/${month<9 ? `0${month+1}`: month+1}/${year}`
       const Bills = [...bills]
       Bills.reverse().forEach((bill)=>{
           if( new Date(bill.createdAt).toLocaleDateString() === dateObj){
               sum += bill.total
           }
       })
       
       return sum
      
   }
   const TodayTotalAmount=()=>{
       let sum =0
       const Bills = [...bills]
       Bills.reverse().forEach((bill)=>{
           if(new Date(bill.createdAt).toLocaleDateString() === new Date().toLocaleDateString()){
               sum+=bill.total
           }
       })
       return sum
   }
   const monthlyData = (value) =>{
       let year = value ? value : new Date().getFullYear()
       let gDataObj=[]
       for(let i=0 ; i<months.length ;i++){
           let sum = 0
           bills.forEach((bill)=>{
               let d = new Date(bill.createdAt)
               if(d.getFullYear() === year){
                   if(d.getMonth() === i){
                       sum+=bill.total
                   }
               }
           })
           gDataObj=[...gDataObj,{label:months[i],monthId:i,value:sum}]
       }
       setGData([...gDataObj])
       setMData([...gDataObj])
   }
   const yearlyData=()=>{
    let beginyear = new Date(bills[0].createdAt).getFullYear()
    let currentYear = new Date().getFullYear()
    let gDataObj=[]
    for(let i=currentYear;i>=beginyear;i-- ){
        gDataObj.push(i)
    }
       return gDataObj
   }

   const perMonthData=(value,year)=>{
       const result = bills.filter((ele)=>{
           if(new Date(ele.createdAt).getFullYear() === year){
               return new Date(ele.createdAt).getMonth()=== value
           }
       })
       let gDataObj = []
       for(let i=1;i<=31;i++){
           let sum = 0
           result.forEach((bill)=>{
               let d = new Date(bill.createdAt).getDate()
               if(d === i){
                   sum+=bill.total
               }
           })
           gDataObj=[...gDataObj,{label:i,value:sum}]
       }
       setMData([...gDataObj])
   }

   const getData=(type)=>{
    if(type === "labels"){
        return monthData.map((data)=>{
            return data.label
        })
    }else{
        return monthData.map((data)=>{
            return data.value
        })
    }
    }

   const handleChange=(value)=>{
       setOption(value)
       monthlyData(value)
   }

   const handleSubChange=(value)=>{
       if(value){
    perMonthData(value,option)
       }else{
           monthlyData(option)
       }
    }


    return (
        <div className="dashboard">
                <div className="businessName">{account.businessName}</div>

                <div className="cardContainer">
                <Card title="Total Customers" extra={<Link to="/main/customers">View</Link>} className="cards" >
                    <span className="cardH1">{customers.length}</span>
                </Card>
                <Card title="Total Products" extra={<Link to="/main/products">View</Link>} className="cards" >
                    <span className="cardH1">{products.length}</span>
                </Card>
                <Card title="Bills Generated" extra={<Link to="/main/bills">View</Link>} className="cards" >
                    <span className="cardH1">{bills.length}</span>
                </Card>
                <Card className="cards" style={{width:"65%"}} >
                    <Select defaultValue={option} style={{ width: 120 }} onSelect={handleChange}>
                        {bills.length && yearlyData().map((ele,i)=>{
                            return <Select.Option key={i} value={ele}>{ele}</Select.Option>
                        })}
                    </Select>
                    <Select placeholder="Month" style={{ width: 120 }}  onSelect={handleSubChange}>
                        <Select.Option value="">Month</Select.Option>
                      {graphData.map((ele)=>{
                          return <Select.Option key={ele.monthId} value={ele.monthId}>{ele.label}</Select.Option>
                      })}
                    </Select>
                    <Line data={{labels: getData("labels"),
                                datasets: [{
                                            label: 'Sales Details',
                                            data: getData("values"),
                                            fill: false,
                                            backgroundColor: 'rgb(255,139,91)',
                                            borderColor: 'rgb(255,139,91,0.2)',
                                    }]}}/>
                </Card>
                <div style={{width:"30%"}} >
                <Card title="Analytics" className="cards" style={{width:"100%",marginBottom:"20px"}} >
                <Card>
                    <Statistic
                        title="Yesterday"
                        value={yestTotalAmount()}
                        valueStyle={{ color: yestTotalAmount() > TodayTotalAmount ? '#3f8600' : "red" }}
                        prefix={ yestTotalAmount() > TodayTotalAmount ? <ArrowUpOutlined/> : <ArrowDownOutlined/>}
                        suffix="/-"
                    />
                    </Card>
                    <Card>
                    <Statistic
                        title="Today"
                        value={TodayTotalAmount()}
                        valueStyle={{ color: yestTotalAmount() > TodayTotalAmount ? "red" : '#3f8600' }}
                        prefix={ yestTotalAmount() > TodayTotalAmount ? <ArrowDownOutlined/> : <ArrowUpOutlined/> }
                        suffix="/-"
                    />
                    </Card>
                </Card>
                
                </div>
                <Card title="Recent 5 Bills" extra={<Link to="/main/bills">View</Link>} className="cards" style={{width:"65%"}} >
                    <Table columns={columns} pagination={false} bordered dataSource={data} />
                </Card>
               
                </div>

        </div>
    )
}

export default DashBoard


 