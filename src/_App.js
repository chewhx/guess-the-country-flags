import React from "react";
import "./styles.css";
import wcc from "world-countries-capitals";
import Flag from "./components/Flag";
import Option from "./components/Option";
import Results from "./components/Results"
import Start from "./components/Start"
import shuffle from "./components/utils/shuffle"
import _ from "lodash"

let score = 0
let attempts = -1

export default function App() {

  let randomCountryDetails = [];
  const [guessResult, setGuessResult] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [prevAnswer, setPrevAnswer] = React.useState("");
  const [answerFlagUrl, setAnswerFlagUrl] = React.useState("");
  const [prevAnswerFlagUrl, setPrevAnswerFlagUrl] = React.useState("");
  const [choices, setChoices] = React.useState([]);
  const [state, setState] = React.useState(true);

  function startRound () {
    attempts++
    const randomCountry = wcc.getRandomCountry()
    randomCountryDetails = (wcc.getCountryDetailsByName(randomCountry));
    setAnswer((prevAnswer)=>{
      setPrevAnswer(prevAnswer)
      setAnswer(randomCountryDetails[0].country)
      setChoices(shuffle([
        randomCountryDetails[0].country,
        wcc.getRandomCountry(),
        wcc.getRandomCountry(),
        wcc.getRandomCountry()
      ]))
    })
    setAnswerFlagUrl((prevUrl)=> {
      setPrevAnswerFlagUrl(prevUrl)
      setAnswerFlagUrl(
        _.replace(randomCountryDetails[0].flag, "h80", "w580")
      )
    })
  }

  function checkAnswer(event) {
    let option = event.target.id;
    if (option === answer){
      setGuessResult("Correct")
      score++
    } else {
      setGuessResult("Wrong")
    }
  startRound()
  }

  function changeState() {
    setState(!state)
  }

  return (
    <div className="container">
      {state && <Start functions={()=>{startRound(); changeState()}}/>}

      {state ? null:
        <div>
          GUESS THIS FLAG:<br />
          <Flag url={answerFlagUrl} width="80%" setMargin="30px" />
          <div className="d-grid gap-2 mx-auto">
            {choices.map((item) => {
              return <Option text={_.toUpper(item)} onClick={checkAnswer} id={item} />;
            })}
          </div>

        {attempts > 0 &&
          <Results
            PrevAnswerFlagUrl={prevAnswerFlagUrl}
            attemptResult={_.toUpper(guessResult)}
            prevAnswer={_.toUpper(prevAnswer)}
            score={score}
            attempts={attempts}
          />
        }

        </div>

      }

    </div>
  );//return
}//fn
