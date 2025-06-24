import { useContext, useRef, type FormEvent } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import "./FilterPanel.styles.css";

const FilterPanel = ({
  onReset,
  onSubmit,
}: {
  onReset: VoidFunction;
  onSubmit: (name: string, category: string) => void;
}) => {
  //Hooks
  const navigate = useNavigate();
  //Refs
  const titleRef = useRef<HTMLInputElement | null>(null);
  const categoryRef = useRef<HTMLSelectElement | null>(null);

  //Context
  const { deviceToCompare } = useContext(GlobalContext);

  //Handlers
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = titleRef.current?.value;
    const category = categoryRef.current?.value;

    if (title && category) {
      onSubmit(title, category);
    }
  };

  const handleReset = () => {
    onReset();
    if (titleRef.current) {
      titleRef.current.value = ""; // Resetta la ricerca
    }
    if (categoryRef.current) {
      categoryRef.current.value = "smartphone"; // Resetta la tipologia
    }
  };

  const handleComparate = () => {
    if (deviceToCompare.length >= 2) {
      navigate("device/compare");
    } else {
      alert("selezina almeno due device da comparare");
    }
  };

  return (
    <div className="filter-container">
      <h4>Filtra</h4>
      <form className="filter-form" onSubmit={handleSubmit}>
        <button onClick={() => navigate("/favourites")}>Preferiti</button>
        <input
          placeholder="Cerca per titolo"
          ref={titleRef}
          name="title"
          type="text"
        />
        <select ref={categoryRef} name="category">
          <option value="smartphone">Smartphone</option>
        </select>
        <button type="submit">Applica</button>
        <button onClick={handleReset}>Resetta</button>
        <button disabled={deviceToCompare.length < 2} onClick={handleComparate}>
          Compara
        </button>
      </form>
    </div>
  );
};

export default FilterPanel;
