import React from "react";
import { connect } from "react-redux";
import BoardCell from "../components/BoardCell";
import { getRow, isGameOver, getWinnerLine, getBoard } from "../selectors";
import symb, { cellAriaLabel } from "../constants";
import { placeSign } from "../actionCreators";
import "../css/board-row.css";
import propTypes from "prop-types";
import { defaultMergeProps } from "../util/functionUtil";

const cellIndexes = [0, 1, 2];

const renderSquare =
  (cellIndex, onCellClick, value, cellState, isDisabled) => {
    return (
      <BoardCell
        key={cellIndex}
        cellIndex={cellIndex}
        handleClick={onCellClick}
        value={value}
        isDisabled={isDisabled}
        cellState={cellState}
        ariaLabel={cellAriaLabel[cellIndex]}
      />
    );
  }

const TicTacToeRow = ({
  rowIndex,
  onCellClick,
  rowVals,
  isGameOver,
  winnerLine
}) => {
  return (
    <div className="board-row">
      {cellIndexes.map(ind => {
        const value = rowVals[ind];
        const cellIndex = 3 * rowIndex + ind;
        const isDisabled = value !== symb.empty || isGameOver;
        const cellState =
          BoardCell.getCellState(winnerLine, isDisabled, cellIndex);

        return (
          renderSquare(cellIndex, onCellClick, value, cellState, isDisabled)
        );
      })
      }
    </div>
  );
};


const mapStateToProps = (state, ownProps) => ({
  rowVals: getRow(ownProps.rowIndex)(state),
  isGameOver: isGameOver(state),
  winnerLine: getWinnerLine(state)
});

const mapDispatchToProps = (dispatch) => ({
  onCellClick: (cellIndex) => () => dispatch(placeSign(cellIndex))
});

const connectOptions = {
  "areStatesEqual": (next, prev) => getBoard(next) === getBoard(prev)
}

TicTacToeRow.propTypes = {
  rowIndex: propTypes.number.isRequired,
  onCellClick: propTypes.func.isRequired,
  rowVals: propTypes.string.isRequired,
  isGameOver: propTypes.bool.isRequired,
  winnerLine: propTypes.number.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  defaultMergeProps,
  connectOptions
)(TicTacToeRow);