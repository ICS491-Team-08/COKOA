import React from "react";
import {
  Header,
  Image,
  Divider,
  Dropdown,
  Sticky,
  Icon,
} from "semantic-ui-react";
import { NavLink } from "react-router-dom";

class MainHeader extends React.Component {
  render() {
    return (
      <div className="white-bg sticky">
        <div className="main-header">
          <div className="header-right flex-row">
            <Icon id="right-hamburger" name="big bars"></Icon>
          </div>
          <div className="flex-row">
            <Image
              src="/images/cokoa.png"
              size="small"
              as={NavLink}
              exact
              to="/home"
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
        <Divider style={{ margin: "unset" }} />
      </div>
    );
  }
}

export default MainHeader;
