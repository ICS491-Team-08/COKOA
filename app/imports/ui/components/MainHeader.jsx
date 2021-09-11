import React from "react";
import { Header, Image, Divider } from "semantic-ui-react";

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
            <Header as="h1" style={{paddingLeft: "1rem"}}> MVID</Header>
          </div>
          <Header as="h1">My Virtual ID</Header>
          <div style={{ paddingRight: "3rem" }}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
              size="tiny"
              circular
            />
          </div>
        </div>
        <Divider />
      </div>
    );
  }
}

export default MainHeader;
