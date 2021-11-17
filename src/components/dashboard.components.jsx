import React, { useContext } from "react";
import UserContext from "../context/UserContext.js";
import AppBar from "./appBar.component";

export default function Dashboard() {
  const { userDetails } = useContext(UserContext);

  //return <h1>{userDetails ? userDetails.displayName : "None"}</h1>;

  return (
      <AppBar />
  )
}
