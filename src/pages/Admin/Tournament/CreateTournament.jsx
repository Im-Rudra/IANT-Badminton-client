import { Button, Card, DatePicker, Form, Input, notification } from 'antd';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getToken } from '../../../utils/utils';

const CreateTournament = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  // const openNotificationWithIcon = (type) => {
  //   api[type]({
  //     message: 'Tournament creation successful!'
  //   });
  // };

  const handleCreateTournament = (val) => {
    axios
      .post(process.env.REACT_APP_SERVER_ORIGIN + 'createTournament', val, {
        headers: {
          Authorization: getToken()
        }
      })
      .then((res) => res.data)
      .then((data) => {
        // openNotificationWithIcon('success');
        // if (data.error) {
        console.log(data);
        // return;
        // }
        toast.success('Tournament creation successful!');
        navigate('/admin/tournaments');
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Tournament creation failed!');
      });
  };

  const onFinish = (values) => {
    const { limit, singlePlayerEntryFee, doublePlayerEntryFee, ...rest } = values;
    const resObj = {
      ...rest,
      startTime: new Date(Date.parse(new Date(limit[0]).toDateString())),
      endTime: new Date(Date.parse(new Date(limit[1]).toDateString()) + 86400000 - 1000),
      singlePlayerEntryFee: Number(singlePlayerEntryFee),
      doublePlayerEntryFee: Number(doublePlayerEntryFee)
    };
    // console.log(resObj);
    // return;
    handleCreateTournament(resObj);
  };
  return (
    <div>
      {contextHolder}
      <h2 className="text-2xl text-center">Create Tournament</h2>
      <div className="mx-auto">
        <div className="flex justify-center mt-3">
          <Card
            style={{
              minWidth: 300,
              padding: '0 10px'
            }}
          >
            <Form name="createTournament" onFinish={onFinish} layout="vertical">
              <Form.Item
                label="Tournament Name"
                name="tournamentName"
                rules={[
                  {
                    required: true,
                    message: 'tournament name is required'
                  }
                ]}
              >
                <Input placeholder="Tournament Name" />
              </Form.Item>

              {/* Time limit */}
              <Form.Item
                label="Time limit"
                name="limit"
                rules={[
                  {
                    required: true,
                    message: 'time limit is required'
                  }
                ]}
              >
                <DatePicker.RangePicker format="DD MMM, YYYY" />
              </Form.Item>

              {/* entry fee */}
              <Form.Item
                label="Single Player Entry Fee"
                name="singlePlayerEntryFee"
                rules={[
                  {
                    required: true,
                    message: 'Entry Fee is required'
                  }
                ]}
              >
                <Input prefix="$" type="number" placeholder="Single Player Entry Fee" />
              </Form.Item>

              <Form.Item
                label="Double Player Entry Fee"
                name="doublePlayerEntryFee"
                rules={[
                  {
                    required: true,
                    message: 'Entry Fee is required'
                  }
                ]}
              >
                <Input prefix="$" type="number" placeholder="Double Player Entry Fee" />
              </Form.Item>

              {/* Tournament year */}
              <Form.Item
                label="Tournament year"
                name="tournamentYear"
                rules={[
                  {
                    required: true,
                    message: 'Tournament year is required'
                  }
                ]}
              >
                <DatePicker picker="year" />
              </Form.Item>

              {/* Payment phone number */}
              <Form.Item
                label="Payment phone number"
                name="paymentPhoneNumber"
                rules={[
                  {
                    required: true,
                    message: 'Payment phone number is required'
                  }
                ]}
              >
                <Input placeholder="Enter payment phone number..." />
              </Form.Item>

              {/* Description */}
              <Form.Item
                label="Tournament Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: 'Tournament description is required'
                  }
                ]}
              >
                <Input.TextArea rows={4} placeholder="Enter tournament description..." />
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
    </div>
  );
};

export default CreateTournament;
