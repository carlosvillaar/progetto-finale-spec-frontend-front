import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

const basePath = import.meta.env.VITE_API_ENDPOINT!;

const Comparation = () => {
  //Context
  const { deviceToCompare } = useContext(GlobalContext);
  //Fetch
  const fetchDevices = async () => {
    const promises = deviceToCompare.map((el: number) =>
      fetch(`${basePath}/smartphones/${el}`)
    );

    const responses = await Promise.all(promises);

    const data = await Promise.all(responses.map((r) => r.json()));

    console.log(data);
  };

  //Effects
  useEffect(() => {
    deviceToCompare.length >= 2 ? fetchDevices() : null;
  }, [deviceToCompare]);

  return <div>Comparation</div>;
};

export default Comparation;
