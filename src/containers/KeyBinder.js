import React, { Component } from "react";
import MousetrapWrapper from "../components/MousetrapWrapper";
import { connect } from "react-redux";
import { getBoard, isGameOver, getModalState } from "../selectors";
import { symb, throttleTime } from "../constants";
import { throttle, $id, $disabled } from "../util/functionUtil";

const simulateClick = buttonId => {
  return () => {
    const elem = buttonId
      ? $id(buttonId) || document.activeElement
      : document.activeElement;

    if ($disabled(elem)) {
      return;
    }

    if (elem !== document.activeElement) {
      elem.focus();
    }

    elem.click();

    if ($disabled(elem)) {
      elem.blur(); //firefox keeps disabled buttons focused
    }
  };
};

const throttledSimulateClick = throttle(throttleTime, simulateClick());

const focusSelect = () => {
  if (document.activeElement.id !== "mode-list") {
    $id("mode-list").focus();
  }
};

class KeyBinder extends Component {
  shouldComponentUpdate() {
    return false;
  }

  triggerIf = cb => () => {
    if (this.props.shouldTrigger) {
      cb();
    }
  };

  move(mod, isGT) {
    if (this.props.isGO) {
      return;
    }

    const focusId = document.activeElement.id;
    let selected;

    if (!focusId || !focusId.startsWith("cell-")) {
      selected = this.props.board.indexOf(symb.empty);
    } else {
      let currIndex = parseInt(focusId.slice(5), 10);

      selected = currIndex + mod;

      if (selected < 0 || selected > 8) {
        return;
      }

      if (this.props.board[selected] !== symb.empty) {
        selected = isGT
          ? this.props.board.indexOf(symb.empty, selected + 1)
          : this.props.board.lastIndexOf(symb.empty, selected - 1);
      }
    }

    if (selected > -1) {
      $id(`cell-${selected}`).focus();
    }
  }

  render() {
    const moveLeft = this.triggerIf(
      throttle(throttleTime, this.move.bind(this, -1, false))
    );

    const moveRIght = this.triggerIf(
      throttle(throttleTime, this.move.bind(this, 1, true))
    );

    const moveUp = this.triggerIf(
      throttle(throttleTime, this.move.bind(this, -3, false))
    );

    const moveDown = this.triggerIf(
      throttle(throttleTime, this.move.bind(this, 3, true))
    );

    const undo = this.triggerIf(throttle(throttleTime, simulateClick("undo")));
    const redo = this.triggerIf(throttle(throttleTime, simulateClick("redo")));

    return (
      <MousetrapWrapper
        bindings={{
          w: moveUp,
          a: moveLeft,
          s: moveDown,
          d: moveRIght,
          e: this.triggerIf(throttledSimulateClick),
          "ctrl+z": undo,
          "ctrl+shift+z": redo,
          "ctrl+y": redo,
          n: this.triggerIf(throttle(throttleTime, simulateClick("new"))),
          m: this.triggerIf(throttle(throttleTime, focusSelect))
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  board: getBoard(state),
  isGO: isGameOver(state),
  shouldTrigger: !getModalState(state)
});

export default connect(mapStateToProps, null)(KeyBinder);
