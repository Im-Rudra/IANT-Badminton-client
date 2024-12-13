import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Card } from "antd";
import React, { useEffect, useRef, useState } from "react";
import "../../App.css";

import axios from "axios";
import Editor from "../../components/Editor/Editor";
import homeBanner from "../../img/home-banner.jpg";
import { getToken } from "../../utils/utils";
import moment from "moment/moment";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();
  const editor = useRef();
  const [homepageData, setHomepageData] = useState(null);
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_ORIGIN + "open-tournaments", {
        headers: {
          Authorization: getToken(),
        },
      })
      .then((data) => {
        setTournaments(data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="w-screen">
          {/* <h2 className="text-center text-2xl font-semibold mb-4">
            Open Tournaments
          </h2> */}
          <div className="container mx-auto grid grid-cols-1 mt-4">
            {tournaments.map((tournament) => (
              <div
                key={tournament._id}
                className="w-full bg-white p-6 rounded-xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.13)] transition-all duration-300 mb-6 border border-gray-100"
              >
                {/* Tournament Name Section */}
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-slate-800 tracking-tight hover:text-slate-700 transition-colors duration-300">
                    {tournament.tournamentName}
                  </h1>
                </div>

                <div className="flex items-center space-x-3 mb-4">
                  <div className="creator-badge w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center">
                    <span className="text-xl font-bold text-white">
                      {tournament.creator.firstName.charAt(0)}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-800">
                        {tournament.creator.firstName}{" "}
                        {tournament.creator.lastName}
                      </span>
                      <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                        Organizer
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>
                          {moment(tournament.startTime).format("MMM DD, YYYY")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description Section */}
                <div className="mb-6 p-4 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-100">
                  <pre className="text-gray-600 leading-relaxed">
                    {tournament.description}
                  </pre>
                </div>

                {/* Countdown Section */}
                <div className="mb-6 ring-2 ring-red-300 rounded-md ring-offset-1">
                  {moment(tournament.startTime).isAfter() ? (
                    <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 p-4 rounded-lg">
                      <p className="text-center text-sm font-medium text-gray-600 mb-2">
                        Registration Opens in
                      </p>
                      <CountdownTimer time={tournament.startTime} />
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 p-4 rounded-lg">
                      <p className="text-center text-sm font-medium text-gray-600 mb-2">
                        Registration Ends Within
                      </p>
                      <CountdownTimer time={tournament.endTime} />
                    </div>
                  )}
                </div>

                {/* Register Button */}
                <Link
                  to={
                    !user ? "/register" : `/team-registration/${tournament._id}`
                  }
                >
                  <Button
                    type="primary"
                    size="large"
                    disabled={moment(tournament.startTime).isAfter()}
                    className="w-full !h-12 !bg-gradient-to-r !from-blue-600 !to-indigo-600 hover:!from-blue-700
                    hover:!to-indigo-700 !border-0 !rounded-lg !font-medium !shadow-lg hover:!shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span>
                        {!user
                          ? "Create an account"
                          : "Get into the Tournament"}
                      </span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </div>
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

const TimeBlock = ({ value, label, hasChanged }) => (
  <div className="flex flex-col items-center">
    <div className={`bg-white w-full py-2 rounded-lg shadow-sm`}>
      <span
        className={`text-2xl font-bold text-gray-800 inline-block transition-transform duration-200 ${hasChanged ? "animate-number-jump" : ""}`}
      >
        {String(value).padStart(2, "0")}
      </span>
    </div>
    <span className="text-xs font-medium text-gray-500 mt-1">{label}</span>
  </div>
);

const CountdownTimer = ({ time }) => {
  const [timeLeft, setTimeLeft] = useState(
    moment.duration(moment(time).diff(moment())),
  );
  const [changedFields, setChangedFields] = useState({
    days: false,
    hours: false,
    minutes: false,
    seconds: false,
  });
  const prevTimeRef = useRef({
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = moment.duration(moment(time).diff(moment()));
      setTimeLeft(newTimeLeft);

      // Calculate total days including months and years
      const totalDays = Math.floor(newTimeLeft.asDays());
      console.log(totalDays);

      // Current values using total days instead of just the days part
      const currentValues = {
        days: totalDays,
        hours: newTimeLeft.hours(),
        minutes: newTimeLeft.minutes(),
        seconds: newTimeLeft.seconds(),
      };

      const changes = {
        days: prevTimeRef.current.days !== currentValues.days,
        hours: prevTimeRef.current.hours !== currentValues.hours,
        minutes: prevTimeRef.current.minutes !== currentValues.minutes,
        seconds: prevTimeRef.current.seconds !== currentValues.seconds,
      };

      setChangedFields(changes);

      // Reset animation flags after a short delay
      setTimeout(() => {
        setChangedFields({
          days: false,
          hours: false,
          minutes: false,
          seconds: false,
        });
      }, 200);

      prevTimeRef.current = currentValues;
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  // Calculate total days including months and years
  const totalDays = Math.floor(timeLeft.asDays());

  return (
    <div className="grid grid-cols-4 gap-2 text-center">
      <TimeBlock
        value={totalDays}
        label="Days"
        hasChanged={changedFields.days}
      />
      <TimeBlock
        value={timeLeft.hours()}
        label="Hours"
        hasChanged={changedFields.hours}
      />
      <TimeBlock
        value={timeLeft.minutes()}
        label="Minutes"
        hasChanged={changedFields.minutes}
      />
      <TimeBlock
        value={timeLeft.seconds()}
        label="Seconds"
        hasChanged={changedFields.seconds}
      />
    </div>
  );
};
