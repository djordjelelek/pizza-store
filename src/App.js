import React, { Component } from "react";
import "./App.css";
import Layout from "./Layout/Layout";
import PizzaBuilder from "./containers/PizzaBuilder/PizzaBuilder";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Header />
          <PizzaBuilder />
          <Footer />
        </Layout>
      </div>
    );
  }
}

export default App;
