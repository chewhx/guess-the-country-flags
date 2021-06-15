import React, { useEffect, useState, useContext } from "react";
import "./styles.css";
// import wcc from "world-countries-capitals";
import shuffle from "./utils/shuffle";
import { Route } from "react-router-dom";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Start from "./screens/Start";
import Tabbar from "./components/Tabbar";

import GlobalProvider, { GlobalContext } from "./context/GlobalProvider";
import { Container } from "react-bootstrap";
import Gameplay from "./screens/Gameplay";

const App = () => {
  return (
    <GlobalProvider>
      <Header />
      <Container style={{ minHeight: "70vh" }}>
        <Route exact path={"/"} component={Start} />
        <Route exact path={"/start"} component={Gameplay} />
      </Container>
      <Footer />
      <Tabbar />
    </GlobalProvider>
  ); //return
}; //fn

export default App;
