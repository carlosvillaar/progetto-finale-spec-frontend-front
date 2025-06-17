import { useState, useEffect } from "react";
import type { Device, Filters } from "../types/common.types";
import ComponentDevice from "../components/ComponentDevice";
import FilterPanel from "../components/FilterPanel";
import "./Home.styles.css";

const defaultFilters: Filters = {
  title: "",
  category: "",
};

const Home = () => {
  //States
  const [devices, setDevices] = useState<Device[]>([]);
  const [filters, setFilters] = useState<Filters>(defaultFilters);

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
