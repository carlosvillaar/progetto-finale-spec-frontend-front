import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Device } from "../types/common.types";
import "./Detail.styles.css";
import { GlobalContext } from "../context/GlobalContext";

const basePath = import.meta.env.VITE_API_ENDPOINT!;

const Detail = () => {
  //Context
  const { favourites, setFavourites } = useContext(GlobalContext);

  const { resetDeviceToCompare } = useContext(GlobalContext);
  //Hooks
  const { id } = useParams();
  const navigate = useNavigate();

  //States

  const [device, setDevice] = useState<Device>();

  //Fetches

  const fetchDevice = async () => {
    try {
      const response = await fetch(`${basePath}/smartphones/${id}`);
      const data = await response.json();
      setDevice(data.smartphone);
    } catch (err) {
      console.error(err);
    }
  };

  //Effects
  useEffect(() => {
    fetchDevice();
  }, [id]);

  return (
    <>
      <div className="device-card">
        <button
          style={{ position: "absolute", top: "20px", right: "20px" }}
          onClick={() => navigate("/favourites")}
        >
          Preferiti
        </button>
        <div className="card-img">
          <img src={`${basePath}${device?.photo}`} alt={device?.title} />
        </div>
        <div className="card-text">
          <img
            src={`${basePath}${device?.brand.logo}`}
            alt={device?.brand.name}
            style={{ width: "30px", marginRight: "10px" }}
          />
          <span>{device?.brand.name}</span>
          <h4>{device?.title}</h4>{" "}
          <p>
            <strong>Prezzo:</strong> {device?.price}$
          </p>
          <p>
            <strong>Categoria:</strong> {device?.category}
          </p>
          <p>
            {" "}
            <strong>Colori disponibili:</strong>{" "}
            {device?.availableColors.join(", ")}
          </p>
          <p>
            <strong>Features: </strong>
            {device?.features.join(", ")}
          </p>
          <p>
            <strong>Pollici: </strong>
            {device?.display_inches}
          </p>
          <button
            onClick={() => {
              if (device?.id !== undefined) setFavourites(device.id);
            }}
          >
            {device?.id !== undefined && favourites.includes(device.id)
              ? "Rimuovi dai preferiti"
              : "Aggiungi ai preferiti"}
          </button>
        </div>
      </div>
      <div className="button">
        <button
          onClick={() => {
            navigate("/");
            resetDeviceToCompare();
          }}
        >
          Torna indietro
        </button>
      </div>
    </>
  );
};

export default Detail;
