import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Transfer from "./Transfer";
import Wallet from "./Wallet";
import { Container } from "semantic-ui-react";

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <BrowserRouter>
        <Container>
          <Header />
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/wallet/*" component={Wallet} />
          <Route exact path="/transfer" component={Transfer} />
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
