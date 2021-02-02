import React, { Component } from "react";
import "./App.css";
import Layout from "./Layout/Layout";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./AuthContext/AuthContext";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <BrowserRouter>
            <Header />
            <AuthProvider>
              <Main />
            </AuthProvider>
            <Footer />
          </BrowserRouter>
        </Layout>
      </div>
    );
  }
}

export default App;
