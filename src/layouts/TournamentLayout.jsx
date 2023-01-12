import React from 'react';
import { Menu } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
const TournamentLayout = () => {
  const location = useLocation();
  let currLocArr = location.pathname.split('/');
  const activeTab = currLocArr[currLocArr.length - 1];
  // console.log(location.pathname.split('tournament'));

  const tournamentMenuList = [
    {
      key: 'tournaments',
      label: <Link to="">Tournaments</Link>
    },
    {
      key: 'create-tournament',
      label: <Link to="create-tournament">Create Tournament</Link>
    }
  ];

  return (
    <div>
      <Menu mode="horizontal" selectedKeys={[activeTab]} items={tournamentMenuList} />
      <div className="py-6">
        <Outlet />
      </div>
    </div>
  );
};
export default TournamentLayout;
