import { AppstoreAddOutlined, TeamOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import logo from '../img/logo.png';
const { Header, Content, Footer, Sider } = Layout;
const AdminLayout = () => {
  const [collapse, setCollapse] = useState(false);
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const location = useLocation();
  const activeMenu = location.pathname.split('/')[2];
  // console.log(location.pathname.split('/'));

  const adminMenuList = [
    {
      key: 'users',
      icon: <TeamOutlined />,
      label: <Link to="users">Users</Link>
    },
    {
      key: 'tournaments',
      icon: <AppstoreAddOutlined />,
      label: <Link to="tournaments">Tournaments</Link>
    }
  ];

  return (
    <Layout hasSider>
      <Sider
        theme="light"
        breakpoint="md"
        collapsedWidth="50"
        onBreakpoint={(broken) => {
          // console.log(broken);
          setCollapse(broken);
        }}
        onCollapse={(collapsed, type) => {
          // console.log(collapsed, type);
        }}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0
        }}
      >
        <div className="p-3">
          <Link to="/" className="flex items-center">
            <img src={logo} className="h-9 mr-3" alt="IANT Logo" />
            {!collapse && (
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                IANT
              </span>
            )}
          </Link>
        </div>
        <Menu
          // theme="dark"
          mode="inline"
          selectedKeys={activeMenu}
          items={adminMenuList}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: collapse ? 0 : 200
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            height: 50
          }}
        >
          {/* {collapse && <Button type="primary">U</Button>} */}
        </Header>
        <Content
          style={{
            margin: 12
          }}
        >
          <div
            className="ml-[50px] md:ml-0 p-4 min-h-screen"
            style={{
              background: colorBgContainer
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center'
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
