import { Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TournamentCard from '../../../components/TournamentCard';
import { getToken } from '../../../utils/utils';
import NoTournament from '../../TeamRegistration/NoTournament';
import { toast } from 'react-toastify';

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const getTournaments = () => {
    axios
      .post(process.env.REACT_APP_SERVER_ORIGIN + 'getAllTournaments', null, {
        headers: {
          Authorization: getToken()
        }
      })
      .then((res) => res.data)
      .then((data) => {
        setTournaments(data);
        setLoading(false);
        // console.log(data);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err);
        toast.error(err.message);
      });
  };

  useEffect(() => {
    getTournaments();
  }, []);

  const handleCloseTournament = (id, status) => {
    setLoading(true);
    axios
      .put(
        `${process.env.REACT_APP_SERVER_ORIGIN}toggle-tournament-status/${id}`,
        { status },
        {headers: {
          Authorization: getToken()
        }}
      )
      .then((res) => res.data)
      .then((data) => {
        console.log('status: ', data.status);
        setTournaments((prev) =>
          prev.map((t) => (t._id === data._id ? { ...t, status: data.status } : t))
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
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

  return (
    <div>
      {tournaments.length > 0 ? (
        tournaments.map((tournament, i) => {
          return (
            <TournamentCard
              key={tournament._id}
              tournament={tournament}
              link={`teams/${tournament._id}`}
              buttonTitle="Teams"
              handlers={{ handleCloseTournament }}
              isAdmin={true}
            />
          );
        })
      ) : (
        <NoTournament
          title="No Tournament"
          subTitle="No tournament found, Through a tournament"
          redirect="create-tournament"
          button="Create"
        />
      )}
    </div>
  );
};

export default Tournaments;
