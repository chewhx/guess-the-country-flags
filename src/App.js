import React, { useEffect, useState } from "react";
import "./styles.css";
import wcc from "world-countries-capitals";
import shuffle from './utils/shuffle'
// import pages
import Start from './pages/start'
import Game from './pages/game'

let index = 0;
let allCountries = [];

export default function App() {

  // 1. Get a randomised list of country names from npm package

  useEffect( ()=> {
    allCountries = shuffle(wcc.getAllCountries()).map(e => e.toUpperCase())
  } ,[]) 

    //wcc.getAllCountries: returns a list of all the country names, in an Array

    //shuffle(): randomises the order of the list

    //.map(e => e.toUpperCase()): capitalises each country name in the list


  // 2. Set states for questions and results
  
  const [q, setQ] = useState({
    answer: "",
    options: [],
    flag: "", 
    guess: ""
  })

  const [r, setR] = useState({
    r: false,
    pQ: {},
    score: 0,
    show: false
  })

  const [comp, setComp] = useState(false)

  // 3. Function handlers for starting game and checking answer

  const changeComp = () => {
    setComp(true)
  }


  const start = () => {
    changeComp();
    const answer = allCountries[index]
    const options = shuffle([...wcc.getNRandomCountriesData(3).map(each => each.country.toUpperCase()), answer])


    const countryDetails = (wcc.getCountryDetailsByName(answer));
    const code = countryDetails[0].iso["alpha_2"]
    const flag = "https://flagcdn.com/w320/" + code + ".png"
    setQ({answer: answer, options: [...options], flag: flag, guess: null})
  }; 



  const check = (value) => {

    index++

    const i = value
    const chosen = q.options[i]
    const answer = q.answer
    const result = chosen === answer

    if (result) {
        setR({r: true, pQ: q, score: r.score+1, show: true})
    } 
    if (!result) {
        setR({r: false, pQ: q, score: r.score, show: true})
    }


    start()
  
  };

  return (
    <>
      {comp === false && <Start start={start} /> } 
      {comp === true &&  <Game q={q} r={r} check={check} round={index} /> }
      <div className="footer">
      Created by <a href="https://github.com/chewhx">@chewhx</a>
      
      </div>
    </>

  );//return
}//fn
