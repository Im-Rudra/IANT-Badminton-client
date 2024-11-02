import { Button, Card, Col, Row, Statistic, Tag } from 'antd';
import React from 'react';
import { RiTeamFill } from 'react-icons/ri';
import { IoPeople } from 'react-icons/io5';
import { HiUser } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const TournamentCard = ({ tournament, buttonTitle, link, handlers, isAdmin = false }) => {

  const toggleTournamentStatus = (id, tournament) => {
    const confirm = window.confirm(`Do you want to ${tournament.status === "Open" ? "close" : "reopen"} the tournament?`);
    if (!confirm) return;
    const status = tournament.status === "Open" ? "Closed" : "Open";
    handlers.handleCloseTournament(id, status);
  };

  return (
    <Card
      style={{
        marginTop: 16
      }}
      bodyStyle={{
        paddingBottom: 10
      }}
      title={tournament.tournamentName}
      extra={
        <>
          <Tag color={tournament.status === 'Open' ? 'green' : 'red'}>{tournament.status}</Tag>
          <Link to={link}>
            <Button type="primary">{buttonTitle}</Button>
          </Link>
          {isAdmin && (
            <Button
              className={`ml-2 hover:opacity-80 ${
                tournament.status === 'Open' ? '!bg-red-600/80' : '!bg-green-500/80'
              }`}
              type="primary"
              onClick={() => toggleTournamentStatus(tournament._id, tournament)}
            >
              {tournament.status === 'Open' ? 'Close' : 'Open'}
            </Button>
          )}
        </>
      }
    >
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Teams"
              value={tournament.totalTeams}
              // precision={2}
              valueStyle={{
                color: '#3f8600'
              }}
              prefix={<RiTeamFill style={{ marginBottom: -3 }} />}
              // suffix="%"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Single Teams"
              value={tournament.singleTeams}
              // precision={2}
              valueStyle={{
                color: '#cf1322'
              }}
              prefix={<HiUser style={{ marginBottom: -3 }} />}
              // suffix="%"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Double Teams"
              value={tournament.doubleTeams}
              // precision={2}
              valueStyle={{
                color: 'rgb(19, 25, 207)'
              }}
              prefix={<IoPeople style={{ marginBottom: -3 }} />}
              // suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <div className="text-right text-gray-400 text-xs mt-2">
        by - {`${tournament?.creator.firstName} ${tournament?.creator.lastName}`}
      </div>
    </Card>
  );
};

export default TournamentCard;
