import { Global } from "@emotion/react";
import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  
import Cars from "./pages/Cars/Cars";
import Favorites from "./pages/Cars/Favorites";  
import { GLOBAL_STYLES } from "./styles/global.styles";
import Header from "./pages/Cars/Header";

const App: FC = () => {
  
  return (
    <Router> 
      <div>
        <Header />
        <Routes> 
          <Route path="/" element={<Cars />} /> 
          <Route path="/favorites" element={<Favorites />} /> 
        </Routes>
        <Global styles={GLOBAL_STYLES} />
      </div>
    </Router>
  );
};

export default App;
