import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Divider, Form, Input, Modal, Radio, Result, Spin } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PopupRegistration from '../../components/PopupRegistration/PopupRegistration';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import TermsAndRules from './TermsAndRules';
import { getToken } from '../../utils/utils';

const regConfirmMessage = {
  Single: `Thank you for taking part in the IANT-Badminton Tournament!
  To finalize your registration, kindly pay your entry fee.
  The entry fee for a Single participant is $30.
  To finish your transaction, kindly use Zelle. Please Zelle to Md. Omar Faruk (214-414-6260).`,
  Double: `Thank you for taking part in the IANT-Badminton Tournament!
  To finalize your registration, kindly pay your entry fee.
  The entry fee for Double participants is $60.
  To finish your transaction, kindly use Zelle. Please Zelle to Md. Omar Faruk (214-414-6260).`
};

const TeamRegistration = () => {
  const { user } = useAuth();
  const { tournamentID } = useParams();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [teamType, setTeamType] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // const showDrawer = () => {
  //   setOpen(true);
  // };
  // const onClose = () => {
  //   setOpen(false);
  // };

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
            // console.log(data);
            // setVerdictObj(null);
            setLoading(false);
            return toast.error(data.error.message);
          }
          // console.log(data);
          setLoading(false);
          setVerdictObj(data);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.message);
          console.log(err.message);
        });
      // console.log(checkDoc);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkRegistrablity();
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
          // console.log('error', res.data);
          setLoading(false);
          // if (res.data.errorType === 'create-new-user') {
          //   return setOpen(true);
          // }
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
            content: regConfirmMessage[val.teamType],
            onOk: () => {
              navigate('/team-registration');
            }
          });
        }
        setLoading(false);
        // console.log(res.data);
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
    // console.log(teamRegDoc);
    teamRegisterRequest(teamRegDoc);
    // console.log(values);
  };
  // console.log(teamRegDoc);

  // const onPopRegReq = (values) => {
  //   console.log(values);
  // };
  const onCreate = (values) => {
    setOpen(false);
  };

  // console.log(email);

  // if (loading) {
  //   return (
  //     <div
  //       style={{ minHeight: 'calc(100vh - 170px)' }}
  //       className="flex justify-center items-center"
  //     >
  //       <Spin size="large" />
  //     </div>
  //   );
  // }

  if (verdictObj?.Single && verdictObj?.Double) {
    return (
      <Result
        status="error"
        title="You are not eligible for team registration"
        subTitle="You've already registered your teams as single player team and double player team"
        extra={[
          <Link to="/" key="home">
            <Button type="primary">Go Home</Button>
          </Link>
        ]}
      />
    );
  }

  // if (!accept && !loading) {
  //   return ;
  // }

  // console.log('ver', verdictObj);

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
                      {/* <Form.Item
                        label="Second Player"
                        name="secondPlayer"
                        rules={[
                          {
                            required: true,
                            message: 'second player email is required'
                          }
                        ]}
                      >
                        <Input
                          type="email"
                          placeholder="Second player email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Item> */}
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
                        <Input
                          type="text"
                          placeholder="Second player full name"
                          // value={email}
                          // onChange={(e) => setEmail(e.target.value)}
                        />
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
                        <Input
                          type="text"
                          placeholder="Second player phone"
                          // value={email}
                          // onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Item>
                    </>
                  )}

                  {/* Submit button */}
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </div>

            {/* <Button onClick={() => setOpen(true)} type="primary">
            open modal
          </Button> */}
            {/* <PopupRegistration
              open={open}
              setOpen={setOpen}
              onCreate={onCreate}
              teamRegDoc={teamRegDoc}
              registerFunction={teamRegisterRequest}
              onCancel={() => {
                setOpen(false);
              }}
            /> */}
          </div>
        </>
      )}

      {/* drawer */}
      {/* <div>
        <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
          New account
        </Button>
        <Drawer
          width={300}
          onClose={onClose}
          open={open}
          bodyStyle={{
            paddingBottom: 80
          }}
        >
          <Form name="register" onFinish={onPopRegReq} layout="vertical">
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: 'First name required'
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
                defaultValue={email}
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

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </div> */}
    </div>
  );
};

export default TeamRegistration;
