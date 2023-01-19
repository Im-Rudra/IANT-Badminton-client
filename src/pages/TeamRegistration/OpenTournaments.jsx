import { Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TournamentCard from '../../components/TournamentCard';
import { getToken } from '../../utils/utils';
import NoTournament from './NoTournament';

const OpenTournaments = () => {
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);

  const getTournament = () => {
    setLoading(true);
    axios
      .post(process.env.REACT_APP_SERVER_ORIGIN + 'getTournament', null, {
        headers: {
          Authorization: getToken()
        }
      })
      .then((res) => res.data)
      .then((data) => {
        setTournament(data);
        setLoading(false);
        // console.log(data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getTournament();
  }, []);

  // console.log(tournament);
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
      {tournament?._id ? (
        <TournamentCard
          tournament={tournament}
          link={tournament._id}
          buttonTitle="Team Registration"
        />
      ) : (
        <NoTournament title="No tournament" subTitle="No tournament found for team registration." />
      )}
    </div>
  );
};

export default OpenTournaments;
