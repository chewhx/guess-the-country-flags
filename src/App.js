import React, { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import './App.css'
//import utils
import wcc from 'world-countries-capitals';
import shuffle from './components/utils/shuffle'
//import sections
import Results from './components/containers/results'
import Question from './components/sections/question'
import Header from './components/sections/header'
//import pages
import Start from './components/pages/start'
import Game from './components/pages/game'

let index = 0

function App () {

    const allCountries = shuffle(wcc.getAllCountries()).map(e => e.toUpperCase())

    //wcc.getAllCountries returns a list of all the country names, in an Array

    //shuffle() randomises the order of the list

    //.map(e => e.toUpperCase()) capitalises each country name in the list

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

    //wcc.getRandomCountry()
    //wcc.getNRandomCountriesData(amount)
    //wcc.getCountryDetailsByName(answer)


    const choose = (v) => {
        const guess = v
        setQ({...q, guess: guess})
    }


    const start = () => {
        const answer = allCountries[index]
        const options = shuffle([...wcc.getNRandomCountriesData(3).map(each=> each.country.toUpperCase()), answer])


        const countryDetails = (wcc.getCountryDetailsByName(answer));
        const flag = countryDetails[0].flag
        setQ({answer: answer, options: [...options], flag: flag, guess: null})
    };

    const check = () => {

        if(q.guess === null) {
            return
        }

        index++

        const i = q.guess
        console.log("i: " + i);
        const chosen = q.options[i]
        console.log("chosen: " + chosen);
        const answer = q.answer
        console.log("answer: " + answer);
        const result = chosen === answer
        console.log("result: " + result);

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
        <BrowserRouter>
        <Header />
        <Route exact path='/' render={ () => <Start start={start} /> } />
        <Route
        exact
        path='/game'
        render={ () => <Game 
            q={q}
            r={r}
            choose={choose}
            check={check}
            index={index}/> 
            }/>
        
        </BrowserRouter>
        </>

    )
}; 

export default App;