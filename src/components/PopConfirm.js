import React from 'react';
import { Popconfirm } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";

export default function PopConfirm(props) {
  const {
    onConfirm,
    onCancel,
    title = 'Are you sure to delete this?',
    okText = 'Yes',
    cancelText = 'No'
  } = props;
  return (
    <Popconfirm
      title={title}
      onConfirm={onConfirm}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
    >
      <DeleteOutlined className='delete' />
    </Popconfirm>
  );
}
