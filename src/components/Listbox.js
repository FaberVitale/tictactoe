import React, { PureComponent } from "react";
import "../css/listbox.css";
import FaCaretRight from "react-icons/lib/fa/caret-right";
import OptionItem from "./OptionItem";
import PropTypes from "prop-types";
import { throttle } from "../util/functionUtil";
import { throttleTime } from "../constants";

const optionListClassLists = {
  visible: "option-list option-list-theme option-list-visible",
  hidden: "option-list option-list-theme option-list-hidden",
  hiddenAnimOver: "option-list option-list-theme option-list-anim-over"
}

const svgAnimatorClassList = {
  visible: "svg-animator rotate-90",
  hidden: "svg-animator"
}

const getOptionClass = (isVisible, isAnimating) => isVisible ?
  optionListClassLists.visible :
  isAnimating ?
    optionListClassLists.hidden :
    optionListClassLists.hiddenAnimOver

const getOptionId = (parentId, index) => `${parentId}-option-${index}`;
const getOptionIndex = (parentId, optionId) =>
  parseInt(optionId.slice(parentId.length + 8), 10);


export default class Listbox extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      isAnimating: false,
    }

  }

  getRef = (elem) => {
    this.elem = elem;
  }

  makeList = () => {
    return (
      this.props.items.map(
        function makeOption(item, index) {

          return (
            <OptionItem
              id={getOptionId(this.props.id, index)}
              key={index}
              text={item}
              isSelected={this.props.selectedIndex === index}
            />
          );
        }, this)
    );
  }

  setVisibility = throttle(throttleTime, (visibility) => {
    this.setState(prevState => {
      if (prevState.isVisible !== visibility) {
        return {
          isVisible: visibility,
          isAnimating: true
        }
      }
    });
  });

  handleKeyDown = throttle(throttleTime, (e) => {
    let isKnownKey = true;
    switch (e.key) {
      case "ArrowUp":
      case "ArrowLeft":
        if (this.props.selectedIndex > 0) {
          this.props.handleItemClick(this.props.items[
            this.props.selectedIndex - 1
          ]);
        }
        break;

      case "ArrowDown":
      case "ArrowRight":
        if (this.props.selectedIndex < this.props.items.length - 1) {
          this.props.handleItemClick(this.props.items[
            this.props.selectedIndex + 1
          ]);
        }
        break;

      case "Escape":
        if (this.state.isVisible) {
          this.setVisibility(false);
        }
        break;
      case "Enter":
      case " ":  //Spacebar
        this.setVisibility(!this.state.isVisible);
        break;
      default: //unknown key
        isKnownKey = false;
    }
    if (isKnownKey) {
      e.preventDefault();
    }
  });

  handleClick = (e) => {
    const elem = e.target;

    if (elem === this.elem ||
      elem.parentElement === this.elem
    ) {
      this.setVisibility(!this.state.isVisible);
    }

    else {
      let optionId = elem.id || elem.parentElement.id;
      this.props.handleItemClick(
        this.props.items[getOptionIndex(this.props.id, optionId)]

      );
      this.setVisibility(false);
    }
  }

  handleBlur = (e) => {
    if (e.target === this.elem) {
      this.setVisibility(false);
    }
  }

  handleTransitionEnd = () => this.setState({
    isAnimating: false
  })

  render() {
    return (
      <div
        ref={(el) => { this.elem = el; }}
        id={this.props.id}
        className="listbox listbox-theme"
        role="listbox"
        tabIndex={0}
        aria-haspopup="true"
        aria-expanded={this.state.isVisible}
        aria-activedescendant={getOptionId(this.props.id, this.props.selectedIndex)}
        aria-labelledby={this.props.label || null}
        aria-describedby={this.props.describer || null}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        onTransitionEnd={this.handleTransitionEnd}
      >
        <div className="listbox-button listbox-button-theme">
          <div
            aria-hidden="true"
            className={
              this.state.isVisible ?
                svgAnimatorClassList.visible :
                svgAnimatorClassList.hidden
            }
          >
            <FaCaretRight />
          </div>
          <span>{this.props.items[this.props.selectedIndex]}</span>
        </div>
        <ul
          className={
            getOptionClass(this.state.isVisible, this.state.isAnimating)
          }
        >
          {this.makeList()}
        </ul>
      </div >
    );
  }
}

Listbox.propTypes = {
  id: PropTypes.string.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  handleItemClick: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string,
  describer: PropTypes.string,
}