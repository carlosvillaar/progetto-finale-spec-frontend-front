import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import type { Device } from "../types/common.types";
import "./Favourites.styles.css";
import { useNavigate } from "react-router-dom";

const Favourites = () => {
  const basePath = import.meta.env.VITE_API_ENDPOINT!;
  //Context
  const { favourites, setFavourites } = useContext(GlobalContext);

  //Hooks
  const navigate = useNavigate();

  //States
  const [favouriteDevices, setFavouritesDevices] = useState<Device[] | null>(
    null
  );

  //Fetch
  const fetchFavourites = async () => {
    const promises = favourites?.map((el: number) =>
      fetch(`${basePath}/smartphones/${el}`)
    );
    const responses = await Promise.all(promises);

    const data = await Promise.all(responses.map((r) => r.json()));

    const devices = data.map((d) => d.smartphone);

    setFavouritesDevices(devices);
  };

  useEffect(() => {
    fetchFavourites();
  }, [favourites]);
  return (
    <>
      <h3>Pagina dei preferiti</h3>
      <div className="favourites-container">
        {favourites.length > 0 ? (
          favouriteDevices?.map((d) => (
            <div key={`fav-${d.id}`} className="favourites-card">
              <div className="card-img">
                <img src={`${basePath}${d.photo}`} alt={d.title} />
              </div>
              <div className="card-text">
                <p>{d.title}</p>
                <button onClick={() => setFavourites(d.id)}>
                  Rimuovi dai preferiti
                </button>
              </div>
            </div>
          ))
        ) : (
          <h4>Non sono presenti preferiti</h4>
        )}
        <div className="btn">
          <button onClick={() => navigate("/")}>Torna indietro</button>
        </div>
      </div>
    </>
  );
};

export default Favourites;
