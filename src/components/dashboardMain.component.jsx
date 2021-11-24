import * as React from "react";
import {
  Box,
  Toolbar,
  Container,
  Grid,
  Paper,
  TextField,
  Button,
} from "@mui/material";

function DashboardMain() {
  const [code, setCode] = React.useState("");

  function joinQuiz() {
    console.log("code : ", code);
  }

  const handleChange = (event) => {
    setCode(event.target.value);
  };

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                height: 240,
              }}
            >
              <img
                src={
                  "https://d1ymz67w5raq8g.cloudfront.net/Pictures/480xany/6/5/5/509655_shutterstock_1506580442_769367.jpg"
                }
                alt="teams-logo"
                style={{
                  marginTop: "10px",
                }}
                width="90%"
                height="90%"
              />
              <Button style={{ marginTop: 20 }} variant="contained">
                Create Quiz
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <TextField
                margin="normal"
                fullWidth
                name="code"
                autoComplete="code"
                label="code"
                autoFocus
                value={code}
                onChange={handleChange}
              />
              <Button
                style={{ marginTop: 80 }}
                variant="contained"
                onClick={joinQuiz}
              >
                Join Quiz
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default DashboardMain;
