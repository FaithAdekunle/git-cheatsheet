import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../common/modal';

const DeleteCategory = ({ category, abort, deleteCategory }) => (
  <React.Fragment>
    <Modal>
      <div className="delete-category">
        <h4>
          {`Category '${category.title.toUpperCase()}' has ${category.commands.length} command(s)`}
        </h4>
        <span>All commands in this category will also be removed...</span>
        <div className="underline" />
        <div className="text-right">
          <button type="button" className="abort-delete-category-button" onClick={() => abort()}>
            Abort
          </button>
          <button type="button" className="delete-category-button" onClick={() => deleteCategory()}>
            Delete anyway
          </button>
        </div>
      </div>
    </Modal>
  </React.Fragment>
);

DeleteCategory.propTypes = {
  category: PropTypes.objectOf(PropTypes.any).isRequired,
  abort: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
};

export default DeleteCategory;
