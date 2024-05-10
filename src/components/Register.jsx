import React, { useState } from "react";
import "./Register.css";
import { PlusOutlined } from "@ant-design/icons";
import { register } from "../apiService/userApi";
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from "antd";
import "./Register.css";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [componentDisabled, setComponentDisabled] = useState(true);

  const handleRegister = async (email, password, name, lastName) => {
    console.log("userData: ", email, password, name, lastName);
    const response = await register(email, password, name, lastName);
    if (response.error) {
      console.error("Error al registrar usuario:", response.error);
    } else {
      console.log("Usuario registrado con exito:", response.data);
    }
  };

  return (
    <>
      <div className="container">
        {/* <Checkbox
          checked={componentDisabled}
          onChange={(e) => setComponentDisabled(e.target.checked)}
        >
          Form disabled
        </Checkbox> */}

        <Form
          name="form__container"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          // disabled={componentDisabled}
          style={{
            maxWidth: 600,
          }}
        >
          {/*         <Form.Item label='Checkbox' name='disabled' valuePropName='checked'>

          <Checkbox>Checkbox</Checkbox>
        </Form.Item> */}

          {/*         <Form.Item label='Radio'>

          <Radio.Group>
            <Radio value='apple'> Apple </Radio>
            <Radio value='pear'> Pear </Radio>
          </Radio.Group>
        </Form.Item> */}

          <Form.Item label="Name">
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>

          <Form.Item label="Last Name">
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Email">
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item label="Password">
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Select">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>

          {/*         <Form.Item label='TreeSelect'>
          <TreeSelect
            treeData={[
              {
                title: "Light",
                value: "light",
                children: [
                  {
                    title: "Bamboo",
                    value: "bamboo",
                  },
                ],
              },
            ]}
          />
        </Form.Item> */}

          {/*         <Form.Item label='Cascader'>

          <Cascader
            options={[
              {
                value: "zhejiang",
                label: "Zhejiang",
                children: [
                  {
                    value: "hangzhou",
                    label: "Hangzhou",
                  },
                ],
              },
            ]}
          />
        </Form.Item> */}

          <Form.Item label="Birthday">
            <DatePicker />
          </Form.Item>

          {/*         <Form.Item label='RangePicker'>
          <RangePicker />
        </Form.Item> */}

          {/*         <Form.Item label='InputNumber'>
          <InputNumber />
        </Form.Item> */}

          <Form.Item label="TextArea">
            <TextArea rows={4} />
          </Form.Item>

          {/*         <Form.Item label='Switch' valuePropName='checked'>
          <Switch />
        </Form.Item> */}

          <Form.Item
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload action="/upload.do" listType="picture-card">
              <button
                style={{
                  border: 0,
                  background: "none",
                }}
                type="button"
              >
                <PlusOutlined />
                <div
                  style={{
                    border: 0,
                    background: "none",
                  }}
                  type="button"
                >
                  Upload
                </div>
              </button>
            </Upload>
          </Form.Item>

          <Form.Item label="Button">
            <Button
              onClick={() => handleRegister(name, lastName, email, password)}
            >
              Create
            </Button>
          </Form.Item>

          {/*         <Form.Item label='Slider'>

          <Slider />
        </Form.Item> */}

          {/*         <Form.Item label='ColorPicker'>
          <ColorPicker />
        </Form.Item> */}
        </Form>
      </div>
    </>
  );
};

export default Register;
