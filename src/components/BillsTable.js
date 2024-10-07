import React, { useMemo } from "react";
import { Route } from "react-router-dom";
import { Table } from "antd";
import BillModal from "./BillModal";
import { getBillsTableData } from "./helper";
import { useDispatch, useSelector } from "react-redux";

function BillsTable(props) {
  const { data } = props;
  const dispatch = useDispatch();
  const { bills, customers} = useSelector((state) => state.BusinessData);

  const tableData = useMemo(() => getBillsTableData(dispatch, data, customers), [data, customers, dispatch]);

  //   ---------------------------------------------------------------------------
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
      title: "Items",
      dataIndex: "items",
      sorter: {
        compare: (a, b) => a.items - b.items,
        multiple: 3,
      },
    },
    { title: "Details", dataIndex: "details" },
    {
      title: "Date",
      dataIndex: "date",
      sorter: {
        compare: (a, b) => a.millisec - b.millisec,
        multiple: 2,
      },
    },
    {
      title: "Total Amount",
      dataIndex: "total",
      sorter: {
        compare: (a, b) => a.total - b.total,
        multiple: 1,
      },
    },
    { title: "Remove", dataIndex: "remove" },
  ];

  const footer = () => (
    <div
      style={{
        fontWeight: "bold",
        fontSize: "30px",
        letterSpacing: "2px",
        fontVariant: "small-caps",
      }}
    >
      Total Bills:{bills.length}
    </div>
  );

  return (
    <>
      <Table
        columns={columns}
        bordered
        dataSource={tableData}
        footer={footer}
        pagination={true}
        scroll={{ y: "450px" }}
      />
      <Route path="/:string/:type/billmodal/:id" component={BillModal} />
    </>
  );
}

export default BillsTable;
