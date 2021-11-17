import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext.js";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { logout } from "../firebase/firebase.utils.js";

export default function DenseAppBar() {
  let navigate = useNavigate();
  const { userDetails } = useContext(UserContext);
  const dispName = userDetails.displayName;

  async function logOut() {
    try {
      await logout();

      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <div style={{ display: "flex", width: "100%" }}>
            <Typography
              variant="h6"
              color="inherit"
              component="div"
              style={{ flex: 1 }}
            >
              Interactive-Teams
            </Typography>
            <Typography variant="h6" color="inherit" component="div">
              {dispName ? dispName : "Null"}
              <Button variant="contained" onClick={logOut}>
                Logout
              </Button>
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
