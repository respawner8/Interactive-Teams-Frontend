import React, { useContext } from "react";
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

import { signInWithGoogle } from "../firebase/firebase.utils.js";
import UserContext from "../context/UserContext.js";

export default function SignIn() {
  const { userDetails } = useContext(UserContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Box
        sx={{
          marginTop: 10,
        }}
      >
        <Paper
          elevation={2}
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
            onSubmit={handleSubmit}
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
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  onClick={signInWithGoogle}
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
