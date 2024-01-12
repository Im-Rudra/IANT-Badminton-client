import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getToken } from '../utils/utils';
import { Button, Result, Spin } from 'antd';

const Success = () => {
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('sessionId');
  const teamId = searchParams.get('teamId');
  const [error, setError] = useState();

  // const handleCheckPayment = () => {
  //   axios.post();
  // };

  const handleVerifyTeam = () => {
    try {
      if (!sessionId && !teamId) {
        throw new Error('team id or session id not provided');
      }
      // setLoading(true);
      axios
        .post(
          process.env.REACT_APP_SERVER_ORIGIN + 'verifyTeam',
          { teamId, sessionId },
          {
            headers: {
              Authorization: getToken()
            }
          }
        )
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          setError(error.response.data);
          console.log(error.response.data);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleVerifyTeam();
  }, []);

  // console.log(searchParams.get('sessionId'));

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

  if (error?.error) {
    return (
      <Result
        status="error"
        title="Wrong Url Parameters"
        subTitle="The success id is invalid, or the team is deleted"
        extra={[
          <Link to="/my-registration" key="my registration">
            <Button type="primary">My Registration</Button>
          </Link>
        ]}
      />
    );
  }

  return (
    <Result
      status="success"
      title="Verification Successful"
      subTitle="Your team is verified now. Seat back and Practice"
      extra={[
        <Link to="/my-registration" key="my registration">
          <Button type="primary">My Registration</Button>
        </Link>
      ]}
    />
  );
};

export default Success;
