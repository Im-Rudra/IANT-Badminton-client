import { Button, Card, Col, Row, Statistic, Tag } from "antd";
import React from "react";
import { RiTeamFill } from "react-icons/ri";
import { IoPeople } from "react-icons/io5";
import { HiUser } from "react-icons/hi";
import { Link } from "react-router-dom";
import { FiDownload } from "react-icons/fi";
import moment from "moment/moment";
import { toast } from "react-toastify";
import axios from "axios";
import { getToken } from "../utils/utils";

const TournamentCard = ({
  tournament,
  buttonTitle,
  link,
  handlers,
  isAdmin = false,
}) => {
  const toggleTournamentStatus = (id, tournament) => {
    const confirm = window.confirm(
      `Do you want to ${tournament.status === "Open" ? "close" : "reopen"} the tournament?`,
    );
    if (!confirm) return;
    const status = tournament.status === "Open" ? "Closed" : "Open";
    handlers.handleCloseTournament(id, status);
  };

  const downloadExcel = async (id) => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_ORIGIN + `export-excel/${id}`,
        {
          responseType: "blob",
          headers: {
            Authorization: getToken(),
          },
        },
      );
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      const now = moment();
      const fileName = `${tournament.tournamentName.split(" ").join("_")}_${now.format(
        "YYYY-MM-DD_hh-mm-ss",
      )}.xlsx`;
      link.download = fileName;
      link.click();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Card
      style={{
        marginTop: 16,
      }}
      bodyStyle={{
        paddingBottom: 10,
      }}
      title={tournament.tournamentName}
      extra={
        <>
          <Tag color={tournament.status === "Open" ? "green" : "red"}>
            {tournament.status}
          </Tag>
          <Link to={link}>
            <Button type="primary">{buttonTitle}</Button>
          </Link>
          {isAdmin && (
            <Button
              className={`ml-2 hover:opacity-80 ${
                tournament.status === "Open"
                  ? "!bg-red-600/80"
                  : "!bg-green-500/80"
              }`}
              type="primary"
              onClick={() => toggleTournamentStatus(tournament._id, tournament)}
            >
              {tournament.status === "Open" ? "Close" : "Open"}
            </Button>
          )}
          <Button
            className="ml-2 hover:opacity-80"
            type="primary"
            onClick={() => downloadExcel(tournament._id)}
          >
            Download
          </Button>
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
                color: "#3f8600",
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
                color: "#cf1322",
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
                color: "rgb(19, 25, 207)",
              }}
              prefix={<IoPeople style={{ marginBottom: -3 }} />}
              // suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <div className="text-right text-gray-400 text-xs mt-2">
        by -{" "}
        {`${tournament?.creator.firstName} ${tournament?.creator.lastName}`}
      </div>
    </Card>
  );
};

export default TournamentCard;
