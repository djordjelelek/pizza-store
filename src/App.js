import React, { Component } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import PizzaBuilder from "./containers/PizzaBuilder/PizzaBuilder";
import Header from "./containers/Header/Header";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Header />
          <PizzaBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
