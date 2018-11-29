import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../common/modal';

const DeleteCommand = ({ command, abort, deleteCommand }) => (
  <React.Fragment>
    <Modal>
      <div className="delete-command">
        <h4>
          Delete
          {'    "'}
          <code>{command.script}</code>
          {'" command?'}
        </h4>
        <div className="underline" />
        <div className="text-right">
          <button type="button" className="abort-delete-command-button" onClick={abort}>
            Abort
          </button>
          <button type="button" className="delete-command-button" onClick={deleteCommand}>
            Delete
          </button>
        </div>
      </div>
    </Modal>
  </React.Fragment>
);

DeleteCommand.propTypes = {
  command: PropTypes.objectOf(PropTypes.any).isRequired,
  abort: PropTypes.func.isRequired,
  deleteCommand: PropTypes.func.isRequired,
};

export default DeleteCommand;
