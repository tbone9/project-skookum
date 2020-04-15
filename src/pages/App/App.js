import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import MainPage from '../MainPage/MainPage';
import AthletePage from '../AthletePage/AthletePage';
import userService from '../../utils/userService';
import tokenService from '../../utils/tokenService';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser()
    }
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={() =>
            userService.getUser() ?
              <MainPage
                user={this.state.user}
                handleLogout={this.handleLogout}
              />
              :
              <Redirect to='/login' />
          } />
          <Route exact path='/signup' render={({ history }) =>
            <SignupPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          } />
          <Route exact path='/login' render={({ history }) =>
            <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          } />
          <Route exact path='/athlete/:id' component={AthletePage}
          // render={({ history }) =>
          //   <AthletePage
          //     {...this.props}
          //     history={history}
          />
          } />
        </Switch>

      </div>
    );
  }
}

export default App;
