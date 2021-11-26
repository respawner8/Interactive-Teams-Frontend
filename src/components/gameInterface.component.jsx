import React, { useState } from 'react'
import {
    Container,
    Grid,
    Paper,
    Button
} from "@mui/material";
import Game1 from './game1.component'

function GameInterface({ currentUser }) {

    const [view, setView] = useState(0);

function game() {
    return (
        <div style={{marginTop: 30}}>
        <Game1 />
        </div>
    )
}

    function gameTabs(){
        return (
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
                    width: 240,
                    marginTop:7
                  }}
                >
                  <img
                    src={
                      "https://i1.wp.com/sign-mod.com/wp-content/uploads/2021/02/Fast-Typing-Game-Test-your-writing-speed-4.2-APK-MOD-Unlimited-Money.png?fit=210%2C210&ssl=1&resize=1280%2C720"
                    }
                    alt="teams-logo"
                    style={{
                      marginTop: "10px",
                    }}
                    width="90%"
                    height="90%"
                  />
                  <Button
                    style={{ marginTop: 20 }}
                    variant="contained"
                    onClick={() => {
                      setView(1);
                    }}
                  >
                    Start Game
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        )
    }

  return (
    <div>
        {view ? game() : gameTabs()}
    </div>
  );
}

export default GameInterface;
