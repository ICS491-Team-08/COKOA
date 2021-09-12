import React from "react";
import { Header, Image, Divider, Dropdown } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

class MainHeader extends React.Component {
  render() {
    return (
      <div>
        <div className="main-header">
          <div className="header-right">
            <Image src="https://react.semantic-ui.com/logo.png" size="tiny" />
            <Header as="h1" className="header-right-name">
              MVID
            </Header>
          </div>
          <Header as="h1">My Virtual ID</Header>
          <div className="header-left">
            {/* <Image
              src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
              size="tiny"
              circular
            /> */}
            <Dropdown
              id="navbar-current-user"
              text={this.props.currentUser}
              pointing="top right"
              icon={"big user"}
            >
              <Dropdown.Menu>
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
        <Divider />
      </div>
    );
  }
}

export default MainHeader;
