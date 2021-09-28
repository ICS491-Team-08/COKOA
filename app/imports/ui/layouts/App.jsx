import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Header, Menu } from 'semantic-ui-react';
import MainHeader from '../components/MainHeader';
import Footer from '../components/Footer';
import Landing from '../pages/Home';
import DailyCheckUp from '../pages/DailyCheckUp';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import PreLanding from '../pages/Landing';
import UserProfile from '../pages/UserProfile';
import VaccineRecord from '../pages/VaccineRecord';
import EditUserProfile from '../pages/EditUserProfile';
import LeftMenu from '../components/LeftMenu';
import RightMenu from '../components/RightMenu';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'Virtual ID',
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;
    return (
      <Router>
        {this.props.userId !== null && <MainHeader />}
        <div className="landing-body">
          {this.props.userId !== null && (
            <LeftMenu
              activeItem={activeItem}
              handleItemClick={this.handleItemClick}
            />
          )}
          <Switch>
            <Route exact path="/" component={PreLanding} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/signout" component={Signout} />
            <Route exact path="/home" component={Landing} />
            <ProtectedRoute path="/dailyCheckUp" component={DailyCheckUp} />
            <ProtectedRoute path="/userprofile" component={UserProfile} />
            <ProtectedRoute path="/vaccinerecord" component={VaccineRecord} />
            <ProtectedRoute
              path="/editUserProfile/:_id"
              component={EditUserProfile}
            />
            {/* <AdminProtectedRoute path="/admin" component={ListStuffAdmin} /> */}
            <Route component={NotFound} />
          </Switch>
          {this.props.userId !== null && <RightMenu />}
        </div>

        <Footer />
      </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/signin', state: { from: props.location } }}
        />
      );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      return isLogged && isAdmin ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/signin', state: { from: props.location } }}
        />
      );
    }}
  />
);

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// export default App;
export default withTracker(() => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const userId = Meteor.userId();
  return {
    userId,
  };
})(App);
