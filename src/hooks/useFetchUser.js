import axios from 'axios';
import { useEffect, useState } from 'react';
import { getSession, getToken, setSession } from '../utils/utils';

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
        if (res.data.id) {
          setSession(res.data);
          setUser(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setRootLoading(false);
        setUser(null);
      })
      .finally(() => {
        setRootLoading(false);
      });
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setUser(null);
      setRootLoading(false);
      return;
    }
    const session = getSession();
    if (session?.id) {
      setUser(session);
      setRootLoading(false);
      return;
    }
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
