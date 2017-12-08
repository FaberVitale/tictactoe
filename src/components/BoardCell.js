import React, { PureComponent } from "react";
import "../css/board-cell.css";
import PropTypes from "prop-types";
import { symbToA11y } from "../constants";
import { lines } from "../constants";
import { $disabled } from "../util/functionUtil";

export const cellStates = {
  IDLE: 0,
  FILLED: 1,
  VICTORY: 2
};

const mapStateToCellClassName = [
  "board-cell idle",
  "board-cell disabled",
  "board-cell disabled victory"
];

const mapStateToPClassName = ["empty", "filled-animated", "filled-animated"];

const BoardCell = class extends PureComponent {
  constructor(props) {
    super(props);

    this.handleClick = props.handleClick(props.cellIndex);

    this.id = `cell-${this.props.cellIndex}`;
    this.prevCellState = -1;
  }

  handleTouchStart = evt => {
    // touch events fire on disabled buttons
    if (this.props.isDisabled) {
      return;
    }

    this.handleClick();
  };

  componentWillUpdate() {
    this.prevCellState = this.props.cellState;
  }

  getRef = elem => {
    this.buttonElem = elem;
  };
  /* computes P className avoids fadeIn animations on undo*/
  getPClassName() {
    if (
      this.prevCellState > -1 &&
      this.prevCellState === cellStates.VICTORY &&
      this.props.cellState === cellStates.FILLED
    ) {
      return "filled";
    }

    return mapStateToPClassName[this.props.cellState];
  }

  componentDidUpdate() {
    if (
      document.activeElement === this.buttonElem &&
      $disabled(this.buttonElem)
    ) {
      this.buttonElem.blur(); ///firefox keeps focused blurred buttons
    }
  }
  render() {
    return (
      <button
        type="button"
        id={this.id}
        ref={this.getRef}
        className={mapStateToCellClassName[this.props.cellState]}
        onClick={this.handleClick}
        onTouchStart={this.handleTouchStart}
        onAnimationEnd={this.handleAnimEnd}
        disabled={this.props.isDisabled}
        aria-label={`${this.props.ariaLabel}: ${symbToA11y[this.props.value]}`}
      >
        <div className="victory-overlay" aria-hidden="true" />
        <p className={this.getPClassName()}>{this.props.value}</p>
      </button>
    );
  }
};

BoardCell.getCellState = (winnerLine, isDisabled, cellIndex) => {
  let res;

  if (winnerLine < 0) {
    if (isDisabled) {
      res = cellStates.FILLED;
    } else {
      res = cellStates.IDLE;
    }
  } else {
    if (winnerLine > -1 && lines[winnerLine].indexOf(cellIndex) > -1) {
      res = cellStates.VICTORY;
    } else {
      res = cellStates.FILLED;
    }
  }
  return res;
};

BoardCell.propTypes = {
  cellIndex: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  cellState: PropTypes.number.isRequired,
  ariaLabel: PropTypes.string.isRequired
};

export default BoardCell;
