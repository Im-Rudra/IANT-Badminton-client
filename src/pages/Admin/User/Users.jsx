import { Button, Table, Tag } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';
import { getEnv, getToken } from '../../../utils/utils';


const Users = () => {
  const { user } = useAuth();
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

  const makeAdmin = async (user) => {
    if (user.role === "Administrator") return;
    const isConfirm = window.confirm(
      "Do you really want to make this user admin?\nThis process cannot be undone!"
    );
    if (!isConfirm) return;
    const url = `${getEnv('SERVER_ORIGIN')}make-admin/${user.id}`;
    setLoading(true);
    try {
      const res = await axios.put(url, tableParams, {
        headers: {
          Authorization: getToken()
        }
      });
      const newUser = res?.data;
      if (!newUser.role === "Administrator") {
        return toast.error("Something went wrong!");
      };

      setUsers((prev) => {
        const newUsers = prev.map((u) => {
          if (u.id !== user.id) return u;
          return {
            key: newUser.id,
            ...newUser
          }
        })
        return newUsers;
      })
    } catch (err) {
      toast.error(err.message)
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
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
    fetchUsers();
  }, [
    // JSON.stringify(tableParams),
    tableParams
  ]);

  const columns = [
    // {
    //   title: 'First Name',
    //   width: 100,
    //   dataIndex: 'firstName',
    //   key: 'firstName',
    //   sorter: true,
    //   fixed: 'left'
    // },
    // {
    //   title: 'Last Name',
    //   width: 100,
    //   dataIndex: 'lastName',
    //   sorter: true,
    //   key: 'lastName'
    //   // fixed: 'left'
    // },
    {
      title: 'Full Name',
      width: 100,
      key: 'name',
      sorter: true,
      fixed: 'left',
      render: (e) => {
        if (!e?.id) return null;
        const isMe = e.id === user.id;
        const name = `${e.firstName} ${e.lastName}`;
        return (
          <span>
            {!isMe && name}
            {isMe && (
              <Tag 
                color='blue' 
                title="It's me"
              >
                {name}
              </Tag>
            )}
          </span>
        )
      }
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
      render: (e) => {
        return (
          <Button
            onClick={() => makeAdmin(e)}
            type='primary'
            danger
            disabled={e.role === "Administrator" ? true : false}
          >
            {/* {e.role === "Administrator" ? "Already Admin" : "Make Admin"} */}
            Make Admin
          </Button>
        );
      }
    }
  ];

  return (
    <Table
      key={Date.now()}
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
