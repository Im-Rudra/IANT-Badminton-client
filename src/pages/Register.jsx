import { Button, Card, Form, Input } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import { getToken, setToken } from '../utils/utils';
const Register = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const registerRequest = (val) => {
    axios
      .post(process.env.REACT_APP_SERVER_ORIGIN + 'register', val, {
        headers: {
          Authorization: getToken()
        }
      })
      .then((res) => {
        const { data } = res;
        if (data?.error) {
          console.log(data?.message);
          return toast.error(data?.message);
        }
        if (data?.id) {
          setToken(res.headers['x-auth-token']);
          setUser(res.data);
          toast.success('User registration successful');
          navigate('/');
        }
        res.data?.id && setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setUser(null);
        console.log(err.message);
      });
  };

  const onFinish = (values) => {
    const regDoc = {
      ...values,
      remember: true
    };
    registerRequest(regDoc);
  };

  return (
    <div className="mx-auto">
      <div className="flex justify-center sm:mt-0 lg:mt-36">
        <Card
          style={{
            minWidth: 300,
            padding: '0 10px'
          }}
        >
          <Form name="register" onFinish={onFinish} layout="vertical">
            {/* Full name: First Name | Last Name */}
            <Form.Item noStyle>
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
                    message: 'At least 2 Charecters'
                  }
                ]}
                style={{
                  display: 'inline-block',
                  width: 'calc(50% - 8px)'
                }}
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
                    message: 'At least 2 Charecters'
                  }
                ]}
                style={{
                  display: 'inline-block',
                  width: 'calc(50% - 8px)',
                  marginLeft: '16px'
                }}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </Form.Item>

            {/* Email */}
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
              <Input type="email" placeholder="Input email" />
            </Form.Item>

            {/* Phone */}
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

            {/* Password */}
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!'
                },
                {
                  min: 6,
                  message: 'Password length must be atleast 6'
                }
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            {/* Submit button */}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};
export default Register;
