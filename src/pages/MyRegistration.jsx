import { LoadingOutlined } from '@ant-design/icons';
import { loadStripe } from '@stripe/stripe-js';
import { Alert, Badge, Button, Card, Modal, Result, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsFillPeopleFill } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { regConfirmMessage } from '../constants';
import { getToken } from '../utils/utils';
// import { FaDollarSign } from 'react-icons/fa6';

const MyRegistration = () => {
  const [myRegs, setMyRegs] = useState([]);
  const [delLoader, setDelLoader] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stripeLoading, setStripeLoading] = useState(false);

  const handleMyRegistrations = () => {
    axios
      .get(process.env.REACT_APP_SERVER_ORIGIN + 'myRegistrations', {
        headers: {
          Authorization: getToken()
        }
      })
      .then((res) => res.data)
      .then((data) => {
        setMyRegs(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteTeam = (teamId) => {
    setDelLoader((prev) => !prev);
    axios
      .post(
        process.env.REACT_APP_SERVER_ORIGIN + 'deleteTeam',
        { teamId: teamId },
        {
          headers: {
            Authorization: getToken()
          }
        }
      )
      .then((res) => res.data)
      .then((data) => {
        handleMyRegistrations();
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setDelLoader((prev) => !prev);
      });
  };

  useEffect(() => {
    handleMyRegistrations();
  }, []);

  const handleCreateStripeSession = async (teamId) => {
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
    setStripeLoading(true);
    axios
      .post(
        process.env.REACT_APP_SERVER_ORIGIN + 'create-checkout-session',
        { teamId },
        {
          headers: {
            Authorization: getToken()
          }
        }
      )
      .then((res) => res.data)
      .then((data) => {
        // console.log(data);
        if (!data.sessionId) {
          return;
        }
        const result = stripe.redirectToCheckout({
          sessionId: data.sessionId
        });
        console.log(result);
        if (result.error) {
          console.log(result.error);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setStripeLoading(false);
      });
  };

  const handlePaymentModal = (team) => {
    if (team?.paymentStatus === 'Verified') return;
    Modal.success({
      title: `${team.teamType} team registration instruction`,
      content: regConfirmMessage(team.tournament)[team.teamType],
      onOk: () => {
        return;
      }
    });
  };

  if (loading) {
    return (
      <div
        style={{ minHeight: 'calc(100vh - 170px)' }}
        className="flex justify-center items-center"
      >
        <Spin size="large" />
      </div>
    );
  }

  if (myRegs.length === 0) {
    return (
      <Result
        status="404"
        title="No Team Registered"
        subTitle="You haven't registered in any tournament yet. Go to Tournament Registration page."
        extra={
          <Link to="/team-registration">
            <Button type="primary">Tournament Registration</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="container">
      <p className="text-2xl text-center font-semibold">
        My Registrations {delLoader && <LoadingOutlined className="ml-5" />}
      </p>
      <div className="my-4">
        {myRegs.map((reg) => (
          <div key={reg._id} className="my-3">
            <Badge.Ribbon
              text={reg.paymentStatus === 'Unverified' ? 'Unverified' : 'Verified'}
              color={reg.paymentStatus === 'Verified' ? 'green' : 'red'}
            >
              <Card
                className="w-full"
                title={
                  <p className="text-xl font-semibold flex gap-4 items-center">
                    {reg.teamType === 'Single' ? (
                      <IoPerson className="inline" />
                    ) : (
                      <BsFillPeopleFill className="inline" />
                    )}
                    {reg.tournament.tournamentName}
                  </p>
                }
                bordered
              >
                <div className="text-lg">
                  <p>Team Type: {reg.teamType}</p>
                  <p>Team Name: {reg.teamName}</p>
                </div>
                {reg.paymentStatus !== 'Verified' && (
                  <div className="my-3">
                    <Alert
                      message={
                        <>
                          <span>
                            Pay{' '}
                            <span className="font-bold">
                              $
                              {reg.teamType === 'Single'
                                ? reg.tournament.singlePlayerEntryFee
                                : reg.tournament.doublePlayerEntryFee}
                            </span>{' '}
                            to verify your team
                          </span>
                          <p>
                            To finish your transaction, kindly use Zelle. Please Zelle to -<br />
                            <span className="text-base font-semibold">
                              Md. Omar Faruk (214-414-6260).
                            </span>
                          </p>
                        </>
                      }
                      type="info"
                      showIcon
                      // closable
                    />
                  </div>
                )}
                <div className="flex justify-end gap-2">
                  {reg.paymentStatus !== 'Verified' && (
                    <Button type="primary" danger onClick={() => handleDeleteTeam(reg._id)}>
                      <div className="flex items-center gap 2">
                        <FaTrashAlt className="mr-1" />
                        Delete Team
                      </div>
                    </Button>
                  )}
                  {reg.paymentStatus !== 'Verified' && (
                    <Button
                      type="primary"
                      onClick={() => handlePaymentModal(reg)}
                      loading={stripeLoading}
                    >
                      Pay $
                      {reg.teamType === 'Single'
                        ? reg.tournament.singlePlayerEntryFee
                        : reg.tournament.doublePlayerEntryFee}
                    </Button>
                  )}
                </div>
              </Card>
            </Badge.Ribbon>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRegistration;
