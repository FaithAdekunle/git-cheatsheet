import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CategoriesActions from '../../actions/categoriesActions';
import Category from './category';
import DeleteCategory from './deleteCategory';
import CreateOrEditCategory from './createOrEditCategory';

export class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandAll: false,
      keyword: '',
    };
    this.categoryBeingAddedOrEdited = { _id: '' };
    this.toggleCategoriesExpansion = this.toggleCategoriesExpansion.bind(this);
    this.onKeywordChange = this.onKeywordChange.bind(this);
    this.hasCommandWithKeyword = this.hasCommandWithKeyword.bind(this);
    this.computeGrid = this.computeGrid.bind(this);
    this.filterCategoriesByKeyword = this.filterCategoriesByKeyword.bind(this);
    this.launchDelete = this.launchDelete.bind(this);
    this.launchAddOrEdit = this.launchAddOrEdit.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.createOrEditCategory = this.createOrEditCategory.bind(this);
    this.abortDeleteAction = this.abortDeleteAction.bind(this);
    this.abortAddOrEditAction = this.abortAddOrEditAction.bind(this);
    this.togglePrivacyStatus = this.togglePrivacyStatus.bind(this);
  }

  async componentDidMount() {
    const { fetchCategories } = this.props;
    await fetchCategories();
  }

  onKeywordChange(event) {
    const { target } = event;
    const state = { keyword: target.value };
    if (target.value.trim()) state.expandAll = true;
    this.setState(state);
  }

  abortDeleteAction() {
    this.setState({ categoryToBeDeleted: null });
  }

  abortAddOrEditAction(categoryBeingAddedOrEdited) {
    this.setState({ categoryToBeDeleted: null, categoryToBeEdited: null });
    if (categoryBeingAddedOrEdited) {
      this.categoryBeingAddedOrEdited = categoryBeingAddedOrEdited;
    } else {
      this.categoryBeingAddedOrEdited = { _id: '' };
    }
  }

  createOrEditCategory(category) {
    const { createOrEditCategory, user } = this.props;
    createOrEditCategory(category, user.token).then(() => this.abortAddOrEditAction());
  }

  launchDelete(category) {
    this.setState({ categoryToBeDeleted: { ...category } });
  }

  launchAddOrEdit(categoryToBeEdited = {
    title: '',
    privacyStatus: false,
    commands: [{ script: '', description: '', keywords: '', key: Date.now() }],
  }) {
    if (categoryToBeEdited._id === this.categoryBeingAddedOrEdited._id) {
      this.setState({ categoryToBeEdited: this.categoryBeingAddedOrEdited });
    } else {
      this.setState({ categoryToBeEdited });
    }
  }

  deleteCategory() {
    const { deleteCategory, user } = this.props;
    const { categoryToBeDeleted } = this.state;
    deleteCategory(categoryToBeDeleted._id, user.token).then(() => this.abortDeleteAction());
  }

  toggleCategoriesExpansion() {
    this.setState(prevState => ({ expandAll: !prevState.expandAll }));
  }

  togglePrivacyStatus(id) {
    const { user, togglePrivacyStatus } = this.props;
    togglePrivacyStatus(id, user.token);
  }

  hasCommandWithKeyword(category) {
    const { keyword } = this.state;
    if (keyword.trim()) {
      return !!category.commands
        .find(command => !!command.keywords
          .find(word => word.toLowerCase().includes(keyword.trim().toLowerCase())));
    }
    return true;
  }

  filterCategoriesByKeyword() {
    const { categories } = this.props;
    return categories.filter(category => this.hasCommandWithKeyword(category));
  }

  computeGrid() {
    const categories = this.filterCategoriesByKeyword();
    let remainder = categories.length % 3;
    const factor = Math.floor((categories.length - remainder) / 3);
    return [...Array(3)].map(() => {
      if (remainder) {
        remainder -= 1;
        return factor + 1;
      }
      return factor;
    });
  }

  render() {
    const categories = this.filterCategoriesByKeyword();
    const {
      expandAll,
      keyword,
      categoryToBeDeleted,
      categoryToBeEdited,
    } = this.state;
    const { user } = this.props;
    const [col1, col2] = this.computeGrid();
    return (
      <React.Fragment>
        <div className="categories-component">
          {
            this.props.categories.length ? (
              <div className="command-keywords-search-container row justify-content-md-center">
                <div className="command-keyword-search col-md-4 col-lg-3">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="keyword-search">
                        <FontAwesomeIcon icon="search" />
                      </span>
                    </div>
                    <input
                      type="text"
                      value={keyword}
                      onChange={this.onKeywordChange}
                      className="form-control command-keyword-search-field"
                      placeholder="enter command keyword"
                      aria-label="Username"
                      aria-describedby="keyword-search"
                    />
                  </div>
                </div>
              </div>
            ) : ''
          }
          <div className="container">
            <div className="categories-actions">
              {
                categories.length ? (
                  <button
                    className="expand-or-collapse"
                    type="button"
                    onClick={this.toggleCategoriesExpansion}
                  >
                    {expandAll ? 'Collapse All' : 'Expand All'}
                  </button>
                ) : ''
              }
              {
                user.id ? (
                  <button
                    className="launch-add-category-button"
                    type="button"
                    onClick={() => this.launchAddOrEdit()}
                  >
                    Add Category
                  </button>
                ) : ''
              }
            </div>
            {
              categories.length ? (
                <div className="category-components row">
                  <div className="col-md-4">
                    {
                      categories
                        .slice(0, col1).map(category => (
                          <div className="category-component" key={category._id}>
                            <Category
                              category={category}
                              expandAll={expandAll}
                              keyword={keyword}
                              user={user}
                              launchDelete={this.launchDelete}
                              launchEdit={this.launchAddOrEdit}
                              togglePrivacyStatus={this.togglePrivacyStatus}
                            />
                          </div>
                        ))
                    }
                  </div>
                  <div className="col-md-4">
                    {
                      categories
                        .slice(col1, col1 + col2).map(category => (
                          <div className="category-component" key={category._id}>
                            <Category
                              category={category}
                              expandAll={expandAll}
                              keyword={keyword}
                              user={user}
                              launchDelete={this.launchDelete}
                              launchEdit={this.launchAddOrEdit}
                              togglePrivacyStatus={this.togglePrivacyStatus}
                            />
                          </div>
                        ))
                    }
                  </div>
                  <div className="col-md-4">
                    {
                      categories
                        .slice(col1 + col2).map(category => (
                          <div className="category-component" key={category._id}>
                            <Category
                              category={category}
                              expandAll={expandAll}
                              keyword={keyword}
                              user={user}
                              launchDelete={this.launchDelete}
                              launchEdit={this.launchAddOrEdit}
                              togglePrivacyStatus={this.togglePrivacyStatus}
                            />
                          </div>
                        ))
                    }
                  </div>
                </div>
              ) : ''
            }
          </div>
        </div>
        {
          categoryToBeEdited ? (
            <CreateOrEditCategory
              abort={this.abortAddOrEditAction}
              category={categoryToBeEdited}
              createOrEditCategory={this.createOrEditCategory}
            />
          ) : ''
        }
        {
          categoryToBeDeleted ? (
            <DeleteCategory
              category={categoryToBeDeleted}
              abort={this.abortDeleteAction}
              deleteCategory={this.deleteCategory}
            />
          ) : ''
        }
      </React.Fragment>
    );
  }
}

Categories.propTypes = {
  fetchCategories: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
  createOrEditCategory: PropTypes.func.isRequired,
  togglePrivacyStatus: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.any).isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export const mapStateToProps = state => ({
  categories: state.categories,
  user: state.user,
});

export const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(CategoriesActions.fetchCategories()),
  deleteCategory: (id, token) => dispatch(CategoriesActions.deleteCategory(id, token)),
  togglePrivacyStatus: (id, token) => dispatch(CategoriesActions.toggleCategoryPrivacy(id, token)),
  createOrEditCategory: (category, token) => dispatch(CategoriesActions
    .createOrEditCategory(category, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
