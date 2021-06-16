import React, { useState } from "react";
import { Route } from "react-router-dom";
import { Container } from "react-bootstrap";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Start from "./screens/Start";
import Tabbar from "./components/Tabbar";
import useQuiz from "./hook/useQuiz";

import questions_ from "./data/questions.json";
import optionsArray from "./data/optionsArray.json";

const App = () => {
  const [gameMode, setGameMode] = useState(false);

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
    <>
      <Navbar
        setGameMode={setGameMode}
        gameMode={gameMode}
        stats={quizInstance.stats}
        remaining={quizInstance.questions.remaining}
        reset={quizInstance.resetGame}
      />
      <Container style={{ minHeight: "70vh" }}>
        <Route
          exact
          path={"/"}
          children={<Start gameMode={gameMode} quizInstance={quizInstance} />}
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
        reset={quizInstance.resetGame}
      />
    </>
  ); //return
}; //fn

export default App;
