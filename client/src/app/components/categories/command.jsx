import React from 'react';
import PropTypes from 'prop-types';

const Command = ({ command }) => (
  <React.Fragment>
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
};

export default Command;
