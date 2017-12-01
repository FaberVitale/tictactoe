import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "../css/control-bar.css";
import MdUndo from "react-icons/lib/md/undo";
import MdRedo from "react-icons/lib/md/redo";
import { $disabled } from "../util/functionUtil";

class ControlBar extends PureComponent {
  constructor(props) {
    super(props);

    this.targetClick = null;
  }

  handleClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      return;
    }

    this.targetClick = evt.target;
  }

  componentDidUpdate() {
    if (this.targetClick && $disabled(this.targetClick)) {
      this.targetClick.blur();
    }
  }

  render() {
    const {
      isNewDisabled, onNewClick,
      isUndoDisabled, onUndoClick,
      isRedoDisabled, onRedoClick,
      isLargeScreen
    } = this.props;

    const elems = [
      (
        <button
          key={0}
          type="button"
          aria-label="new"
          id="new"
          className="control-bar-button"
          disabled={isNewDisabled}
          onClick={onNewClick}
        >new</button>
      ),
      (
        <button
          key={1}
          type="button"
          aria-label="undo"
          id="undo"
          className="control-bar-button"
          disabled={isUndoDisabled}
          onClick={onUndoClick}
        >{ControlBar.undo[+isLargeScreen] || ControlBar.undo[1]}</button>
      )
    ];

    return (
      <div className="control-bar"
        ref={this.getRef}
        onClick={this.handleClick}
      >
        {this.props.isLargeScreen ? elems : elems.reverse()}
        <button
          type="button"
          aria-label="redo"
          id="redo"
          className="control-bar-button"
          disabled={isRedoDisabled}
          onClick={onRedoClick}
        >{ControlBar.redo[+isLargeScreen] || ControlBar.redo[1]}</button>
      </div>
    );
  }
}

ControlBar.redo = [
  <MdRedo />,
  "redo",
];

ControlBar.undo = [
  <MdUndo />,
  "undo"
];


ControlBar.propTypes = {
  isNewDisabled: PropTypes.bool.isRequired,
  isUndoDisabled: PropTypes.bool.isRequired,
  isRedoDisabled: PropTypes.bool.isRequired,
  onNewClick: PropTypes.func.isRequired,
  onUndoClick: PropTypes.func.isRequired,
  onRedoClick: PropTypes.func.isRequired,
  isLargeScreen: PropTypes.bool.isRequired,
}

export default ControlBar;