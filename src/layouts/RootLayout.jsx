import { Button, Typography } from 'antd';
import React, { useState } from 'react';
import { AiFillHome, AiOutlineUsergroupAdd } from 'react-icons/ai';
import { HiMenu } from 'react-icons/hi';
import { MdAdminPanelSettings, MdSpaceDashboard } from 'react-icons/md';
import { RiLoginBoxFill } from 'react-icons/ri';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import FloatingMenu from '../components/FloatingMenu/FloatingMenu';
import MainMenuButton from '../components/MainMenu/MainMenuButton';
import useAuth from '../hooks/useAuth';
import logo from '../img/logo.png';
import checkAccessiblity from '../utils/checkAccessiblity';
import { Tooltip } from 'antd';

const mainMenuLists = {
  generalMenuList: [
    {
      title: 'Home',
      url: '/',
      icon: <AiFillHome />
    }
  ],
  userMenuList: [
    // {
    //   title: 'Tournament Registration',
    //   url: 'team-registration',
    //   icon: <AiOutlineUsergroupAdd />
    // },
    {
      title: 'My Registration',
      url: 'my-registration',
      icon: <AiOutlineUsergroupAdd />
    }
  ],
  adminMenuList: [
    {
      title: 'Admin',
      url: 'admin',
      icon: <MdAdminPanelSettings />
    }
  ],
  antiUserMenuList: [
    {
      title: 'Sign Up',
      url: 'register',
      icon: <MdSpaceDashboard />
    },
    {
      title: 'Login',
      url: 'login',
      icon: <RiLoginBoxFill />
    }
  ]
};

const RootLayout = () => {
  const [collapse, setCollapse] = useState(false);
  const collapseHandler = () => setCollapse((prev) => !prev);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const closeHandler = () => setCollapse(false);

  const handleLogout = () => {
    localStorage.removeItem(process.env.REACT_APP_TOKEN_NAME);
    sessionStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <div>
      <div>
        <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
          <div className="container flex flex-wrap items-center justify-between mx-auto">
            <Link to="/" className="flex items-center">
              <img src={logo} className="h-10 lg:h-12 mr-3 sm:h-9" alt="Flowbite Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                IANT Badminton
              </span>
            </Link>
            <div className="flex items-center md:order-2">
              {user?.id && (
                <>
                  <Tooltip title={`${user.firstName} ${user.lastName}`} color='geekblue'>
                    <span
                      className={`
                        rounded-full
                        ring-2 ring-offset-1
                        w-8 h-8
                        flex items-center justify-center
                        bg-green-500
                        text-white
                        cursor-pointer
                      `}
                    >
                      {`${user.firstName[0]}${user.lastName[0]}`.toUpperCase()}
                    </span>
                  </Tooltip>
                  <Button onClick={handleLogout} type="primary" style={{ marginLeft: 10 }}>
                    Logout
                  </Button>
                </>
              )}
              <button
                onClick={collapseHandler}
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="inline-flex items-center p-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-sticky"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  >
                    <HiMenu className="text-3xl" />
                  </path>
                </svg>
              </button>
              <div id="targetEl" className="fixed right-2 top-16">
                <FloatingMenu onClose={closeHandler} collapse={collapse} menuList={mainMenuLists} />
              </div>
            </div>
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-sticky"
            >
              <ul className="flex flex-col gap-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                {/* Main menu here */}
                {mainMenuLists.generalMenuList.map((menu) => (
                  <li key={menu.url}>
                    <MainMenuButton config={menu} />
                  </li>
                ))}
                {checkAccessiblity('Administrator') &&
                  mainMenuLists.adminMenuList.map((menu) => (
                    <li key={menu.url}>
                      <MainMenuButton config={menu} />
                    </li>
                  ))}
                {checkAccessiblity('User') &&
                  mainMenuLists.userMenuList.map((menu) => (
                    <li key={menu.url}>
                      <MainMenuButton config={menu} />
                    </li>
                  ))}
                {!user?.id &&
                  mainMenuLists.antiUserMenuList.map((menu) => (
                    <li key={menu.url}>
                      <MainMenuButton config={menu} />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="pt-20 mx-auto container">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
