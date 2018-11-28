import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../common/modal';

class CreateOrEditCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { category: { ...props.category }, errors: { commands: [] } };
    this.createOrEditCategory = this.createOrEditCategory.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addCommand = this.addCommand.bind(this);
    this.removeCommand = this.removeCommand.bind(this);
    this.onCommandChange = this.onCommandChange.bind(this);
    this.validateCommand = this.validateCommand.bind(this);
    this.validate = this.validate.bind(this);
    this.abort = this.abort.bind(this);
  }

  onCommandChange(event, key) {
    const { category, errors } = this.state;
    const { target } = event;
    const changedCommand = category.commands.find(command => command.key === key);
    changedCommand[target.name] = target.value;
    if (errors.commands[changedCommand.key]) {
      errors.commands[changedCommand.key] = this.validateCommand(changedCommand);
    }
    this.setState({ category, errors });
  }

  onChange(event) {
    const { category, errors } = this.state;
    const { target } = event;
    if (target.name === 'privacyStatus') {
      category[target.name] = !target.checked;
    } else {
      category[target.name] = target.value;
      if (target.value) {
        errors[target.name] = '';
      } else {
        errors[target.name] = `${target.name} field cannot be empty`;
      }
    }
    this.setState({ category, errors });
  }

  abort() {
    const { category } = this.state;
    const { abort } = this.props;
    abort(category);
  }

  addCommand() {
    const { category } = this.state;
    category.commands.push({
      script: '',
      description: '',
      keywords: '',
      key: Date.now(),
    });
    this.setState({ category });
  }

  createOrEditCategory(event) {
    event.preventDefault();
    const valid = this.validate();
    if (valid) {
      const { createOrEditCategory } = this.props;
      const { category } = this.state;
      let validCategory = { ...category };
      if (validCategory._id) {
        validCategory = {
          _id: validCategory._id,
          title: validCategory.title,
        };
      } else {
        validCategory.commands = validCategory.commands.map(command => ({
          script: command.script,
          description: command.description,
          keywords: command.keywords.trim() ? command.keywords.trim().split(',') : [],
        }));
      }
      createOrEditCategory(validCategory);
    }
  }

  removeCommand(key) {
    const { category } = this.state;
    category.commands = category.commands.filter(command => command.key !== key);
    this.setState({ category });
  }

  validateCommand(command) {
    let error = '';
    if (!command.script.trim() && !command.description.trim()) {
      error = 'script and description fields cannot be empty';
    } else {
      ['script', 'description'].forEach((field) => {
        if (!command[field].trim()) error = `${field} field cannot be empty`;
      });
    }
    return error;
  }

  validate() {
    const { category, errors } = this.state;
    let valid = true;
    if (!category.title.trim()) {
      errors.title = 'title field cannot be empty';
      valid = false;
    }
    if (!category._id) {
      category.commands.forEach((command) => {
        const error = this.validateCommand(command);
        errors.commands[command.key] = error;
        valid = valid ? !error : valid;
      });
    }
    this.setState({ category, errors });
    return valid;
  }

  render() {
    const { category, errors } = this.state;
    return (
      <React.Fragment>
        <Modal>
          {
            <div className="add-or-edit-category">
              <form className="add-or-edit-category-form" onSubmit={this.createOrEditCategory}>
                <div className="form-group">
                  <label>Category Title *</label>
                  <span className="error">{errors.title || ''}</span>
                  <input
                    type="text"
                    value={category.title}
                    className="form-control title-field"
                    name="title"
                    onChange={this.onChange}
                  />
                </div>
                {
                  category._id ? '' : (
                    <React.Fragment>
                      <label>Git Command(s) *</label>
                      {
                        category.commands.map(command => (
                          <div className="command-input-group" key={command.key}>
                            <div className="category-command-error-action-wrapper">
                              <span className="error">
                                {errors.commands[command.key] || ''}
                              </span>
                              {
                                category.commands.length > 1 ? (
                                  <span
                                    className="remove-category-command-icon"
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
                                className="form-control"
                                placeholder="git script here *"
                                value={command.script}
                                name="script"
                                onChange={event => this.onCommandChange(event, command.key)}
                              />
                              <input
                                type="text"
                                className="form-control"
                                placeholder="keywords separated by a comma"
                                value={command.keywords}
                                name="keywords"
                                onChange={event => this.onCommandChange(event, command.key)}
                              />
                              <input
                                type="text"
                                className="form-control"
                                placeholder="short description here *"
                                value={command.description}
                                name="description"
                                onChange={event => this.onCommandChange(event, command.key)}
                              />
                            </div>
                          </div>
                        ))
                      }
                      <div className="add-category-command-wrapper">
                        <span className="add-category-command-icon" onClick={this.addCommand}>
                          <FontAwesomeIcon icon="plus-circle" />
                        </span>
                      </div>
                    </React.Fragment>
                  )
                }
                {
                  category._id ? '' : (
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="privacyStatus"
                        defaultChecked={!category.privacyStatus}
                        onChange={this.onChange}
                      />
                      <label className="form-check-label">
                        Public Status
                      </label>
                    </div>
                  )
                }
                <div className="underline" />
                <div className="text-right">
                  <button type="button" className="abort-add-or-edit-category-button" onClick={this.abort}>
                    Cancel
                  </button>
                  <button type="submit">
                    {`${category._id ? 'Edit' : 'Add'} Category`}
                  </button>
                </div>
              </form>
            </div>
          }
        </Modal>
      </React.Fragment>
    );
  }
}

CreateOrEditCategory.propTypes = {
  category: PropTypes.objectOf(PropTypes.any).isRequired,
  abort: PropTypes.func.isRequired,
  createOrEditCategory: PropTypes.func.isRequired,
};

export default CreateOrEditCategory;
