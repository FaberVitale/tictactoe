import React, { Component } from "react";

const plus = " + ";
const or = " | ";

class ModalTextContent extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return [
      <section key={0}>
        <h2>How to play</h2>
        <p>
          Place 3 crosses in a line to Win.<br />
          Select <em>easy, medium, unfair</em> to play against the ai or{" "}
          <em>pvp</em> to play with a friend.
        </p>
      </section>,
      <section key={1}>
        <h2>Controls</h2>
        <h3>Mouse/Touch</h3>
        <p>
          Left Click to place a cross.<br />
          Click on <em>new</em> to play a new game. Click on{" "}
          <em>undo or redo</em> to replay previous turns.
        </p>
        <h3>Keyboard</h3>
        <ul className="keybindings-list">
          <li>
            <kbd>w</kbd> <kbd>a</kbd> <kbd>s</kbd> <kbd>d</kbd> - select a cell
          </li>
          <li>
            <kbd>e</kbd>
            {or}
            <kbd>spacebar</kbd>
            {or}
            <kbd>enter</kbd> - place a cross
          </li>
          <li>
            <kbd>n</kbd> - play a new game
          </li>
          <li>
            <kbd>m</kbd> - select game mode
          </li>
          <li>
            <kbd>ctrl</kbd>
            {plus}
            <kbd>z</kbd> - undo
          </li>
          <li>
            <kbd>ctrl</kbd>
            {plus}
            <kbd>shift</kbd>
            {plus}
            <kbd>z</kbd>
            {or}
            <kbd>ctrl</kbd>
            {plus}
            <kbd>y</kbd> - redo
          </li>
        </ul>
      </section>,
      <section key={2}>
        <h3>Author:</h3>
        <em>Fabrizio Vitale</em>
      </section>
    ];
  }
}

export default ModalTextContent;
