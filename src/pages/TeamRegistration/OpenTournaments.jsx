import { Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TournamentCard from '../../components/TournamentCard';
import { getToken } from '../../utils/utils';
import NoTournament from './NoTournament';
import { toast } from 'react-toastify';

const OpenTournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTournaments = () => {
    setLoading(true);
    axios
      .get(process.env.REACT_APP_SERVER_ORIGIN + 'open-tournaments', {
        headers: {
          Authorization: getToken()
        }
      })
      .then((res) => res.data)
      .then((data) => {
        setTournaments(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message)
        console.log(err);
      });
  };

  useEffect(() => {
    getTournaments();
  }, []);

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
    <div className="container">
      {tournaments?.length ? (
        tournaments.map((t) => (
          <TournamentCard
            key={t._id}
            tournament={t}
            link={t._id}
            buttonTitle="Team Registration"
          />
        ))
      ) : (
        <NoTournament title="No tournament" subTitle="No tournament found for team registration." />
      )}
    </div>
  );
};

export default OpenTournaments;
