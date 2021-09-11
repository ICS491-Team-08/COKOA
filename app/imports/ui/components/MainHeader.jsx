import React from "react";
import { Header, Image, Divider, Dropdown } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

class MainHeader extends React.Component {
  render() {
    return (
      <div>
        <div className="main-header">
          <div
            style={{
              paddingLeft: "3rem",
              flexDirection: "row",
              display: "flex",
            }}
          >
            <Image src="https://react.semantic-ui.com/logo.png" size="tiny" />
            <Header as="h1" style={{ paddingLeft: "1rem" }}>
              MVID
            </Header>
          </div>
          <Header as="h1">My Virtual ID</Header>
          <div
            style={{
              paddingRight: "3rem",
              display: "flex",
              alignItems: "center",
            }}
          >
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
