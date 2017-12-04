import React, { PureComponent } from "react";
import Modal from "../components/Modal";
import ModalTextContent from "../components/ModalTextContent";
import TicTacToeModeSelect from "./TicTacToeModeSelect";
import PropTypes from "prop-types";
import TurnCounter from "./TurnCounter";
import { OPEN_MODAL, CLOSE_MODAL } from "../constants/actions";
import { getModalState } from "../selectors";
import "../css/infoBar.css";
import { connect } from "react-redux";

class TicTacToeInfoBar extends PureComponent {
  render() {
    return this.props.isLargeScreen ? (
      <footer>
        <button type="button" id="footer-button" onClick={this.props.openModal}>
          about
        </button>
        <TurnCounter />
        <Modal
          shouldShow={this.props.isModalOpen}
          title="about section"
          close={this.props.closeModal}
        >
          <ModalTextContent />
        </Modal>
      </footer>
    ) : (
      <div className="info-bar">
        <TicTacToeModeSelect />
        <button type="button" id="footer-button" onClick={this.props.openModal}>
          about
        </button>
        <Modal
          shouldShow={this.props.isModalOpen}
          title="about section"
          close={this.props.closeModal}
        >
          <ModalTextContent />
        </Modal>
      </div>
    );
  }
}

TicTacToeInfoBar.propTypes = {
  isLargeScreen: PropTypes.bool.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isModalOpen: getModalState(state)
});

const mapDispatchToProps = dispatch => ({
  openModal: () => dispatch({ type: OPEN_MODAL }),
  closeModal: () => dispatch({ type: CLOSE_MODAL })
});

export default connect(mapStateToProps, mapDispatchToProps)(TicTacToeInfoBar);
