import { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
import Navbar from "../NavBar/NavBar";
import { LDRConfig } from "./sensorConfigs";
import Sensor from "../Sensor/Sensor";

const data = {
  sensorData: {
    sensorType: "photoresistor",
    sensorStatus: "Light",
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    sensorValue: 8000,
  },
};

const Dashboard = ({ history }) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    }

    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
        setTimeout(() => {
          history.push("/login");
        }, 3000);
      }
    };

    fetchPrivateDate();
  }, [history]);

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
      <Navbar history={history} />
      <div className="data">
        <Sensor sensorConfig={LDRConfig} sensorPayload={data} />
      </div>
    </>
  );
};

export default Dashboard;
