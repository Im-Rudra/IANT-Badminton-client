import { LoadingOutlined } from '@ant-design/icons';
import { Alert, Badge, Button, Card } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsCurrencyDollar, BsFillPeopleFill } from 'react-icons/bs';
import { FaDollarSign, FaTrashAlt } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';
import { getToken } from '../utils/utils';
import { loadStripe } from '@stripe/stripe-js';
// import { FaDollarSign } from 'react-icons/fa6';

const MyRegistration = () => {
  const [myRegs, setMyRegs] = useState([]);
  const [delLoader, setDelLoader] = useState(false);
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
        // openNotificationWithIcon('success');
        // toast.success('Tournament creation successful!');
        // navigate('/admin/tournaments');
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
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
        // openNotificationWithIcon('success');
        // toast.success('Tournament creation successful!');
        // navigate('/admin/tournaments');
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
        console.log(data);
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
                  <p className="text-xl font-semibold">
                    {reg.tournament.tournamentName}{' '}
                    {reg.teamType === 'Single' ? (
                      <IoPerson className="inline" />
                    ) : (
                      <BsFillPeopleFill className="inline" />
                    )}
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
                        <span>
                          Pay <BsCurrencyDollar className="inline" />
                          <span className="font-bold">
                            {reg.teamType === 'Single'
                              ? reg.tournament.singlePlayerEntryFee
                              : reg.tournament.doublePlayerEntryFee}
                          </span>{' '}
                          to verify your team
                        </span>
                      }
                      type="warning"
                      showIcon
                      // closable
                    />
                  </div>
                )}
                <div className="flex justify-end gap-2">
                  <Button type="primary" danger onClick={() => handleDeleteTeam(reg._id)}>
                    <div className="flex items-center gap 2">
                      <FaTrashAlt className="mr-1" />
                      Delete Team
                    </div>
                  </Button>
                  {reg.paymentStatus !== 'Verified' && (
                    <Button
                      type="primary"
                      onClick={() => handleCreateStripeSession(reg._id)}
                      loading={stripeLoading}
                    >
                      <FaDollarSign className="inline" />
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
