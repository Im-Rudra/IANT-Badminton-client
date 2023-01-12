import { Card, Form, Input, Button, DatePicker, notification } from 'antd';
import axios from 'axios';
import React from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getToken } from '../../../utils/utils';

const CreateTournament = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'Tournament creation successful!'
    });
  };

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
        toast.success('Tournament creation successful!');
        navigate('/admin/tournaments');
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onFinish = (values) => {
    const { limit, ...rest } = values;
    const resObj = {
      ...rest,
      startTime: new Date(Date.parse(new Date(limit[0]).toDateString())),
      endTime: new Date(Date.parse(new Date(limit[1]).toDateString()) + 86400000 - 1000)
    };
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
