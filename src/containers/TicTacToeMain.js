import React, { PureComponent } from "react";
import TicTacToeRow from "./TicTacToeRow";
import TicTacToeControlBar from "./TicTacToeControlBar";
import "../css/board.css";
import PropTypes from "prop-types";
class TicTacToeMain extends PureComponent {
  render() {
    /*
     * reorder markup in order to not mess up
     *  the focus order for mobile screen-readers
    */
    const elems = [
      (
        <div
          className="board" key={0}
        >
          <TicTacToeRow
            rowIndex={0}
          />
          <div
            className="row-separator"
            aria-hidden="true">
          </div>
          <TicTacToeRow rowIndex={1}
          />
          <div
            className="row-separator"
            aria-hidden="true">
          </div>
          <TicTacToeRow
            rowIndex={2}
          />
        </div>),
      (
        <TicTacToeControlBar
          isLargeScreen={this.props.isLargeScreen}
          key={1}
        />
      )
    ];
    return (
      <main>
        {
          this.props.isLargeScreen ? elems : elems.reverse()
        }
      </main>
    );
  }
}

TicTacToeMain.propTypes = {
  isLargeScreen: PropTypes.bool.isRequired
}

export default TicTacToeMain;