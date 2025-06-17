import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const basePath = import.meta.env.VITE_API_ENDPOINT!;

const Detail = () => {
  //Hooks
  const navigate = useNavigate();
  const { id } = useParams();

  //Fetches

  const fetchDevice = async () => {
    try {
      const response = await fetch(`${basePath}/smartphones/${id}`);
      const data = await response.json();
      return console.log(data.smartphone);
    } catch (err) {
      console.error(err);
    }
  };

  //Effects
  useEffect(() => {
    fetchDevice();
  }, [id]);
  return <div>{id}</div>;
};

export default Detail;
