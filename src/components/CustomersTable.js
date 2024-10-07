import React, { useCallback, useMemo } from "react";
import { Link, Route, useHistory } from "react-router-dom";
import { Table, Space, Breadcrumb, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { removeCustomer } from "../Actions/CustomersProductsBillsActions";
import { useDispatch, useSelector } from "react-redux";
import CustModal from "./CustModal";
import PopConfirm from "./PopConfirm";

function CustomersTable(props) {
  const { data } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const bills = useSelector((state) => state.BusinessData.bills);
  const Customers = useSelector((state) => state.BusinessData.customers);

  const TotalBills = useCallback((id) => {
    return bills.filter((bill) => {
      return bill.customer === id;
    }).length;
  }, [bills])
  const columns = [
    { title: "S.no", dataIndex: "key", width: 100 },
    {
      title: "Customer",
      children: [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Mobile", dataIndex: "mobile", key: "mobile" },
      ],
    },
    {
      title: "Bills",
      dataIndex: "bills",
      sorter: {
        compare: (a, b) => a.bill - b.bill,
      },
    },
    { title: "Details", dataIndex: "details" },
    { title: "Edit / Remove", dataIndex: "edit" },
  ];
  const tableData = useMemo(() => {
    return [...data].reverse().map((cust, i) => {
      return {
        key: i + 1,
        name: cust.name,
        mobile: cust.mobile,
        bill: TotalBills(cust._id),
        bills: (
          <>
            {TotalBills(cust._id)}
            <Link to={`/main/billlist/${cust._id}`}>
              <Breadcrumb.Separator children={"-"} />
              view bills
            </Link>
          </>
        ),
        details: <Link to={`/main/customers/custmodal/${cust._id}`}>View</Link>,
        edit: (
          <Space size="large" style={{ padding: "0 0 0 25px " }}>
            <EditOutlined
              onClick={() => history.push(`/main/customersform/${cust._id}`)}
            />
            <Breadcrumb.Separator />
            <PopConfirm
              title="Are you sure to delete this?"
              onConfirm={(e) => {
                dispatch(removeCustomer(cust._id));
                message.success("Successfully deleted");
              }}
              onCancel={(e) => {
                message.error("cancelled");
              }}
              okText="Yes"
              cancelText="No"
            >
                
              <DeleteOutlined className="delete" />
            </PopConfirm>
          </Space>
        ),
      };
    });
  }, [TotalBills, data, dispatch, history]);

  const footer = () => (
    <div
      style={{
        fontWeight: "bold",
        fontSize: "30px",
        letterSpacing: "2px",
        fontVariant: "small-caps",
      }}
    >
      Total Customers:{Customers.length}
    </div>
  );
  return (
    <>
      <Table
        columns={columns}
        bordered
        dataSource={tableData}
        scroll={{ y: "380px" }}
        footer={footer}
        pagination={true}
      />
      <Route path="/main/customers/custmodal/:id" exact component={CustModal} />
    </>
  );
}

export default CustomersTable;
