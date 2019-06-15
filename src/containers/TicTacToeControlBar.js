import { connect } from 'react-redux';
import { NEW, UNDO, REDO } from '../constants/actions';
import { canUndo, canRedo, isNew } from '../selectors';
import ControlBar from '../components/ControlBar';
import { undoRedoAction } from '../actionCreators';

const mapStateToProps = state => ({
  isNewDisabled: isNew(state),
  isUndoDisabled: !canUndo(state),
  isRedoDisabled: !canRedo(state),
});

const mapDispatchToProps = dispatch => ({
  onNewClick: () => dispatch({ type: NEW }),
  onUndoClick: () => dispatch(undoRedoAction(UNDO)),
  onRedoClick: () => dispatch(undoRedoAction(REDO)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ControlBar);
