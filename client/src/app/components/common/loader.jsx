import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from './modal';

const Loader = () => (
  <Modal>
    <div className="spinner">
      <FontAwesomeIcon icon="spinner" className="fa-spin" />
    </div>
  </Modal>
);

export default Loader;
