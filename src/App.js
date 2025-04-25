/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor(props) {  // Create and initialize state
    super(props); 
    this.state = {
      accountBalance: 779,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  async componentDidMount() {  // Fetch data from the server

    // Fetch credits
    const creditsResponse = await axios.get('https://johnnylaicode.github.io/api/credits.json');
    this.setState({credits: creditsResponse.data});

    // Fetch debits
    const debitsResponse = await axios.get('https://johnnylaicode.github.io/api/debits.json');
    this.setState({debits: debitsResponse.data});
  }

  calculateTotal= (transactions) => {  // Calculate total balance
    if (!Array.isArray(transactions)) {
      return 0;
    }
    return transactions.reduce((total, transaction) => {  
      const amount = parseFloat(transaction.amount);
      return total + (isNaN(amount) ? 0 : amount);  
    }, 0);
  };

  updateAccountBalance = () => {  // Update account balance
    const creditsTotal = this.calculateTotal(this.state.credits);
    const debitsTotal = this.calculateTotal(this.state.debits);
    const updatedBalance = creditsTotal - debitsTotal;
    this.setState({accountBalance: parseFloat(updatedBalance.toFixed(2))});  // Rounding
  }

  //Add the credit entry
  addCredit = (credit) => {  
    const newCredit = {
      id: crypto.randomUUID(),
      description: credit.description.trim(),
      amount: credit.amount,
      date: new Date().toISOString().slice(0, 10),
      type: 'credit',
    };
    this.setState((prevState) => ({
      credits: [...prevState.credits, newCredit],
    }), () => {
      this.updateAccountBalance();
    });
  }

  //Add the debit entry
  addDebit = (debit) => {  
    const newDebit = {
      id: crypto.randomUUID(),
      description: debit.description.trim(),
      amount: debit.amount,
      date: new Date().toISOString().slice(0, 10),
      type: 'debit',
    };
    this.setState((prevState) => ({
      debits: [...prevState.debits, newDebit],
    }), () => {
      this.updateAccountBalance();
    });
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance.toFixed(2)} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits 
      credits={this.state.creditList}
      accountBalance ={this.state.accountBalance.toFixed(2)}
      addCredit={this.addCredit}
    />)
    const DebitsComponent = () => (<Debits debits={this.state.debitList}
      accountBalance ={this.state.accountBalance.toFixed(2)}
      addDebit={this.addDebit}  
    />)

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/bank-of-react-starter-code">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;