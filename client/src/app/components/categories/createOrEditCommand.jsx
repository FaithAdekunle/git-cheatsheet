import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../common/modal';

class CreateOrEditCommand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commands: props.commands,
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.abort = this.abort.bind(this);
    this.validate = this.validate.bind(this);
    this.createOrEditCommand = this.createOrEditCommand.bind(this);
    this.validateCommand = this.validateCommand.bind(this);
    this.addCommand = this.addCommand.bind(this);
    this.removeCommand = this.removeCommand.bind(this);
  }

  onChange(event, key) {
    const { commands, errors } = this.state;
    const command = commands.find(command => command.key === key);
    const { target } = event;
    if (target.name === 'keywords') {
      command.keywords = target.value.split(',');
    } else {
      command[target.name] = target.value;
      if (errors[command.key]) this.validateCommand(command);
    }
    this.setState({ commands });
  }

  addCommand() {
    const { commands } = this.state;
    commands.push({
      script: '',
      description: '',
      keywords: [],
      key: Date.now(),
    });
    this.setState({ commands });
  }

  removeCommand(key) {
    const { commands } = this.state;
    this.setState({ commands: commands.filter(command => command.key !== key) });
  }

  validateCommand(command) {
    const { errors } = this.state;
    let error = '';
    let valid = true;
    if (!command.script.trim() && !command.description.trim()) {
      error = 'script and description fields cannot be empty';
      valid = false;
    } else {
      ['script', 'description'].forEach((field) => {
        if (!command[field].trim()) {
          error = `${field} field cannot be empty`;
          valid = false;
        }
      });
    }
    errors[command.key] = error;
    this.setState({ errors });
    return valid;
  }

  validate() {
    const { commands } = this.state;
    let valid = true;
    commands.forEach((command) => {
      const commandIsValid = this.validateCommand(command);
      if (valid && !commandIsValid) valid = false;
    });
    return valid;
  }

  createOrEditCommand(event) {
    event.preventDefault();
    const { createOrEditCommand, categoryId } = this.props;
    const { commands } = this.state;
    if (this.validate()) createOrEditCommand({ commands, categoryId });
  }

  abort() {
    const { abort, categoryId } = this.props;
    const { commands } = this.state;
    abort({ commands, categoryId });
  }

  render() {
    const { commands, errors } = this.state;
    const { categoryId } = this.props;
    return (
      <Modal>
        <div className="create-or-edit-command">
          <form className="create-or-edit-command-form" onSubmit={this.createOrEditCommand}>
            {
              commands.map(command => (
                <div className="command-input-group" key={command.key}>
                  <div className="command-error-action-wrapper">
                    <span className="error">
                      {errors[command.key] || ''}
                    </span>
                    {
                      commands.length > 1 ? (
                        <span
                          className="remove-command-icon"
                          onClick={() => this.removeCommand(command.key)}
                        >
                          <FontAwesomeIcon icon="minus-circle" />
                        </span>
                      ) : ''
                    }
                  </div>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="git script here *"
                      value={command.script}
                      className="form-control"
                      name="script"
                      onChange={event => this.onChange(event, command.key)}
                    />
                    <input
                      type="text"
                      placeholder="keywords separated by a comma"
                      value={command.keywords.join(',')}
                      className="form-control"
                      name="keywords"
                      onChange={event => this.onChange(event, command.key)}
                    />
                    <input
                      type="text"
                      placeholder="short description here *"
                      value={command.description}
                      className="form-control"
                      name="description"
                      onChange={event => this.onChange(event, command.key)}
                    />
                  </div>
                </div>
              ))
            }
            {
              categoryId ? (
                <div className="add-command-wrapper">
                  <span className="add-command-icon" onClick={this.addCommand}>
                    <FontAwesomeIcon icon="plus-circle" />
                  </span>
                </div>
              ) : ''
            }
            <div className="underline" />
            <div className="text-right">
              <button
                type="button"
                className="abort-create-or-edit-command-button"
                onClick={this.abort}
              >
                Cancel
              </button>
              <button type="submit">
                {`${categoryId ? 'Add' : 'Edit'} Command`}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}

CreateOrEditCommand.propTypes = {
  commands: PropTypes.arrayOf(PropTypes.any).isRequired,
  abort: PropTypes.func.isRequired,
  createOrEditCommand: PropTypes.func.isRequired,
  categoryId: PropTypes.any.isRequired,
};

export default CreateOrEditCommand;
