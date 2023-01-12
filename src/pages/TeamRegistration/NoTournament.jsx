import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const NoTournament = ({ title, subTitle, button, redirect }) => {
  return (
    <Result
      status="error"
      title={title || 'some title'}
      subTitle={subTitle || 'some subtitle'}
      extra={[
        <Link to={redirect || '/'} key={redirect || 'home'}>
          <Button type="primary">{button || 'Home'}</Button>
        </Link>
      ]}
    />
  );
};

export default NoTournament;
