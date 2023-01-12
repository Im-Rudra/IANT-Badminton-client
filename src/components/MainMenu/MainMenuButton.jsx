import React from 'react';
import { NavLink } from 'react-router-dom';

const MainMenuButton = ({ config }) => {
  const { title, url } = config;
  return (
    <NavLink
      to={url}
      className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
      aria-current="page"
    >
      {title}
    </NavLink>
  );
};

export default MainMenuButton;
