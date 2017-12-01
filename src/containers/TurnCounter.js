import React from "react";
import { connect } from "react-redux";
import { getTurn, getBoard } from "../selectors";
import { defaultMergeProps } from "../util/functionUtil";

const TurnCounter = ({ turn }) => {
  return (
    <p className="info-label">{`turn: ${turn}`}</p>
  );
};


const mapStateToProps = (state) => ({
  turn: getTurn(state)
})

const connectOptions = {
  "areStatesEqual": (next, prev) => getBoard(next) === getBoard(prev)
}

export default connect(
  mapStateToProps, null, defaultMergeProps, connectOptions
)(TurnCounter);