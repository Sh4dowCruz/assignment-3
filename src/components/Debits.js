/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import React, { Component } from 'react';

class Credits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      amount: '',
    };
  }
  // Handle form submission
  handleDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };

  handleAmountChange = (event) => {
    this.setState({ amount: event.target.value });
  };

  handlesubmit = (event) => {
    event.preventDefault();
    const newDebit = {
      description: this.state.description,
      amount: parseFloat(this.state.amount),
    };
    this.props.addDebit(newDebit);
    this.setState({ description: '', amount: '' });
  };
  
  // Render the debits list
  debitsView = () => {
    return this.props.debits.map((debit, index) => (
      <li key={index}>
        {debit.description}: ${debit.amount.toFixed(2)}
      </li>
    ));
  };

  // Render the list of Debit items and a form to input new Debit item
  render() {
    return (
      <div>
        <h1>Debits</h1>
        <h2>Account Balance: ${parseFloat(this.props.balance).toFixed(2)}</h2>
        <br/>
        <h3>Add a Debit</h3>
        <form onSubmit={this.handlesubmit}>
          <input
            type="text"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleDescriptionChange}
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.handleAmountChange}
            required
          />
          <button type="submit">Add Debit</button>
        </form>
        <ul>{this.debitsView()}</ul>
        <div>
          <Link to="/">Back to Home</Link>
          <br />
          <Link to="/credits">Credits</Link>
          <br />
          <Link to="/login">Login</Link>
          <br />
          <Link to="/userProfile">User Profile</Link>
        </div>
      </div>
    );
  }
}
export default Credits;