import React, { useState } from "react";
import "./Profile.css";
import { Button, Descriptions, Radio } from "antd";

const borderedItems = [
  {
    key: "1",
    label: "Product",
    children: "Cloud Database",
  },
  {
    key: "2",
    label: "Billing",
    children: "Prepaid",
  },
  {
    key: "3",
    label: "Time",
    children: "18:00:00",
  },
  {
    key: "4",
    label: "Amount",
    children: "$80.00",
  },
  {
    key: "5",
    label: "Discount",
    children: "$20.00",
  },
  {
    key: "6",
    label: "Official",
    children: "$60.00",
  },
  {
    key: "7",
    label: "Config Info",
    children: (
      <>
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1
        <br />
      </>
    ),
  },
];

const items = [
  {
    key: "1",
    label: "Product",
    children: "Cloud Database",
  },
  {
    key: "2",
    label: "Billing",
    children: "Prepaid",
  },
  {
    key: "3",
    label: "Time",
    children: "18:00:00",
  },
  {
    key: "4",
    label: "Amount",
    children: "$80.00",
  },
  {
    key: "5",
    label: "Discount",
    children: "$20.00",
  },
  {
    key: "6",
    label: "Official",
    children: "$60.00",
  },
];

const Profile = () => {
  const [size, setSize] = useState("default");
  const onChange = (e) => {
    console.log("size checked", e.target.value);
    setSize(e.target.value);
  };

  return (
    <div className="form-profile">
      {/* <Radio.Group onChange={onChange} value={size}>
        <Radio value="default">default</Radio>
        <Radio value="middle">middle</Radio>
        <Radio value="small">small</Radio>
      </Radio.Group>
      <br />
      <br /> */}

      <Descriptions
        bordered
        title="Custom Size"
        size={size}
        extra={<Button type="primary">Edit</Button>}
        items={borderedItems}
      />
      <br />
      <br />

      <Descriptions
        title="Custom Size"
        size={size}
        extra={<Button type="primary">Edit</Button>}
        items={items}
      />
    </div>
  );
};
export default Profile;