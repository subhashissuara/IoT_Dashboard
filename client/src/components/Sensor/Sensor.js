import React, { useEffect, useState } from "react";
import DataChart from "./DataChart";
import "./Sensor.css";
import classNames from "classnames";

const Sensor = ({ sensorConfig, sensorPayload }) => {
  const [deviceStatus, setDeviceStatus] = useState("Offline");
  const [indicatorClass, setIndicatorClass] = useState(
    classNames("indicator", "offline")
  );
  const [sensorStatus, setSensorStatus] = useState("Not Available");
  const [sensorLastUpdated, setSensorLastUpdated] = useState("Not Available");

  useEffect(() => {
    if (sensorPayload.sensorData) {
      setDeviceStatus("Online");
      setIndicatorClass(classNames("indicator", "online"));
      setSensorStatus(sensorPayload.sensorData.sensorStatus);
      setSensorLastUpdated(
        `${sensorPayload.sensorData.date} ${sensorPayload.sensorData.time}`
      );
    } else {
      setDeviceStatus("Offline");
      setIndicatorClass(classNames("indicator", "offline"));
      setSensorStatus("Not Available");
      setSensorLastUpdated("Not Available");
    }
  }, [sensorPayload]);

  return (
    <div className="sensor-container">
      <div className="sensor-text">
        <div className="sensor-text-heading">
          <h2>{sensorConfig.name}</h2>
        </div>
        <div className="sensor-text-content">
          <p>
            Device Status: {deviceStatus}
            <span className={indicatorClass}></span>
          </p>
          <p>Sensor Status: {sensorStatus}</p>
          <p>Sensor Last Updated: {sensorLastUpdated}</p>
        </div>
      </div>
      <div className="sensor-chart">
        <DataChart config={sensorConfig.chart} />
      </div>
    </div>
  );
};

export default Sensor;
