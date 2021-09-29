import React from "react";
import {
  Image,
  Divider,
  Dropdown,
  Icon,
  Segment,
  Sidebar,
  Grid,
  Button,
} from "semantic-ui-react";
import { NavLink } from "react-router-dom";

class MainHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMainNav: true,
      activeMenuNav: false,
    };
    this.HorizontalSidebar = this.HorizontalSidebar.bind(this);
    this.activeMain = this.activeMain.bind(this);
    this.activeMenu = this.activeMenu.bind(this);
    this.mainHeader = this.mainHeader.bind(this);
  }
  activeMenu() {
    this.setState((prev) => {
      return { activeMenuNav: !prev.activeMenuNav };
    });
  }
  activeMain() {
    this.setState((prev) => {
      return { activeMainNav: !prev.activeMainNav };
    });
  }
  mainHeader({ visible }) {
    return (
      <Sidebar
        as={Segment}
        animation="overlay"
        direction="top"
        visible={visible}
        className="main-header-1"
        onHidden={this.activeMenu}
      >
        <div
          className="main-header"
          style={{
            display: !this.state.active ? "flex" : "none",
            overflow: "visible",
          }}
        >
          <div className="header-right flex-row">
            <Button
              id="right-hamburger"
              icon="big bars"
              as={Button}
              onClick={this.activeMain}
            />
          </div>
          <div className="flex-row">
            <Image
              src="/images/cokoa.png"
              as={NavLink}
              exact
              to="/home"
              style={{ width: "9rem" }}
            />
            {/* <Header as="h1" className="header-right-name">
              COKOA
            </Header> */}
          </div>

          <div className="header-left">
            <Dropdown
              id="navbar-current-user"
              text={this.props.currentUser}
              pointing="top right"
              icon={"big user"}
            >
              <Dropdown.Menu>
                <Dropdown.Item
                  id="navbar-user-profile"
                  icon="user"
                  text="My Profile"
                  as={NavLink}
                  exact
                  to="/userprofile"
                />
                <Dropdown.Item
                  id="navbar-sign-out"
                  icon="sign out"
                  text="Sign Out"
                  as={NavLink}
                  exact
                  to="/signout"
                />
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </Sidebar>
    );
  }

  HorizontalSidebar({ visible }) {
    return (
      <Sidebar
        as={Segment}
        animation="overlay"
        direction="top"
        visible={visible}
        onHidden={this.activeMain}
      >
        <Grid textAlign="center" className="horizontal-side-bar">
          <Grid.Row columns={3}>
            <Grid.Column className="flex-column">
              <Button
                icon="huge home"
                style={{ backgroundColor: "white" }}
                as={NavLink}
                to="/home"
                onClick={this.activeMenu}
              ></Button>
              Home
            </Grid.Column>
            <Grid.Column className="flex-column">
              <Button
                icon="huge check circle outline"
                style={{ backgroundColor: "white" }}
                as={NavLink}
                to="/dailyCheckUp"
                onClick={this.activeMenu}
              ></Button>
              Check Up
            </Grid.Column>
            <Grid.Column className="flex-column">
              <Button
                icon="huge address card outline"
                style={{ backgroundColor: "white" }}
                as={NavLink}
                to="/userprofile"
                onClick={this.activeMenu}
              ></Button>
              Profile
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Sidebar>
    );
  }

  render() {
    return (
      <div className="white-bg sticky">
        <this.mainHeader visible={this.state.activeMainNav} />
        <this.HorizontalSidebar visible={this.state.activeMenuNav} />
        <Divider style={{ margin: "unset" }} />
      </div>
    );
  }
}

export default MainHeader;
