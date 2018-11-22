import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Command from './command';

export class Category extends Component {
  constructor(props) {
    super(props);
    this.state = { expand: false };
    this.toggleExpansion = this.toggleExpansion.bind(this);
    this.hasKeyWord = this.hasKeyWord.bind(this);
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

  hasKeyWord(command) {
    const { keyword } = this.props;
    if (keyword.trim()) {
      return !!command.keywords
        .find(word => word.toLowerCase().includes(keyword.trim().toLowerCase()));
    }
    return true;
  }

  render() {
    const { category } = this.props;
    const { expand } = this.state;
    return (
      <React.Fragment>
        <div className="category-header" onClick={this.toggleExpansion}>
          <span>
            { category.title.toUpperCase() }
          </span>
        </div>
        <div className="category-body">
          <ul className={`command-list${expand ? ' expand' : ''}`}>
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
};

export default Category;
