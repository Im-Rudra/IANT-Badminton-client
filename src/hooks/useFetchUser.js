import axios from 'axios';
import { useEffect, useState } from 'react';
import { getToken } from '../utils/utils';

const useFetchUser = () => {
  const [user, setUser] = useState(null);
  const [rootLoading, setRootLoading] = useState(true);

  const fetchUser = () => {
    setRootLoading(true);
    axios
      .post(process.env.REACT_APP_SERVER_ORIGIN + 'getLoggedInUser', null, {
        headers: {
          Authorization: getToken()
        }
      })
      .then((res) => {
        // console.log(res.data);
        res?.data?.id && setUser(res.data);
        setRootLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setRootLoading(false);
        setUser(null);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    user,
    setUser,
    rootLoading,
    setRootLoading
  };
};

export default useFetchUser;
