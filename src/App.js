import React, { useState, useEffect } from "react";
import "./App.css";
import SignIn from "./components/signIn.component";
import SignUp from "./components/signUp.component.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { auth } from "./firebase/firebase.utils";
import UserContext from "./context/UserContext";

require("dotenv").config();

function App() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      console.log(user);
    });
  }, [auth]);

  return (
    <UserContext.Provider
      value={{
        userDetails: currentUser,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
