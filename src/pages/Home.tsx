import { useState, useEffect } from "react";
import type { Device, Filters } from "../types/common.types";
import ComponentDevice from "../components/ComponentDevice";
import FilterPanel from "../components/FilterPanel";
import "./Home.styles.css";
import { useNavigate } from "react-router-dom";

const defaultFilters: Filters = {
  title: "",
  category: "",
};

const Home = () => {
  //States
  const [devices, setDevices] = useState<Device[]>([]);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [growing, setGrowing] = useState<boolean>(false);

  //Hooks

  const navigate = useNavigate();

  //Effects
  useEffect(() => {
    fetchDevices();
  }, [filters]);

  //Fetches
  const fetchDevices = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/smartphones?search=${filters.title}&category=${filters.category}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("la risposta non è ok");
      }
      const data: Device[] = await response.json();
      setDevices(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSorting = (key: "category" | "title", orderType: boolean) => {
    const nextDevices: Device[] = devices.sort((a: any, b: any) => {
      switch (orderType) {
        case true: {
          const order = a[key].localeCompare(b[key]);
          setGrowing(!growing);
          return order;
        }
        case false: {
          const order = b[key].localeCompare(a[key]);
          setGrowing(!growing);
          return order;
        }
        default: {
          const order = a[key].localeCompare(b[key]);
          setGrowing(!growing);
          return order;
        }
      }
    });

    setDevices([...nextDevices]);
  };

  return (
    <>
      <div className="filter_container">
        <FilterPanel
          onReset={() => setFilters(defaultFilters)}
          onSubmit={(title: string, category: string) =>
            setFilters({ title, category })
          }
        />
      </div>
      <div className="devices_container">
        <div className="table-header">
          <div style={{ width: "100px" }}>
            <p>Foto</p>
          </div>
          <div style={{ width: "390px" }}>
            <p
              onClick={() => handleSorting("title", growing)}
              style={{
                cursor: "pointer",
                width: "fit-content",
              }}
            >
              Nome
            </p>
          </div>
          <div>
            <p
              onClick={() => handleSorting("category", growing)}
              style={{ cursor: "pointer" }}
            >
              Categoria
            </p>
          </div>
        </div>
      </div>
      {devices.length > 0 ? (
        <div className="devices_container">
          {devices.map((d) => (
            <ComponentDevice key={`device-${d.id}`} device={d} />
          ))}
        </div>
      ) : (
        <p className="no-record">Nessun record trovato</p>
      )}
    </>
  );
};

export default Home;
