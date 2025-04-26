/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
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
    const newCredit = {
      description: this.state.description,
      amount: parseFloat(this.state.amount),
    };
    this.props.addCredit(newCredit);
    this.setState({ description: '', amount: '' });
  };

  // Render the credits list
  creditsView = () => {
    return this.props.credits.map((credit, index) => (
      <li key={index}>
        {credit.description}: ${credit.amount.toFixed(2)}
      </li>
    ));
  };
  

  render() {
    return (
      <div>
        <h1>Credits</h1>
        <h2>Account Balance: ${parseFloat(this.props.accountBalance).toFixed(2)}</h2>
        <br/>
        <h3>Add a Credit</h3>
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
          <button type="submit">Add Credit</button>
        </form>
        <hr />
        <div style={{ color: 'red' }}>
          <h3>For Reference Only:</h3>
          <p>Account Balance = Total Credit - Total Debit</p>
          <p>Total Credit = ${this.props.totalCredit}</p>
          <p>Total Debit = ${this.props.totalDebit}</p>
          <p>Account Balance = ${this.props.accountBalance}</p>
        </div>
        <ul>{this.creditsView()}</ul>
        <div style={{ marginTop: '20px' }}>
          <Link to="/">Back to Home</Link>
          <br />
          <Link to="/debits">Debits</Link>
          <br />
          <Link to="/userProfile">User Profile</Link>
          <br />
          <Link to="/login">Login</Link>
          </div>
      </div>
    );
  }
}
export default Credits;