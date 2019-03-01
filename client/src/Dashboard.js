import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Card, Form, Radio, Header, Loader } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = { filter: "all", loading: true, error: null };

    this.fetchUser = this.fetchUser.bind(this);
  }

  componentDidMount() {
    console.log("axios");
    axios
      .post("/api/wallets", { filter: this.state.filter, timeout: 1000 })
      .then(res => {
        console.log(res);
        this.setState({ wallets: res.data.wallets, loading: false });
      })
      .catch(err => {
        this.setState({ error: err.message, loading: false });
      });
  }

  fetchUser(e, { value }) {
    this.setState({ filter: value, loading: true });
    console.log("here");
    axios
      .post("/api/wallets", { filter: value })
      .then(res => {
        console.log(res);
        this.setState({ wallets: res.data.wallets, loading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: err, loading: false });
      });
  }

  renderWallets() {
    if (this.state.error === null)
      return _.map(this.state.wallets, wallet => {
        return (
          <p>
            <Link
              to={{
                pathname: `/wallet/${wallet.public_key}`,
                state: { id: wallet._id, public_key: wallet.public_key }
              }}
            >
              {wallet.public_key}
            </Link>
          </p>
        );
      });
  }

  renderFilter() {
    return (
      <div style={{ marginTop: "20px" }}>
        <Form.Field>
          <Radio
            label="All"
            name="radioGroup"
            value="all"
            checked={this.state.filter === "all"}
            onChange={this.fetchUser}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label="Deposited"
            name="radioGroup"
            value="deposited"
            checked={this.state.filter === "deposited"}
            onChange={this.fetchUser}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label="Claimed"
            name="radioGroup"
            value="claimed"
            checked={this.state.filter === "claimed"}
            onChange={this.fetchUser}
          />
        </Form.Field>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Loader active={this.state.loading}>Retrieving data</Loader>
        <Header as="h3" color="red" textAlign="center">
          {this.state.error}
        </Header>
        <Card.Group centered>
          <Card style={{ width: "45%" }} color="orange">
            <Card.Content>
              <Card.Header>List of wallets PKs</Card.Header>
              <div style={{ marginTop: "20px" }}>{this.renderWallets()}</div>
            </Card.Content>
          </Card>
          <Card style={{ width: "45%" }} color="orange">
            <Card.Content>
              <Card.Header>Set filter</Card.Header>
              <Form>{this.renderFilter()}</Form>
            </Card.Content>
          </Card>
        </Card.Group>
      </div>
    );
  }
}

export default Dashboard;
