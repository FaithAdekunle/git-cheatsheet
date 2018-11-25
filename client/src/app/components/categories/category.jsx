import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Command from './command';
import CategoriesActions from '../../actions/categoriesActions';

export class Category extends Component {
  constructor(props) {
    super(props);
    this.state = { expand: false };
    this.toggleExpansion = this.toggleExpansion.bind(this);
    this.hasKeyWord = this.hasKeyWord.bind(this);
    this.togglePrivacyStatus = this.togglePrivacyStatus.bind(this);
  }

  componentDidMount() {
    const { expandAll } = this.props;
    this.setState({ expand: expandAll });
  }

  componentDidUpdate(prevProps) {
    const { expandAll } = this.props;
    if (expandAll !== prevProps.expandAll) this.setState({ expand: expandAll });
  }

  toggleExpansion() {
    this.setState(prevState => ({ expand: !prevState.expand }));
  }

  togglePrivacyStatus() {
    const { user, togglePrivacyStatus, category } = this.props;
    togglePrivacyStatus(category._id, user.token);
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
    const { category, user } = this.props;
    const { expand } = this.state;
    return (
      <React.Fragment>
        <div className="category-header" onClick={this.toggleExpansion}>
          <span>
            { category.title.toUpperCase() }
          </span>
        </div>
        <div className={`category-body${expand ? ' expand' : ''}`}>
          {
            user.id === category.userId ? (
              <div className="category-actions">
                <span className="privacy" onClick={this.togglePrivacyStatus}>
                  {`set to ${category.privacyStatus ? 'public' : 'private'}`}
                </span>
                <span>
                  <FontAwesomeIcon icon="pen" />
                  <FontAwesomeIcon icon="trash" />
                </span>
              </div>
            ) : ''
          }
          <ul className="command-list">
            {
              category.commands.map(command => this.hasKeyWord(command) ? (
                <li className="command-list-item" key={command._id}>
                  <Command command={command} />
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
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  togglePrivacyStatus: PropTypes.func.isRequired,
};

export const mapStateToProps = () => ({});

export const mapDispatchToProps = dispatch => ({
  togglePrivacyStatus: (id, token) => dispatch(CategoriesActions.toggleCategoryPrivacy(id, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);
