/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import React from 'react';
import AccountBalance from './AccountBalance';

const Credits = (props) => {
  const formatCurrency = (amount) => {
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  let creditsView = () => {
    if (props.credits.length === 0) {
      return <p>No credits available.</p>;
    }
    return props.credits.map((credit) => {
      let date = credit.date ? credit.date.slice(0, 10) : 'N/A';
    return (
      <div key={credit.id}>
        <p>{credit.description}</p>{}
        <p>{formatCurrency(credit.amount)}</p>
        <p>{date}</p>
      </div>
    );
    });
  }

  const handlesubmit = (e) => {
    e.preventDefault();
    const credit = {
      description: e.target.description.value,
      amount: parseFloat(e.target.amount.value),
    };
    props.addCredit(credit);
    e.target.reset();
  }
  
  

  return (
    <div>
      <h1>Credits</h1>
      <AccountBalance accountBalance={props.accountBalance} />
      <br/>

      <div>
        <h2>Credit History</h2>
        <ul>
          {creditsView()}
        </ul>
      </div>

      <h2>Add a new credit</h2>
      <form onSubmit={handlesubmit}>
        <label>
          Description:
          <input type="text" name="description" required />
        </label>
        <br />
        <label>
          Amount:
          <input type="number" name="amount" required />
        </label>
        <br />
        <button type="submit">Add Credit</button>
        </form>
      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Credits;