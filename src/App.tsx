import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import "./main.css";
import { GlobalProvider } from "./context/GlobalContext";
import Comparation from "./pages/Comparation";
const App = () => {
  return (
    <GlobalProvider>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="device/:id" Component={Detail} />
        <Route path="device/compare" Component={Comparation} />
      </Routes>
    </GlobalProvider>
  );
};

export default App;
