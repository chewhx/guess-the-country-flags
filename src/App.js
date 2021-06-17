import React, { useState } from "react";
import { Container } from "react-bootstrap";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Start from "./screens/Start";
import Tabbar from "./components/Tabbar";
import ScoreSave from "./components/ScoreSave";
import useQuiz from "./hook/useQuiz";

import questions_ from "./data/questions.json";
import optionsArray from "./data/optionsArray.json";

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
    <>
      <Navbar
        setGameMode={setGameMode}
        gameMode={gameMode}
        stats={quizInstance.stats}
        remaining={quizInstance.questions.remaining}
        reset={quizInstance.resetGame}
        setShow={setShow}
      />
      <Container style={{ minHeight: "70vh" }}>
        <Start gameMode={gameMode} quizInstance={quizInstance} />
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
        reset={quizInstance.resetGame}
        setShow={setShow}
      />
    </>
  ); //return
}; //fn

export default App;
