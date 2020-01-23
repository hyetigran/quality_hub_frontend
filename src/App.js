import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { connect } from 'react-redux';
import LoginForm from './components/Forms/LoginForm';
import SignUpForm from './components/Forms/SignUpForm';
import Dashboard from './components/Dashboard';
import UserDashboard from './views/UserDashboard/UserDashboard';
import CoachDashboard from './views/UserDashboard/CoachDashboard';
import Marketplace from './views/Marketplace/Marketplace';
import Landing from './components/Landing';
import InterviewerForm from './components/Forms/InterviewerForm';
import StudentForm from './components/Forms/StudentForm';
import UserTypePage from './components/UserType/UserTypePage';
import MainFaq from './components/FAQ/Main';
import LandingFaq from './components/FAQ/LandingFaq';
import Booking from './components/Booking/Booking';
import Feedback from './views/Feedback/Feedback';
import VideoChat from './components/Video/VideoChat';
import Chat from './components/Chat/ChatScreen';
import StartChat from './components/Chat/Chat';
import Settings from './views/Settings/Settings';
import GiveFeedback from './views/Feedback/GiveFeedback';

const globalTheme = createMuiTheme({
  typography: {
    fontFamily: ['Ubuntu', 'Abeezee'].join(','),
  },
});

function App(props) {
  const { user } = props.user;
  const routes = (
    <Switch>
      <Route path={'/dashboard'} component={UserDashboard} />
      <Route path={'/marketplace'} component={Marketplace} />
      <Route path={'/appointment'} component={Booking} />
      <Route path={'/feedback'} component={Feedback} />
      <Route path={'/givefeedback'} component={GiveFeedback} />
      <Route path={'/interview'} component={VideoChat} />
      <Route path={'/Settings'} component={Settings} />
      <Route path={'/FAQ'} component={MainFaq} />
      <Route path={'/start_chat'} component={StartChat} />
      <Route path={'/chat'} component={Chat} />
      <Redirect to='/dashboard' />
    </Switch>
  );

  const coachRoutes = (
    <Switch>
      <Route path={'/dashboard'} component={CoachDashboard} />
      <Route path={'/appointment'} component={Booking} />
      <Route path={'/feedback'} component={Feedback} />
      <Route path={'/givefeedback'} component={GiveFeedback} />
      <Route path={'/interview'} component={VideoChat} />
      <Route path={'/Settings'} component={Settings} />
      <Route path={'/FAQ'} component={MainFaq} />
      <Redirect to='/dashboard' />
    </Switch>
  );

  if (localStorage.getItem('token')) {
    return user.role_id === 1 ? (
      <ThemeProvider theme={globalTheme}>
        <Dashboard routes={routes} />
      </ThemeProvider>
    ) : (
      <ThemeProvider theme={globalTheme}>
        <Dashboard routes={coachRoutes} />
      </ThemeProvider>
    );
  }
  if (localStorage.getItem('tempuser')) {
    return (
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/userrole' component={UserTypePage} />
        <Route path='/interviewer' component={InterviewerForm} />
        <Route path='/student' component={StudentForm} />
        <Redirect to='/userrole' />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route path='/login/' component={LoginForm} />
      <Route path='/register' component={SignUpForm} />
      <Route path='/faq' component={LandingFaq} />
      <Redirect to='/' />
    </Switch>
  );
}

const mapStateToProps = state => {
  return {
    user: state.userReducer,
    isLoggedIn: state.userReducer.isLoggedIn,
    userHasChosenRole: state.userReducer.userHasChosenRole,
  };
};

export default connect(mapStateToProps)(App);
