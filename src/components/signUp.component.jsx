import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

import axios from 'axios';

import { connect } from "react-redux";

import {
  auth,
  createUserProfileDocument,
  signInWithGoogle,
} from "../firebase/firebase.utils.js";

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: "",
      email: "",
      password: "",
    };
  }

  async googleLogin() {
    await signInWithGoogle();
    window.open("/dashboard", "_self");
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { displayName, email, password } = this.state;

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });

      axios
        .post("http://localhost:5000/createUser", {
          displayName: displayName,
          email: email,
        })
        .then((res) => {
          console.log("axios response : ", res.data.message);
        })
        .catch((err) => {
          console.log("error : ", err);
        });
      window.open("/dashboard", "_self");

      this.setState();
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    if (this.props.currentUser) {
      window.open("/dashboard", "_self");
    }
    const { displayName, email, password } = this.state;
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
              alt="teams-logo"
              width="30%"
              height="30%"
            />
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={this.handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="displayName"
                    required
                    fullWidth
                    id="displayName"
                    label="display Name"
                    autoFocus
                    value={displayName}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={this.handleChange}
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
                    Sign Up
                  </Button>
                </Grid>
                <Grid item xs>
                  <Button
                    onClick={this.googleLogin}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Google
                  </Button>
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(SignUp);
