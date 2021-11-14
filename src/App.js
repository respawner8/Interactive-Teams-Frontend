import React from "react";
import "./App.css";
import SignIn from "./components/signIn.component";
import SignUp from "./components/signUp.component.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

require("dotenv").config();

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
