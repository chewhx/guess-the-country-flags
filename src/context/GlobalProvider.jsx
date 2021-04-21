import React, { useState, useEffect } from "react";
import countries from "../data/countries.json";
import shuffle from "../utils/shuffle";
import randomSelect from "../utils/randomSelect";

export const GlobalContext = React.createContext();

const GlobalProvider = ({ children }) => {
  // State: list of countries
  const [listOfCountries, setListOfCountries] = useState();
  // State: current question
  const [currentQuestion, setCurrentQuestion] = useState({
    answer: "",
    options: [],
    flagUrl: "",
  });

  // State: past question result
  const [results, setResults] = useState({
    correct: false,
    previousQuestion: {},
    score: 0,
    show: false,
    attempts: 0,
  });

  // 1. Shuffled array of country names and their ISO alpha-2 code
  useEffect(() => {
    setListOfCountries(shuffle([...countries]));
  }, []);

  // 2. Each round of gameplay

  const initGameRound = () => {
    // select a random country
    const randomIndex = Math.floor(Math.random() * listOfCountries.length);
    const randomCountry = listOfCountries[randomIndex];
    // remove the random country selected from the list, to avoid duplicate question
    listOfCountries.splice(randomIndex, 1);

    // select three country, extract the names,  and set options, including the answer
    let threeRandomCountries = randomSelect(countries, 3).map(
      (each) => each.name
    );
    let options = [...threeRandomCountries, randomCountry.name];
    // shuffle the options
    options = shuffle(options);
    // set questionAnswer, flagUrl, options
    setCurrentQuestion((prevCurrentQuestion) => ({
      ...prevCurrentQuestion,
      answer: randomCountry.name,
      flagUrl: `https://flagcdn.com/w320/${randomCountry.code}.jpg`,
      options: options,
    }));
  };

  // 3. Pick an option and check if option is the answer

  const guessTheAnswer = (guess) => {
    // increment the no. of attempts
    // set display of the results card to true
    results.attempts++,
      setResults((prevResults) => ({
        ...prevResults,
        show: true,
      }));
    // if guess is correct, set results for correct guess
    if (guess === currentQuestion.answer) {
      console.log("correct");
      results.score++;
      setResults((prevResults) => ({
        ...prevResults,
        correct: true,
        previousQuestion: { ...currentQuestion },
      }));
    }
    // if guess is wrong, set results for wrong guess
    if (guess !== currentQuestion.answer) {
      console.log("wrong");
      setResults((prevResults) => ({
        ...prevResults,
        correct: false,
        previousQuestion: { ...currentQuestion },
      }));
    }
    initGameRound();
  };

  // 4. Reset the listOfCountries, score, and attempts

  const resetTheGame = () => {
    setListOfCountries(shuffle([...countries]));
    setResults({
      correct: false,
      previousQuestion: {},
      score: 0,
      show: false,
      attempts: 0,
    });
    initGameRound();
  };

  return (
    <GlobalContext.Provider
      value={{
        currentQuestion,
        results,
        initGameRound,
        resetTheGame,
        guessTheAnswer,
        listOfCountries,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
