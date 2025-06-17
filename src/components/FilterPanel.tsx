import { useRef, type FormEvent } from "react";

const FilterPanel = ({
  onReset,
  onSubmit,
}: {
  onReset: VoidFunction;
  onSubmit: (name: string, category: string) => void;
}) => {
  //Refs
  const titleRef = useRef<HTMLInputElement | null>(null);
  const categoryRef = useRef<HTMLSelectElement | null>(null);

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
      titleRef.current.value = ""; // Resetta il campo input
    }
    if (categoryRef.current) {
      categoryRef.current.value = "smartphone"; // Resetta il campo input
    }
  };

  return (
    <div>
      <h4>Filtra</h4>
      <form onSubmit={handleSubmit}>
        <input ref={titleRef} name="title" type="text" />
        <select ref={categoryRef} name="category">
          <option value="smartphone">Smartphone</option>
        </select>
        <button type="submit">Applica</button>
        <button onClick={handleReset}>Resetta</button>
      </form>
    </div>
  );
};

export default FilterPanel;
