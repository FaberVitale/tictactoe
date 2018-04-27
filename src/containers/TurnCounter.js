import React from "react";
import { connect } from "react-redux";
import { getTurn } from "../selectors";
import { areBoardsEqual } from "../util/functionUtil";

const TurnCounter = ({ turn }) => {
  return <p className="info-label">{`turn: ${turn}`}</p>;
};

const mapStateToProps = state => ({
  turn: getTurn(state)
});

const connectOptions = {
  areStatesEqual: areBoardsEqual
};

export default connect(mapStateToProps, null, null, connectOptions)(
  TurnCounter
);
