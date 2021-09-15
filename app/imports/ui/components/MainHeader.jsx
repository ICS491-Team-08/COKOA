import React from "react";
import {
  Header,
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
      active: false,
    };
    this.HorizontalSidebar = this.HorizontalSidebar.bind(this);
    this.onMenuClick = this.onMenuClick.bind(this);
  }
  onMenuClick() {
    this.setState((prev) => {
      return { active: !prev.active };
    });
  }
  HorizontalSidebar({ visible }) {
    return (
      <Sidebar
        as={Segment}
        animation="push"
        direction="top"
        visible={visible}
      >
        <Grid textAlign="center" className="horizontal-side-bar">
          <Grid.Row columns={3}>
            <Grid.Column>
              <Image src="/images/wireframe/media-paragraph.png" />
              <Button onClick={this.onMenuClick}/>
              Home
            </Grid.Column>
            <Grid.Column>
              <Image src="/images/wireframe/media-paragraph.png" />
              Daily Check Up
            </Grid.Column>
            <Grid.Column>
              <Image src="/images/wireframe/media-paragraph.png" />
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
        <this.HorizontalSidebar visible={this.state.active} />
        <div className="main-header" style={{display: !this.state.active ? "flex" : "none"}}>
          <div className="header-right flex-row">
            <Button
              id="right-hamburger"
              icon="big bars"
              as={Button}
              onClick={this.onMenuClick}
            />
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
