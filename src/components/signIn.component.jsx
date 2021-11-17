import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

import { signInWithGoogle, login } from "../firebase/firebase.utils.js";
import UserContext from "../context/UserContext.js";

export default function SignIn() {
  const { userDetails } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  async function login1() {
		try {
			await login(email, password)
      
      navigate("/dashboard");
		} catch(error) {
			alert(error.message)
		}
	}

  async function googleLogin() {
		try {
			await signInWithGoogle();
      
      navigate("/dashboard");
		} catch(error) {
			alert(error.message)
		}
	}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Box
        sx={{
          marginTop: 10,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 1,
          }}
        >
          <img
            src={
              "https://download.logo.wine/logo/Microsoft_Teams/Microsoft_Teams-Logo.wine.png"
            }
            width="30%"
            height="30%"
          />

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => e.preventDefault() && false}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Grid container alignItems="flex-start">
              <Grid item>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </Grid>
            </Grid>
            <Grid container spacing="2">
              <Grid item xs>
                <Button
                  type="submit"
                  onClick={login1}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  onClick={googleLogin}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Google
                </Button>
              </Grid>
            </Grid>
            <Grid container justifyContent="space-between">
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid container item xs justifyContent="flex-end">
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );



}
