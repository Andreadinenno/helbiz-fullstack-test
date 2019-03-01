import React, { Component } from "react";
import { Form, Card, Header, Button, Input, Loader } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Transfer extends Component {
  constructor() {
    super();
    this.state = { error: "", loading: false };
  }

  onChange(type, event) {
    this.setState({ [type]: event.target.value });
  }

  onSubmit(event) {
    this.setState({ loading: true });
    axios
      .post("/api/transfer", {
        from: this.state.from,
        to: this.state.to,
        value: this.state.amount
      })
      .then(res => {
        console.log(res);
        this.setState({
          loading: false,
          error: res.data,
          from: null,
          to: null,
          amount: null
        });

        let redirect = `/wallet/${this.state.from}`;
        this.setState({ redirect });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false, error: err.message });
      });
  }

  render() {
    if (this.state.redirect != null)
      return <Redirect to={this.state.redirect} />;
    return (
      <div style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}>
        <Loader active={this.state.loading}>Persisting changes</Loader>
        <Header as="h3" color="red" textAlign="center">
          {this.state.error}
        </Header>
        <Header as="h3" color="teal" textAlign="center">
          Transfer Money
        </Header>
        <Form>
          <Form.Field>
            <label>From</label>
            <input
              value={this.state.from ? this.state.from : ""}
              onChange={this.onChange.bind(this, "from")}
              placeholder="Sender Address"
            />
          </Form.Field>
          <Form.Field>
            <label>To</label>
            <input
              value={this.state.to ? this.state.to : ""}
              onChange={this.onChange.bind(this, "to")}
              placeholder="Receiver Address"
            />
          </Form.Field>
          <Form.Field>
            <label>Amount</label>
            <Input
              value={this.state.amount ? this.state.amount : ""}
              label="HBZ"
              labelPosition="right"
              onChange={this.onChange.bind(this, "amount")}
              placeholder="Amount to transfer"
            />
          </Form.Field>
          <Button type="submit" color="teal" onClick={this.onSubmit.bind(this)}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default Transfer;
