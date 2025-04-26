/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import Home from "./components/Home"
import UserProfile from "./components/UserProfile"
import LogIn from "./components/Login"
import Credits from "./components/Credits"
import Debits from "./components/Debits"


class App extends Component {
  constructor(props) {  
    super(props); 
    this.state = {
      accountBalance: 0,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  async componentDidMount() {  

    try {
    // Fetch credits
    const creditsResponse = await axios.get('https://johnnylaicode.github.io/api/credits.json');
    const credits = creditsResponse.data;

    // Fetch debits
    const debitsResponse = await axios.get('https://johnnylaicode.github.io/api/debits.json');
    const debits = debitsResponse.data;

    const creditsTotal = credits.reduce((sum,item) => sum + item.amount, 0); 
    const debitsTotal = debits.reduce((sum,item) => sum + item.amount, 0);
    const updatedBalance = creditsTotal - debitsTotal;
    this.setState({
      accountBalance: parseFloat(updatedBalance.toFixed(2)), // Rounding
      creditList: credits,
      debitList: debits
    });  
    }

    catch (error) {
      console.error('Error fetching data from the API:', error);
    }
  }

  //Add the credit entry
  addCredit = (credit) => {  
    this.setState((prevState) => {
      const newCredit = [...prevState.creditList, credit];
      const totalCredits = newCredit.reduce((sum, item) => sum + item.amount, 0);
      const totalDebits = prevState.debits.reduce((sum, item) => sum + item.amount, 0);
      const updatedBalance = totalCredits - totalDebits;
      return {
        credits: newCredit,
        accountBalance: parseFloat(updatedBalance.toFixed(2)),  // Rounding
      };
    });
  }

  //Add the debit entry
  addDebit = (debit) => {
    this.setState((prevState) => {
      const newDebit = [...prevState.debitList, debit];
      const totalCredits = prevState.credits.reduce((sum, item) => sum + item.amount, 0);
      const totalDebits = newDebit.reduce((sum, item) => sum + item.amount, 0);
      const updatedBalance = totalCredits - totalDebits;
      return {
        debits: newDebit,
        accountBalance: parseFloat(updatedBalance.toFixed(2)),
      };
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
    const totalCredits = this.state.creditList.reduce((sum, c) => sum + c.amount, 0).toFixed(2);
    const totalDebits = this.state.debitList.reduce((sum, d) => sum + d.amount, 0).toFixed(2); 
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
      totalCredit={totalCredits}
      totalDebit={totalDebits}
    />)
    const DebitsComponent = () => (<Debits 
      debits={this.state.debitList}
      accountBalance ={this.state.accountBalance.toFixed(2)}
      addDebit={this.addDebit}
      totalCredit={totalCredits}
      totalDebit={totalDebits}
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