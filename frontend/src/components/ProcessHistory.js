import React, { useState, useEffect } from "react";
import { Table } from "antd";

function ProcessHistory() {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    let getDataSource = () => {
      let array = [];
      for (let i = 0; i < 10; i++) {
        array.push({
          key: i,
          name: "Mike",
          age: 32,
          address: "10 Downing Street",
        });
      }
      setDataSource(array);
    };
    getDataSource();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={{ pageSize: 5 }}
      scroll={{ scrollToFirstRowOnChange: true }}
    />
  );
}
export default ProcessHistory;
