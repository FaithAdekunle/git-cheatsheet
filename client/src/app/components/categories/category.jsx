import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Command from './command';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = { expand: false };
    this.toggleExpansion = this.toggleExpansion.bind(this);
    this.hasKeyWord = this.hasKeyWord.bind(this);
    this.togglePrivacyStatus = this.togglePrivacyStatus.bind(this);
    this.launchDeleteCategory = this.launchDeleteCategory.bind(this);
    this.launchEditCategory = this.launchEditCategory.bind(this);
  }

  componentDidMount() {
    const { expandAll } = this.props;
    this.setState({ expand: expandAll });
  }

  componentDidUpdate(prevProps) {
    const { expandAll } = this.props;
    if (expandAll !== prevProps.expandAll) this.setState({ expand: expandAll });
  }

  launchDeleteCategory() {
    const { launchDeleteCategory, category } = this.props;
    launchDeleteCategory(category);
  }

  launchEditCategory() {
    const { launchEditCategory, category } = this.props;
    launchEditCategory(category);
  }

  toggleExpansion() {
    this.setState(prevState => ({ expand: !prevState.expand }));
  }

  togglePrivacyStatus() {
    const { togglePrivacyStatus, category } = this.props;
    togglePrivacyStatus(category._id);
  }

  hasKeyWord(command) {
    const { keyword } = this.props;
    if (keyword.trim()) {
      return !!command.keywords
        .find(word => word.toLowerCase().includes(keyword.trim().toLowerCase()));
    }
    return true;
  }

  render() {
    const { category, user, launchAddOrEditCommand, launchDeleteCommand } = this.props;
    const { expand } = this.state;
    const authorized = user.id === category.userId;
    return (
      <React.Fragment>
        <div className="category-header" onClick={this.toggleExpansion}>
          <span>
            { category.title.toUpperCase() }
          </span>
        </div>
        <div className={`category-body${expand ? ' expand' : ''}`}>
          {
            authorized ? (
              <div className="category-actions">
                <span className="privacy" onClick={this.togglePrivacyStatus}>
                  {`set to ${category.privacyStatus ? 'public' : 'private'}`}
                </span>
                <span>
                  <span
                    className="add-commands-icon"
                    onClick={() => launchAddOrEditCommand({
                      commands: [{
                        script: '',
                        description: '',
                        keywords: [],
                        key: Date.now(),
                      }],
                      categoryId: category._id,
                    })}
                  >
                    <FontAwesomeIcon icon="plus" />
                  </span>
                  <span className="edit-category-icon" onClick={this.launchEditCategory}>
                    <FontAwesomeIcon icon="pen" />
                  </span>
                  <span className="delete-category-icon" onClick={this.launchDeleteCategory}>
                    <FontAwesomeIcon icon="trash" />
                  </span>
                </span>
              </div>
            ) : ''
          }
          <ul className="command-list">
            {
              category.commands.map(command => this.hasKeyWord(command) ? (
                <li className="command-list-item" key={command._id}>
                  <Command
                    command={command}
                    user={user}
                    authorized={authorized}
                    launchEditCommand={launchAddOrEditCommand}
                    launchDeleteCommand={launchDeleteCommand}
                  />
                </li>
              ) : '')
            }
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

Category.propTypes = {
  category: PropTypes.objectOf(PropTypes.any).isRequired,
  expandAll: PropTypes.bool.isRequired,
  keyword: PropTypes.string.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  togglePrivacyStatus: PropTypes.func.isRequired,
  launchDeleteCategory: PropTypes.func.isRequired,
  launchEditCategory: PropTypes.func.isRequired,
  launchAddOrEditCommand: PropTypes.func.isRequired,
  launchDeleteCommand: PropTypes.func.isRequired,
};

export default Category;
