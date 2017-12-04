import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class OptionItem extends PureComponent {
  render() {
    return (
      <li
        className="option-item option-item-theme"
        role="option"
        aria-selected={this.props.isSelected}
        id={this.props.id}
      >
        <span>{this.props.isSelected ? "✓" : " "}</span>
        <span>{this.props.text}</span>
      </li>
    );
  }
}

OptionItem.propTypes = {
  id: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};
