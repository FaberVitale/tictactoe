import React, { PureComponent } from "react";
import TicTacToeModeSelect from "./TicTacToeModeSelect";
import PropTypes from "prop-types";

class TicTacToeHeader extends PureComponent {
  render() {
    return (
      <header>
        <h1>TicTacToe</h1>
        {this.props.isLargeScreen ? <TicTacToeModeSelect /> : null}
      </header>
    );
  }
}

TicTacToeHeader.propTypes = {
  isLargeScreen: PropTypes.bool.isRequired
};

export default TicTacToeHeader;
