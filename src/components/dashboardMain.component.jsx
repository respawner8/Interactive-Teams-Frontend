import * as React from "react";
import {
  Box,
  Toolbar,
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Stack,
  Pagination,
  Typography,
} from "@mui/material";

import axios from "axios";

function DashboardMain({ currentUser }) {
  const [quizName, setQuizName] = React.useState("");
  const [code, setCode] = React.useState("");
  const [view, setView] = React.useState(0);
  const [page, setPage] = React.useState(1);

  const [question, setQuestion] = React.useState("");
  const [option1, setOption1] = React.useState("");
  const [option2, setOption2] = React.useState("");
  const [option3, setOption3] = React.useState("");
  const [option4, setOption4] = React.useState("");
  const [correctAns, setCorrectAns] = React.useState(1);

  const [savedQuestions, setSavedQuestions] = React.useState([]);

  const [answer, setAnswer] = React.useState();
  const [savedAnswers, setSavedAnswers] = React.useState([]);

  const [finalScore, setFinalScore] = React.useState();

  const updateAnswers = (page, answer) => {
    if (savedAnswers.length < page) {
      setSavedAnswers([...savedAnswers, answer]);
    } else {
      setSavedAnswers((prevAnswers) => {
        prevAnswers[page - 1] = answer;
        return [...prevAnswers];
      });
    }

    return 1;
  };

  const prev = () => {
    if (page === 1) {
      alert("you can't go back");
    } else {
      updateAnswers(page, answer);
      setPage(page - 1);
      const { question, option1, option2, option3, option4, correctAns } =
        savedQuestions[page - 2];

      setQuestion(question);
      setOption1(option1);
      setOption2(option2);
      setOption3(option3);
      setOption4(option4);
      setCorrectAns(correctAns);

      console.log(savedAnswers, page);

      if (page - 2 < savedAnswers.length) {
        setAnswer(savedAnswers[page - 2]);
      } else {
        setAnswer(null);
      }
    }
  };

  const next = () => {
    if (page === savedQuestions.length) {
      alert("This is last question");
    } else {
      updateAnswers(page, answer);
      setPage(page + 1);
      const { question, option1, option2, option3, option4, correctAns } =
        savedQuestions[page];

      setQuestion(question);
      setOption1(option1);
      setOption2(option2);
      setOption3(option3);
      setOption4(option4);
      setCorrectAns(correctAns);

      console.log(savedAnswers, page);

      if (page < savedAnswers.length) {
        setAnswer(savedAnswers[page]);
      } else {
        setAnswer(null);
      }
    }
  };

  const submit = () => {
    updateAnswers(page, answer);
    setView(3);
  };

  const createQuiz = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/createQuiz`, {
        quizName: quizName,
        quizCreator: currentUser.email,
        questions: savedQuestions,
      })
      .then((res) => {
        console.log(res.data.message);
        if (res.data.check === "1") {
          setView(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateQuestion = (page, question) => {
    if (savedQuestions.length < page) {
      setSavedQuestions([...savedQuestions, question]);
    } else {
      setSavedQuestions((prevQuestions) => {
        prevQuestions[page - 1] = question;
        return [...prevQuestions];
      });
    }
  };

  const pageChange = (event, value) => {
    updateQuestion(page, {
      question,
      option1,
      option2,
      option3,
      option4,
      correctAns,
    });

    setPage(value);
    if (value <= savedQuestions.length) {
      const { question, option1, option2, option3, option4, correctAns } =
        savedQuestions[value - 1];
      setQuestion(question);
      setOption1(option1);
      setOption2(option2);
      setOption3(option3);
      setOption4(option4);
      setCorrectAns(correctAns);
    } else {
      setQuestion("");
      setOption1("");
      setOption2("");
      setOption3("");
      setOption4("");
      setCorrectAns(1);
    }
  };

  function joinQuiz() {
    console.log("code : ", code);
    setView(2);

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/quiz/${code}`)
      .then((res) => {
        setSavedQuestions(res.data[0].questions);

        const { question, option1, option2, option3, option4, correctAns } =
          res.data[0].questions[0];

        setQuestion(question);
        setOption1(option1);
        setOption2(option2);
        setOption3(option3);
        setOption4(option4);
        setCorrectAns(correctAns);
        setPage(1);
      });
  }

  const seeResult = () => {
    let score = 0;
    console.log(savedAnswers.length);
    for (var i = 0; i < savedAnswers.length; i++) {
      if (savedAnswers[i] === savedQuestions[i].correctAns) {
        score = score + 1;
      }
    }

    if (page > savedAnswers.length) {
      if (savedQuestions[page - 1].correctAns === answer) score = score + 1;
    }

    setFinalScore(score);
    setTimeout(() => {
      setView(0);
    }, 5000);
  };

  function result() {
    return (
      <div>
        <h1>
          Your Score : {finalScore} / {savedQuestions.length}
        </h1>
      </div>
    );
  }

  function quizFinish() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "100px",
          }}
        >
          <Button variant="contained" onClick={seeResult}>
            See Result
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            direction: "column",
            marginTop: "100px",
          }}
        >
          {finalScore ? result() : null}
        </div>
      </div>
    );
  }

  function quizView() {
    return (
      <Container maxWidth="lg">
        <Grid
          container
          spacing="10"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Grid item xs={1}>
            <h3>Q{page}</h3>
          </Grid>
          <Grid item xs={11}>
            <h3>{question}</h3>
          </Grid>
        </Grid>
        <Grid
          container
          spacing="10"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Grid item xs={6}>
            <Button
              variant={answer === 1 ? "contained" : "outlined"}
              fullWidth
              onClick={() => {
                setAnswer(1);
              }}
            >
              {option1}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant={answer === 2 ? "contained" : "outlined"}
              fullWidth
              onClick={() => {
                setAnswer(2);
              }}
            >
              {option2}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant={answer === 3 ? "contained" : "outlined"}
              fullWidth
              onClick={() => {
                setAnswer(3);
              }}
            >
              {option3}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant={answer === 4 ? "contained" : "outlined"}
              fullWidth
              onClick={() => {
                setAnswer(4);
              }}
            >
              {option4}
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          spacing="10"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Grid item xs={6}>
            <Button variant="contained" onClick={prev}>
              prev
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" onClick={next}>
              next
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={submit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
  function createQuizView() {
    return (
      <Container maxWidth="lg">
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: 1,
          }}
        >
          <Grid item xs={12}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <TextField
                margin="normal"
                name="name"
                autoComplete="name"
                label="Quiz name"
                autoFocus
                value={quizName}
                onChange={(e) => {
                  setQuizName(e.target.value);
                }}
              />
            </div>
          </Grid>
          <Grid item xs={1}>
            <h3>Q1</h3>
          </Grid>
          <Grid item xs={11}>
            <TextField
              margin="normal"
              fullWidth
              name="Question"
              autoComplete="Question"
              label="Question"
              autoFocus
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: 1,
          }}
        >
          <Grid item xs={6}>
            <TextField
              margin="normal"
              fullWidth
              name="option1"
              autoComplete="option1"
              label="option 1"
              autoFocus
              value={option1}
              onChange={(e) => {
                setOption1(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="normal"
              fullWidth
              name="option2"
              autoComplete="option2"
              label="Option 2"
              autoFocus
              value={option2}
              onChange={(e) => {
                setOption2(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="normal"
              fullWidth
              name="option3"
              autoComplete="option3"
              label="Option 3"
              autoFocus
              value={option3}
              onChange={(e) => {
                setOption3(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="normal"
              fullWidth
              name="option4"
              autoComplete="option4"
              label="Option 4"
              autoFocus
              value={option4}
              onChange={(e) => {
                setOption4(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <TextField
                margin="normal"
                name="correctAns"
                autoComplete="correctAns"
                label="Correct Ans"
                autoFocus
                value={correctAns}
                onChange={(e) => {
                  setCorrectAns(e.target.value);
                }}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Stack spacing={2}>
                <Typography>Page: {page}</Typography>
                <Pagination count={10} page={page} onChange={pageChange} />
              </Stack>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="contained" onClick={createQuiz}>
                {" "}
                Submit{" "}
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    );
  }

  function defaultView() {
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
              <Button
                style={{ marginTop: 20 }}
                variant="contained"
                onClick={() => {
                  setView(1);
                }}
              >
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
                onChange={(e) => {
                  setCode(e.target.value);
                }}
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
    );
  }

  function views() {
    if (view === 0) {
      return defaultView();
    } else if (view === 1) {
      return createQuizView();
    } else if (view === 2) {
      return quizView();
    } else if (view === 3) {
      return quizFinish();
    }
  }

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
      {views()}
    </Box>
  );
}

export default DashboardMain;
