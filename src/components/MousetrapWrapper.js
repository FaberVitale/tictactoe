import { Component } from "react";
import PropTypes from "prop-types";
import Mousetrap from "mousetrap";

class MousetrapWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bindings: props.bindings
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    for (let key in this.state.bindings) {
      Mousetrap.bind(key, this.state.bindings[key]);
    }
  }

  componentWillUnmount() {
    for (let key in this.state.bindings) {
      Mousetrap.unbind(key);
    }
  }

  render() {
    return null;
  }
}

MousetrapWrapper.propTypes = {
  bindings: PropTypes.objectOf(PropTypes.func)
}

export default MousetrapWrapper;