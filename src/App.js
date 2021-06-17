import React, { useState } from "react";
import { Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import "./styles.css";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Start from "./screens/Start";
import Scoreboard from "./screens/Scoreboard";
import Tabbar from "./components/Tabbar";
import ScoreSave from "./components/ScoreSave";
import Topbar from "./components/Topbar";
import useQuiz from "./hook/useQuiz";

import questions_ from "./data/questions.json";
import optionsArray from "./data/optionsArray.json";

import { CookiesProvider } from "react-cookie";

const App = () => {
  const [gameMode, setGameMode] = useState(false);

  // show save high score modal
  const [show, setShow] = useState(false);

  const memoFn = () => questions_;

  let question_data = React.useMemo(memoFn, [memoFn]);

  const quizInstance = useQuiz(question_data, {
    shuffleOptions: true,
    shuffleQuestions: true,
    optionsArray: optionsArray,
  });

  const tabRef = React.useRef();

  const hideTab = () => {
    tabRef.current.style.bottom = "-90px";
  };

  const revealTab = () => {
    tabRef.current.style.bottom = "0";
  };

  return (
    <CookiesProvider>
      <Topbar />
      <Navbar
        setGameMode={setGameMode}
        gameMode={gameMode}
        stats={quizInstance.stats}
        remaining={quizInstance.questions.remaining}
        reset={quizInstance.resetGame}
        setShow={setShow}
      />
      <Container style={{ minHeight: "70vh" }}>
        <Route path="/scoreboard">
          <Scoreboard />
        </Route>
        <Route exact path="/">
          <Start gameMode={gameMode} quizInstance={quizInstance} />
        </Route>
        <ScoreSave
          setShow={setShow}
          show={show}
          stats={quizInstance.stats}
          reset={quizInstance.resetGame}
          setGameMode={setGameMode}
        />
      </Container>
      <Footer />
      <Tabbar
        ref={tabRef}
        hideTab={hideTab}
        revealTab={revealTab}
        setGameMode={setGameMode}
        gameMode={gameMode}
        stats={quizInstance.stats}
        remaining={quizInstance.questions.remaining}
        reset={() => {
          quizInstance.resetGame();
          quizInstance.populateOptions();
        }}
        setShow={setShow}
      />
    </CookiesProvider>
  ); //return
}; //fn

export default App;
