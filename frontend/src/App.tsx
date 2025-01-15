import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StatusPage from "./pages/StatusPage";
import DataPage from "./pages/DataPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StatusPage />} />
        <Route path="/data" element={<DataPage />} />
      </Routes>
    </Router>
  );
};

export default App;
