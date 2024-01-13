import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import axios from 'axios';
import { getToken } from '../../../utils/utils';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Teams = () => {
  const { tournamentID } = useParams();
  const [teams, setTeams] = useState([]);
  const [totalTeams, setTotalTeams] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10
    }
  });

  const verifyTeam = async (teamID) => {
    console.log(teamID);
    const url = process.env.REACT_APP_SERVER_ORIGIN + 'verifyTeamAdmin';
    setLoading(true);
    try {
      const res = await axios.post(
        url,
        { team: teamID, tournament: tournamentID, ...tableParams },
        {
          headers: {
            Authorization: getToken()
          }
        }
      );
      // console.log(res.data);
      // return;
      if (res.data.error) {
        toast.error(res.data.message);
        setLoading(false);
        return;
      }

      // if (res.data.length) {
      //   setTeams(res.data);
      //   setLoading(false);
      // }
      // console.log(res.data);
      // return;
      // if (!res.data?.totalTeams) {
      //   setTotalTeams(0);
      //   setTeams([]);
      //   setLoading(false);
      //   return;
      // }
      const { data } = res;
      // setTotalTeams(data?.totalTeams || 0);
      setTeams(data?.map((team) => ({ key: team._id, ...team })));
      toast.success('Team verification successful');
      setLoading(false);
    } catch (err) {
      setTotalTeams(0);
      setTeams([]);
      setLoading(false);
      console.log(err);
    }
  };

  const columns = [
    {
      title: 'Team Name',
      width: 100,
      dataIndex: 'teamName',
      key: 'teamName',
      // sorter: true,
      fixed: 'left'
    },
    {
      title: 'Team Type',
      width: 100,
      dataIndex: 'teamType',
      // sorter: true,
      key: 'teamType',
      // fixed: 'left',
      filters: [
        {
          text: 'Single',
          value: 'Single'
        },
        {
          text: 'Double',
          value: 'Double'
        }
      ]
    },
    {
      title: 'Player One',
      children: [
        {
          title: 'Name',
          dataIndex: 'fullName_1',
          key: 'fullName_1',
          width: 100
          // fixed: 'left'
        },
        {
          title: 'Phone',
          dataIndex: 'phone_1',
          key: 'phone_1',
          width: 100
          // fixed: 'left'
        }
      ]
    },
    {
      title: 'Player Two',
      children: [
        {
          title: 'Name',
          dataIndex: 'fullName_2',
          key: 'fullName_2',
          width: 100,
          render: (e) => e || 'N/A'
          // fixed: 'left'
        },
        {
          title: 'Phone',
          dataIndex: 'phone_2',
          key: 'phone_2',
          width: 100,
          render: (e) => e || 'N/A'
          // fixed: 'left'
        }
      ]
    },

    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      width: 100,
      render: (e) => <Tag color={e === 'Verified' ? 'green' : 'red'}>{e}</Tag>,
      filters: [
        {
          text: 'Verified',
          value: 'Verified'
        },
        {
          text: 'Unverified',
          value: 'Unverified'
        }
      ]
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 70,
      render: (_e, { _id, paymentStatus }) => (
        <>
          <Button
            color="green"
            disabled={paymentStatus === 'Verified'}
            onClick={() => verifyTeam(_id)}
          >
            Verify
          </Button>
          {/* <Button>Hello</Button> */}
        </>
      )
    }
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    const sortObj = sorter?.order ? { field: sorter?.field, order: sorter?.order } : null;
    console.log(filters);
    // const filterObj = filters?.paymentStatus ? filters : null;
    let filterObj = {};
    if (!filters?.paymentStatus && !filters?.teamType) {
      filterObj = null;
    } else if (filters?.paymentStatus) {
      filterObj.paymentStatus = filters.paymentStatus;
    } else if (filters?.teamType) {
      filterObj.teamType = filters.teamType;
    }
    console.log(filterObj);

    setTableParams({
      pagination,
      filters: filterObj,
      sorter: sortObj
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setTeams([]);
    }
    // console.log({ pagination, filters, sorter });
  };

  const fetchUsers = async () => {
    const url = process.env.REACT_APP_SERVER_ORIGIN + 'teams';
    setLoading(true);
    try {
      const res = await axios.post(
        url,
        { tournament: tournamentID, ...tableParams },
        {
          headers: {
            Authorization: getToken()
          }
        }
      );
      // console.log(res.data);
      // return;
      if (!res.data?.totalTeams) {
        setTotalTeams(0);
        setTeams([]);
        setLoading(false);
        return;
      }
      const { data } = res;
      setTotalTeams(data?.totalTeams || 0);
      setTeams(data?.teams.map((team) => ({ key: team._id, ...team })));
      setLoading(false);
    } catch (err) {
      setTotalTeams(0);
      setTeams([]);
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    // console.log('fetch teams');
  }, [JSON.stringify(tableParams)]);

  const clearFilters = () => {
    setTableParams({
      pagination: {
        current: 1,
        pageSize: 10
      },
      filters: null
    });
  };

  return (
    <>
      <Space
        style={{
          marginBottom: 16
        }}
      >
        <Button onClick={clearFilters}>Clear filters</Button>
      </Space>
      <Table
        title={() => <h1 className="font-bold text-xl">Teams</h1>}
        bordered
        size="small"
        columns={columns}
        dataSource={teams}
        loading={loading}
        pagination={{ ...tableParams.pagination, total: totalTeams }}
        onChange={handleTableChange}
        scroll={{
          x: 1000,
          y: 300
        }}
      />
    </>
  );
};
export default Teams;
