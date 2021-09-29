import React from "react";
import { Button, Divider, Image, Transition } from "semantic-ui-react";

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class AnimationWraper extends React.Component {
  componentDidMount() {}
  render() {
    console.log(this.props.visible);
    return (
      <Transition
        visible={this.props.visible}
        animation="fade"
        duration={1000}
      >
        <div>{this.props.children}</div>
      </Transition>
    );
  }
}

export default AnimationWraper;

// export default class AnimationWraper extends React.Component {
//   constructor(props) {
//     super(props);
//     console.log("hiiiiiiiiiiiiiii");
//   }
//   render() {
//     console.log(this.props);
//     return (
//       <div>
//         <Transition
//           visible={this.props.visible}
//           animation="scale"
//           duration={500}
//         >
//           rjkljrlqjrwl
//         </Transition>
//       </div>
//     );
//   }
// }
