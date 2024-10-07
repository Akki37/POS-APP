import React, { useCallback, useMemo } from "react";
import { Link, Route, useHistory } from "react-router-dom";
import { removeProduct } from "../Actions/CustomersProductsBillsActions";
import { Table, Space, Breadcrumb, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import ProdModal from "./ProdModal";

function ProdcutsTable(props) {
  const { data = [] } = props;
  let history = useHistory();

  const dispatch = useDispatch();
  const Products = useSelector((state) => state.BusinessData.products);

  const columns = [
    { title: "S.no", dataIndex: "key", width: 100 },
    {
      title: "Product",
      children: [
        { title: "Name", dataIndex: "name", key: "name" },
        {
          title: "Price",
          dataIndex: "price",
          key: "price",
          sorter: {
            compare: (a, b) => a.price - b.price,
          },
        },
      ],
    },
    { title: "Details", dataIndex: "details", width: 100 },
    { title: "Edit / Remove", dataIndex: "edit_remove", width: 170 },
  ];
  const onConfirm = useCallback((e, prod) => {
    dispatch(removeProduct(prod._id));
    message.success("Successfully deleted");
  }, [dispatch]);
  const tableData = useMemo(() => {
    return data.reverse().map((prod, i) => {
      return {
        key: i + 1,
        name: prod.name,
        price: prod.price,
        details: <Link to={`/main/products/modal/${prod._id}`}>View</Link>,
        edit_remove: (
          <Space size="large" style={{ padding: "0 0 0 25px " }}>
            <EditOutlined
              onClick={() => history.push(`/main/productsform/${prod._id}`)}
            />
            <Breadcrumb.Separator />
            <Popconfirm
              title="Are you sure to delete this?"
              onConfirm={(e) => onConfirm(e, prod)}
              onCancel={(e) => {
                message.error("cancelled");
              }}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined className="delete" />
            </Popconfirm>
          </Space>
        ),
      };
    });
  }, [data, onConfirm, history]);

  const footer = () => (
    <div
      style={{
        fontWeight: "bold",
        fontSize: "30px",
        letterSpacing: "2px",
        fontVariant: "small-caps",
      }}
    >
      Total Products:{Products.length}
    </div>
  );
  return (
    <>
      <Table
        columns={columns}
        bordered
        dataSource={tableData}
        pagination={true}
        scroll={{ y: "380px" }}
        footer={footer}
      />
      <Route path="/main/products/modal/:id" component={ProdModal} />
    </>
  );
}

export default ProdcutsTable;
