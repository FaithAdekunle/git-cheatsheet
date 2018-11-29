import React from 'react';
import PropTypes from 'prop-types';

const Command = ({ command, launchEditCommand, authorized, launchDeleteCommand }) => (
  <React.Fragment>
    {
      authorized ? (
        <div className="command-actions">
          <span
            className="edit-command-icon"
            onClick={() => launchEditCommand({
              commands: [{ ...command, key: Date.now() }],
              categoryId: '',
            })}
          >
            Edit
          </span>
            {' | '}
          <span
            className="delete-command-icon"
            onClick={() => launchDeleteCommand(command)}
          >
            Delete
          </span>
        </div>
      ) : ''
    }
    <div className="command-content">
      <div className="command-description">
        { command.description }
      </div>
      <code className="command-script">
        { command.script }
      </code>
    </div>
  </React.Fragment>
);

Command.propTypes = {
  command: PropTypes.objectOf(PropTypes.any).isRequired,
  launchEditCommand: PropTypes.func.isRequired,
  authorized: PropTypes.bool.isRequired,
  launchDeleteCommand: PropTypes.func.isRequired,
};

export default Command;
