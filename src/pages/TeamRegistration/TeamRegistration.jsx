import { Button, Card, Divider, Form, Input, Modal, Radio, Result, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import { getToken } from '../../utils/utils';
import TermsAndRules from './TermsAndRules';
import { regConfirmMessage } from '../../constants';

const TeamRegistration = () => {
  const { user } = useAuth();
  const { tournamentID } = useParams();
  const [loading, setLoading] = useState(true);
  const [teamType, setTeamType] = useState(null);
  const navigate = useNavigate();

  const [verdictObj, setVerdictObj] = useState(null);
  const [accept, setAccept] = useState(false);

  const checkRegistrablity = () => {
    try {
      if (!user) {
        return;
      }
      const checkDoc = {
        userID: user?.id,
        tournament: tournamentID
      };
      setLoading(true);
      axios
        .post(process.env.REACT_APP_SERVER_ORIGIN + 'checkTeamRegistrablity', checkDoc, {
          headers: {
            Authorization: getToken()
          }
        })
        .then((res) => {
          const { data } = res;
          if (data?.error) {
            if (res.data?.redirect) {
              toast.error(res.data.message);
              navigate(res.data.redirect);
            }
            setLoading(false);
            return toast.error(data.error.message);
          }
          setLoading(false);
          setVerdictObj(data);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.message);
          console.log(err.message);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkRegistrablity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(user)]);

  const teamRegisterRequest = (val) => {
    setLoading(true);
    axios
      .post(process.env.REACT_APP_SERVER_ORIGIN + 'teamRegistration', val, {
        headers: {
          Authorization: getToken()
        }
      })
      .then((res) => {
        if (res.data.error) {
          setLoading(false);
          if (res.data.error) {
            toast.error(res.data.message);
            if (res.data?.redirect) {
              navigate(res.data.redirect);
            }
          }
        }
        if (res.data._id) {
          setLoading(false);
          toast.success('Team registration successful');
          Modal.success({
            title: `${val.teamType} team registration successful`,
            content: regConfirmMessage(res.data.tournament)[val.teamType],
            onOk: () => {
              navigate('/my-registration');
            }
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response.data);
      });
  };

  let teamRegDoc;

  const onFinish = (values) => {
    teamRegDoc = {
      ...values,
      tournament: tournamentID
    };
    teamRegisterRequest(teamRegDoc);
  };

  if (verdictObj?.Single && verdictObj?.Double) {
    return (
      <Result
        status="error"
        title="You are not eligible for team registration"
        subTitle="You've already registered your teams as single player team and Double player team"
        extra={[
          <Link to="/" key="home">
            <Button type="primary">Go Home</Button>
          </Link>
        ]}
      />
    );
  }

  return (
    <div>
      {loading && (
        <div
          style={{ minHeight: 'calc(100vh - 170px)', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
          className="fixed top-0 left-0 h-screen w-full flex justify-center items-center z-50"
        >
          <Spin size="large" />
        </div>
      )}
      {!accept ? (
        <TermsAndRules setAccept={setAccept} />
      ) : (
        <>
          <h2 className="text-2xl text-center">Register Your Team</h2>
          <div className="mx-auto">
            <div className="flex justify-center mt-3">
              <Card
                style={{
                  minWidth: 300,
                  padding: '0 10px'
                }}
              >
                <Form name="teamRegistration" onFinish={onFinish} layout="vertical">
                  <Form.Item
                    label="Team Name"
                    name="teamName"
                    rules={[
                      {
                        required: true,
                        message: 'Team name is required'
                      }
                    ]}
                  >
                    <Input placeholder="Team Name" />
                  </Form.Item>

                  {/* team type */}
                  <Form.Item
                    label="Team type"
                    name="teamType"
                    rules={[
                      {
                        required: true,
                        message: 'Please select a team type'
                      }
                    ]}
                  >
                    <Radio.Group value={teamType} onChange={(e) => setTeamType(e.target.value)}>
                      <Radio.Button disabled={verdictObj?.Single} value="Single">
                        Single
                      </Radio.Button>
                      <Radio.Button disabled={verdictObj?.Double} value="Double">
                        Double
                      </Radio.Button>
                    </Radio.Group>
                  </Form.Item>

                  {/* Second player email */}
                  {teamType === 'Double' && (
                    <>
                      <Divider orientation="center">Second Player Info</Divider>
                      <Form.Item
                        label="Full Name"
                        name="fullName_2"
                        rules={[
                          {
                            required: true,
                            message: 'Name is required'
                          },
                          {
                            min: 2,
                            message: 'Must be 2 chars at least'
                          }
                        ]}
                      >
                        <Input type="text" placeholder="Second player full name" />
                      </Form.Item>
                      <Form.Item
                        label="Phone"
                        name="phone_2"
                        rules={[
                          {
                            required: true,
                            message: 'phone is required'
                          }
                        ]}
                      >
                        <Input type="text" placeholder="Second player phone" />
                      </Form.Item>
                    </>
                  )}

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TeamRegistration;
