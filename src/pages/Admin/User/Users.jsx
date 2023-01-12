import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import { getToken } from '../../../utils/utils';
const columns = [
  {
    title: 'First Name',
    width: 100,
    dataIndex: 'firstName',
    key: 'firstName',
    sorter: true,
    fixed: 'left'
  },
  {
    title: 'Last Name',
    width: 100,
    dataIndex: 'lastName',
    sorter: true,
    key: 'lastName'
    // fixed: 'left'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: 100
    // fixed: 'left'
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
    width: 100
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    width: 70,
    filters: [
      {
        text: 'Admin',
        value: 'Administrator'
      },
      {
        text: 'Moderator',
        value: 'Moderator'
      },
      {
        text: 'User',
        value: 'User'
      }
    ]
  },
  {
    title: 'Action',
    key: 'action',
    fixed: 'right',
    width: 70,
    render: (e) => <a>action</a>
  }
];

const Users = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10
    }
  });

  const handleTableChange = (pagination, filters, sorter) => {
    const sortObj = sorter?.order ? { field: sorter?.field, order: sorter?.order } : null;
    const filterObj = filters?.role ? filters : null;

    setTableParams({
      pagination,
      filters: filterObj,
      sorter: sortObj
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setUsers([]);
    }
    // console.log({ pagination, filters, sorter });
  };

  const fetchUsers = async () => {
    const url = process.env.REACT_APP_SERVER_ORIGIN + 'getUsers';
    setLoading(true);
    try {
      const res = await axios.post(url, tableParams, {
        headers: {
          Authorization: getToken()
        }
      });
      if (!res.data?.totalUsers) {
        setTotalUsers(0);
        setUsers([]);
        setLoading(false);
        return;
      }
      const { data } = res;
      setTotalUsers(data?.totalUsers || 0);
      setUsers(data?.users.map((user) => ({ key: user.id, ...user })));
      setLoading(false);
    } catch (err) {
      setTotalUsers(0);
      setUsers([]);
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [JSON.stringify(tableParams)]);

  return (
    <Table
      columns={columns}
      dataSource={users}
      loading={loading}
      pagination={{ ...tableParams.pagination, total: totalUsers }}
      onChange={handleTableChange}
      scroll={{
        x: 1000,
        y: 300
      }}
    />
  );
};
export default Users;
