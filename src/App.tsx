import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import "./main.css";
const App = () => {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="device/:id" Component={Detail} />
    </Routes>
  );
};

export default App;
