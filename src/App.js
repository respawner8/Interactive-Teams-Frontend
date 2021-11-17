import React, { useState, useEffect } from "react";
import "./App.css";
import SignIn from "./components/signIn.component";
import SignUp from "./components/signUp.component.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import UserContext from "./context/UserContext";
import Dashboard from "./components/dashboard.components.jsx";

require("dotenv").config();

function App() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log("Hello1");
      setCurrentUser(user);
      createUserProfileDocument(user);
      console.log(user);
    });
  }, [auth]);

  return (
    <UserContext.Provider
      value={{
        userDetails: currentUser,
        setUserDetails: setCurrentUser,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
