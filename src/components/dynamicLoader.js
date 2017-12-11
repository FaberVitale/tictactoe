import React, { Component } from "react";
import { warn } from "../util/functionUtil";

const dynamicLoader = loader => {
  class DynamicLoader extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    storeComponent = esModule => {
      this.setState({
        component: esModule.default
      });
    };

    logFail = err => {
      warn(`failed fetch: ${err}`);
    };

    componentDidMount() {
      loader().then(this.storeComponent, this.logFail);
    }

    shouldComponentUpdate(_, nextState) {
      return !!(this.state.component || nextState.component);
    }

    render() {
      const Comp = this.state.component;

      return Comp ? <Comp {...this.props} /> : null;
    }
  }

  return DynamicLoader;
};

export default dynamicLoader;
