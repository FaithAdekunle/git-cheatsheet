import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ children }) => (
  <React.Fragment>
    <div className="modal-overlay" />
    <div className="app-modal">
      <div className="app-modal-content-wrapper">
        { children }
      </div>
    </div>
  </React.Fragment>
);

Modal.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Modal;
