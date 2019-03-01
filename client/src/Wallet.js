import React, { Component } from "react";
import { Card, Header, Loader, Button } from "semantic-ui-react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Wallet extends Component {
  constructor() {
    super();
    this.state = { loading: true, redirect: false };
  }

  async componentDidMount() {
    if (typeof this.props.location.state === "undefined")
      this.setState({ redirect: true });

    axios
      .post("/api/showWallet", {
        pk: this.props.location.state.public_key,
        id: this.props.location.state.id
      })
      .then(res => {
        this.setState({
          wallet: res.data.info,
          balance_hbz: res.data.balance,
          balanceEth: res.data.balanceEth
        });
      })
      .catch(err => {
        this.setState({ error: err.message });
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.wallet != null) {
      return (
        <div>
          <Header as="h3" color="red" textAlign="center">
            {this.state.error}
          </Header>
          <Card.Group centered>
            <Card style={{ width: "70%" }} color="orange">
              <Card.Content textAlign="center">
                <Card.Header>Wallet {this.state.wallet.public_key}</Card.Header>
                <div style={{ marginTop: "20px" }}>
                  <p>
                    <b>Balance:</b> {this.state.balance_hbz} HBZ -{" "}
                    {this.state.balanceEth} ETH
                  </p>
                  <p>
                    <b>Creation date:</b>{" "}
                    {this.state.wallet.created_at.split("T")[0]} -{" "}
                    {this.state.wallet.created_at.split("T")[1].split(".")[0]}
                  </p>
                  <p>
                    <b>Last Update date:</b>{" "}
                    {this.state.wallet.updated_at.split("T")[0]} -{" "}
                    {this.state.wallet.updated_at.split("T")[1].split(".")[0]}
                  </p>
                  <p>
                    <b>Last Deposit date:</b>{" "}
                    {this.state.wallet.last_deposit_at.split("T")[0]} -{" "}
                    {
                      this.state.wallet.last_deposit_at
                        .split("T")[1]
                        .split(".")[0]
                    }
                  </p>
                  <p>
                    <b>Last Deposit tx:</b> {this.state.wallet.last_deposit_tx}
                  </p>
                </div>
              </Card.Content>
            </Card>
          </Card.Group>
        </div>
      );
    } else {
      return <Loader active={this.state.loading}>Retrieving data</Loader>;
    }
  }
}

export default Wallet;
