import React, { useState } from 'react';
import { Alert, Form, Input, Modal } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../utils/utils';

const PopupRegistration = ({ open, onCreate, onCancel, setOpen, registerFunction, teamRegDoc }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  console.log(teamRegDoc);

  const registrationReq = async (val) => {
    setLoading(true);
    axios
      .post(process.env.REACT_APP_SERVER_ORIGIN + 'register', val, {
        headers: {
          Authorization: getToken()
        }
      })
      .then((res) => {
        const data = res.data;
        // console.log(res.data);
        if (data?.error) {
          setLoading(false);
          return toast.error(data?.message);
        }
        if (data?.id) {
          setLoading(false);
          toast.success('Registration successful.');
          setOpen(false);
          registerFunction();
          // navigate('/');
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message || 'Something went wrong!');
        console.log(err);
      });
  };

  return (
    <Modal
      open={open}
      title="Register your second player"
      okText="Submit"
      cancelText="Cancel"
      onCancel={onCancel}
      confirmLoading={loading}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            const submitDoc = {
              ...values,
              password: '123456',
              remember: false
            };
            registrationReq(submitDoc);
            // form.resetFields();
            // toast('this is toast');
            // toast.success('Registration complete');
            // onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      {/* <Form
        form={form}
        layout="vertical"
        name="register"
        initialValues={{
          modifier: 'public'
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="modifier" className="collection-create-form_last-form-item">
          <Radio.Group>
            <Radio value="public">Public</Radio>
            <Radio value="private">Private</Radio>
          </Radio.Group>
        </Form.Item>
      </Form> */}
      {/* <ToastContainer /> */}
      {/* <Alert
        message="Second player is not registerd. Please register or use another email"
        type="error"
        showIcon
        closable
      /> */}
      <Form form={form} name="register" onFinish={onCreate} layout="vertical">
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: 'First name required'
            },
            {
              min: 2,
              message: 'At least 2 chars required'
            }
          ]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: 'Last name required'
            },
            {
              min: 2,
              message: 'At least 2 chars required'
            }
          ]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Email is required'
            }
          ]}
        >
          <Input
            type="email"
            placeholder="Input email"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: 'Phone is required'
            }
          ]}
        >
          <Input type="tel" placeholder="Input Phone" />
        </Form.Item>

        {/* <Form.Item>
          <Button type="primary" htmlType="submit" block loading>
            Submit
          </Button>
        </Form.Item> */}
      </Form>
      <Alert
        // message="Important"
        message="Default login password will be '123456'"
        type="warning"
        showIcon
      />
    </Modal>
  );
};

export default PopupRegistration;
