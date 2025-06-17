import { useEffect, useState } from "react";
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

  return (
    <div className="device_row">
      <img src={singleDevice?.photo} alt={device.title} />
      <div className="device-info">
        <h4>Titolo: {device.title}</h4>
        <p>Category: {device.category}</p>
      </div>
    </div>
  );
};

export default ComponentDevice;
