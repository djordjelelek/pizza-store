import React, { Component } from "react";
import "./App.css";
import Layout from "./Layout/Layout";
import PizzaBuilder from "./containers/PizzaBuilder/PizzaBuilder";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { BrowserRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <BrowserRouter>
            <Header />
            {/* <PizzaBuilder /> */}
            <Main />
            <Footer />
          </BrowserRouter>
        </Layout>
      </div>
    );
  }
}

export default App;
