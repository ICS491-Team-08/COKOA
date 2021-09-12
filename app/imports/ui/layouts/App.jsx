import React from "react";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";
import "semantic-ui-css/semantic.css";
import { Roles } from "meteor/alanning:roles";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import MainHeader from "../components/MainHeader";
import Footer from "../components/Footer";
import Landing from "../pages/Landing";
import ListStuff from "../pages/ListStuff";
import ListStuffAdmin from "../pages/ListStuffAdmin";
import AddStuff from "../pages/AddStuff";
import EditStuff from "../pages/EditStuff";
import NotFound from "../pages/NotFound";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Signout from "../pages/Signout";
import PreLanding from "../pages/PreLanding";
import { withTracker } from "meteor/react-meteor-data";
import { Header, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const Left = ({ activeItem, handleItemClick }) => {
  return (
    <div className="left-nav-menu">
      <Menu vertical>
        <Menu.Item>
          <Menu.Header>Home</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name="Virtual ID"
              active={activeItem === "Virtual ID"}
              onClick={handleItemClick}
              as={NavLink}
              exact
              to="/home"
            />
            <Menu.Item
              name="Usage"
              active={activeItem === "Usage"}
              onClick={handleItemClick}
            />
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Status</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name="Daily Check Up"
              active={activeItem === "Daily Check Up"}
              onClick={handleItemClick}
              as={NavLink}
              exact
              to="/add"
            />
            <Menu.Item
              name="History"
              active={activeItem === "History"}
              onClick={handleItemClick}
            />
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Information</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name="Vaccination Record"
              active={activeItem === "Vaccination Record"}
              onClick={handleItemClick}
              as={NavLink}
              exact
              to="/list"
            />
            <Menu.Item
              name="Personal Record"
              active={activeItem === "Personal Record"}
              onClick={handleItemClick}
              as={NavLink}
              exact
              to="/edit/:_id"
            />
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>Support</Menu.Header>

          <Menu.Menu>
            <Menu.Item
              name="email"
              active={activeItem === "email"}
              onClick={handleItemClick}
            >
              E-mail Support
            </Menu.Item>

            <Menu.Item
              name="faq"
              active={activeItem === "faq"}
              onClick={handleItemClick}
            >
              FAQs
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    </div>
  );
};

const Right = (activeItem) => {
  return (
    <div className="right-nav-menu">
      <Menu vertical>
        <Menu.Item
          name="promotions"
          active={activeItem === "promotions"}
          onClick={this.handleItemClick}
        >
          <Header as="h4">CDC Guidance</Header>
          <p>Check out CDC Guidance webpage</p>
        </Menu.Item>

        <Menu.Item
          name="coupons"
          active={activeItem === "coupons"}
          onClick={this.handleItemClick}
        >
          <Header as="h4">Hawaii Guidance</Header>
          <p>Check out Hawaii Guidance webpage</p>
        </Menu.Item>

        <Menu.Item
          name="rebates"
          active={activeItem === "rebates"}
          onClick={this.handleItemClick}
        >
          <Header as="h4">Covid-19 Testing Center</Header>
          <p>Visit nearest Covid-19 Testing Center</p>
        </Menu.Item>
      </Menu>
    </div>
  );
};

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "Virtual ID",
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
        <div>
          {this.props.userId !== null && <MainHeader />}
          <div className="landing-body">
            {this.props.userId !== null && (
              <Left
                activeItem={activeItem}
                handleItemClick={this.handleItemClick}
              />
            )}
            <Switch>
              <Route exact path="/" component={PreLanding} />
              <Route exact path="/home" component={Landing} />
              <Route path="/signin" component={Signin} />
              <Route path="/signup" component={Signup} />
              <Route path="/signout" component={Signout} />
              <ProtectedRoute path="/list" component={ListStuff} />
              <ProtectedRoute path="/add" component={AddStuff} />
              <ProtectedRoute path="/edit/:_id" component={EditStuff} />
              <AdminProtectedRoute path="/admin" component={ListStuffAdmin} />
              <Route component={NotFound} />
            </Switch>
            {this.props.userId !== null && <Right />}
          </div>

          <Footer />
        </div>
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
          to={{ pathname: "/signin", state: { from: props.location } }}
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
      const isAdmin = Roles.userIsInRole(Meteor.userId(), "admin");
      return isLogged && isAdmin ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/signin", state: { from: props.location } }}
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
