import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Device } from "../types/common.types";
import "./ComponentDevice.styles.css";
import { GlobalContext } from "../context/GlobalContext";

const ComponentDevice = ({ device }: { device: Device }) => {
  //States
  const [singleDevice, setSingleDevice] = useState<Device | null>(null);
  //Context
  const { setDeviceToCompare, deviceToCompare, favourites, setFavourites } =
    useContext(GlobalContext);
  //Fetches
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

  const addDeviceToCompare = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const isIdPresent = deviceToCompare.includes(device.id);
    if (isIdPresent) {
      const filteredId = deviceToCompare?.filter(
        (el: number) => el !== device.id
      );
      setDeviceToCompare(filteredId);
    } else {
      setDeviceToCompare([...deviceToCompare, device.id]);
    }
  };

  console.log(deviceToCompare);

  return (
    <div className="device_row">
      <input type="checkbox" onChange={addDeviceToCompare} />
      <img
        src={singleDevice?.photo}
        alt={device.title}
        style={{ width: "200px" }}
      />
      <div className="device-info">
        <h4>{device.title}</h4>
      </div>
      <p>{device.category}</p>
      <button onClick={() => navigate(`/device/${device.id}`)}>
        Vai al Dettaglio
      </button>
      <button onClick={() => setFavourites(device.id)}>
        {favourites.includes(device.id)
          ? "Rimuovi dai preferiti"
          : "Aggiungi ai preferiti"}
      </button>
    </div>
  );
};

export default ComponentDevice;
