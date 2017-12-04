import React from "react";
import Listbox from "../components/Listbox";
import { getGameModeIndex } from "../selectors";
import { setGameMode } from "../actionCreators";
import { gameModeValues } from "../constants";
import { connect } from "react-redux";
import "../css/top-bar.css";

const labelId = "mode-label";
const listBoxId = "mode-list";

const ModeSelect = ({ selectedIndex, handleItemClick }) => {
  return (
    <div className="top-bar">
      <span className="info-label" id={labelId}>
        mode
      </span>
      <Listbox
        id={listBoxId}
        items={gameModeValues}
        label={labelId}
        selectedIndex={selectedIndex}
        handleItemClick={handleItemClick}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  selectedIndex: getGameModeIndex(state)
});

const mapDispatchToProps = dispatch => ({
  handleItemClick: mode => {
    dispatch(setGameMode(mode));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ModeSelect);
