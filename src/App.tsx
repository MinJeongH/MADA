import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Login from "./component/login";
import JoinEmail from "./component/join/join_email";
import Home from "./component/home";
import JoinSuccess from "./component/join/join_success";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/JoinEmail" element={<JoinEmail />} />
        <Route path="/joinSuccess" element={<JoinSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
