import { Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TournamentCard from '../../../components/TournamentCard';
import { getToken } from '../../../utils/utils';
import NoTournament from '../../TeamRegistration/NoTournament';

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
    <div>
      {tournaments.length > 0 ? (
        tournaments.map((tournament, i) => {
          return (
            <TournamentCard
              key={tournament._id}
              tournament={tournament}
              link={`teams/${tournament._id}`}
              buttonTitle="Teams"
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
