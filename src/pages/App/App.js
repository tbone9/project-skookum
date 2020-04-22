import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

//---- Pages ----//
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import MainPage from '../MainPage/MainPage';
import AthletePage from '../AthletePage/AthletePage';

//------Components------//
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';

//---- Utilities ----//
import userService from '../../utils/userService';

//---- Styles ----//
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

        <NavBar
          className='header'
          user={this.state.user}
          handleLogout={this.handleLogout}
        />
        <div className='main'>
          <Switch>

            <Route exact path='/' render={() =>
              userService.getUser() ?
                <ErrorBoundary>
                  <MainPage
                    user={this.state.user}
                    handleLogout={this.handleLogout}
                  />
                </ErrorBoundary>
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
        <Footer className='footer' />
      </div>
    );
  }
}

export default App;
