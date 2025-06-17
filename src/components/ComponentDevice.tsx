import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Device } from "../types/common.types";
import "./ComponentDevice.styles.css";

const ComponentDevice = ({ device }: { device: Device }) => {
  //States
  const [singleDevice, setSingleDevice] = useState<Device | null>(null);
  //fetches
  useEffect(() => {
    fetchFullDevice();
  }, [device]);

  const fetchFullDevice = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/smartphones/${device.id}`
      );
      if (!response.ok) {
        throw new Error("risposta non ok");
      }
      const data = await response.json();
      setSingleDevice(data.smartphone);
    } catch (err) {
      console.error(err);
    }
  };

  const navigate = useNavigate();

  return (
    <div
      className="device_row"
      onClick={() => navigate(`/device/${device.id}`)}
    >
      <img
        src={singleDevice?.photo}
        alt={device.title}
        style={{ width: "200px" }}
      />
      <div className="device-info">
        <h4>{device.title}</h4>
      </div>
      <p>{device.category}</p>
    </div>
  );
};

export default ComponentDevice;
