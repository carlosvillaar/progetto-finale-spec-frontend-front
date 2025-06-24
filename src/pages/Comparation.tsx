import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useCompare } from "../hooks/useCompare";
import { type Device } from "../types/common.types";
import "./Comparation.styles.css";
import { useNavigate } from "react-router-dom";

const basePath = import.meta.env.VITE_API_ENDPOINT!;

const Comparation = () => {
  //Context
  const { favourites, setFavourites } = useContext(GlobalContext);
  //States
  const [devicesData, setDevicesData] = useState<Device[]>([]);

  //Hooks
  const data = useCompare(devicesData);
  const navigate = useNavigate();

  //Context
  const { deviceToCompare, resetDeviceToCompare } = useContext(GlobalContext);

  //Fetch
  const fetchDevices = async () => {
    const promises = deviceToCompare.map((el: number) =>
      fetch(`${basePath}/smartphones/${el}`)
    );

    const responses = await Promise.all(promises);

    const data = await Promise.all(responses.map((r) => r.json()));

    const devices = data.map((d) => d.smartphone);

    setDevicesData(devices);
  };

  //Effects
  useEffect(() => {
    deviceToCompare.length >= 2 ? fetchDevices() : null;
  }, [deviceToCompare]);

  return (
    <>
      <h3>Stai comparando questi {devicesData.length} device</h3>
      <button
        style={{ position: "absolute", top: "20px", right: "20px" }}
        onClick={() => navigate("/favourites")}
      >
        Preferiti
      </button>

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
      <div className="comparing-container">
        {devicesData.map((d: Device) => (
          <div className="comparing-card">
            <div className="comparing-image">
              <img src={`${basePath}${d.photo}`} alt={d.title} />
            </div>
            <h4>{d.title}</h4>

            <div className="chip-container">
              {data.best_price_minor === d.id ? (
                <div className="chip-succ">Prezzo più basso</div>
              ) : null}

              {data.best_price_major === d.id ? (
                <div className="chip-err">Prezzo più alto</div>
              ) : null}

              {data.best_storageOption === d.id ? (
                <div className="chip-succ"> Più opzioni di storage</div>
              ) : null}
              {data.best_battery_mAh_minor === d.id ? (
                <div className="chip-err"> Batteria meno potente</div>
              ) : null}
              {data.best_battery_mAh_major === d.id ? (
                <div className="chip-succ"> Batteria più potente</div>
              ) : null}
              {data.best_display_Inches_minor === d.id ? (
                <div className="chip-err"> Schermo più piccolo</div>
              ) : null}
              {data.best_display_Inches_major === d.id ? (
                <div className="chip-succ"> Schermo più grande</div>
              ) : null}
              {data.best_cpu_minor === d.id ? (
                <div className="chip-err"> Processore meno potente</div>
              ) : null}
              {data.best_cpu_major === d.id ? (
                <div className="chip-succ"> Processore più potente</div>
              ) : null}
              {data.best_features === d.id ? (
                <div className="chip-succ"> Più features</div>
              ) : null}
            </div>
            <button
              style={{ width: "100%", marginBlock: "20px" }}
              onClick={() => navigate(`/device/${d.id}`)}
            >
              Vai al dettaglio
            </button>
            <button onClick={() => setFavourites(d?.id)}>
              {favourites.includes(d?.id)
                ? "Rimuovi dai preferiti"
                : "Aggiungi ai preferiti"}
            </button>
            <div className="comparing-text">
              <p>
                <strong>Prezzo: </strong>
                {d.price}
              </p>
              <p>
                <strong>Capacità: </strong>
                {d.storageOptions.join(", ")}
              </p>
              <p>
                <strong>Batteria: </strong>
                {d.battery_mAh} mAh
              </p>
              <p>
                <strong>Pollici: </strong>
                {d.display_inches}"
              </p>
              <p>
                <strong>Processore: </strong>
                {d.cpu}
              </p>
              <p>
                <strong>Features: </strong>
                {d?.features?.join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Comparation;
