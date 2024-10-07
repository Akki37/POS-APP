import React from 'react';
import { Link } from 'react-router-dom';
import PopConfirm from './PopConfirm';
import { message } from 'antd';
import { removeBill } from '../Actions/CustomersProductsBillsActions';

export const getProductName = (id, products) => {
  const result = products.find((product) => {
    return product._id === id;
  });
  if (result) {
    return result.name;
  } else {
    return 'not found';
  }
};
export const getData = (data, products) => {
  return data.lineItems.map((item, i) => {
    return {
      key: i + 1,
      name: getProductName(item.product, products),
      price: item.price,
      quantity: item.quantity,
      subTotal: item.subTotal,
    };
  });
};
export const findCust = (id, type, customers) => {
  const result = customers.find((customer) => {
    return customer._id === id;
  });
  if (result) {
    const value = type === 'name' ? result.name : result.mobile;
    return value;
  } else {
    return 'not found';
  }
};
export const getBillsTableData = (dispatch, data, customers) => {
  let type = 'bills';
  let string = 'main';
  return [...data].reverse().map((bill, i) => {
    return {
      key: i + 1,
      name: findCust(bill.customer, 'name', customers),
      mobile: findCust(bill.customer, 'mobile', customers),
      items: bill.lineItems.length,
      details: (
        <Link to={`/${string}/${type}/billmodal/${bill._id}`}>view</Link>
      ),
      date: new Date(bill.createdAt).toLocaleDateString(),
      millisec: new Date(bill.createdAt).getTime(),
      total: bill.total,
      remove: (
        <PopConfirm bill={bill}
          onConfirm={(e) => {
            dispatch(removeBill(bill._id));
            message.success('Successfully deleted');
          }}
          onCancel={(e) => {
            message.error('cancelled');
          }}/>
      ),
    };
  });
};