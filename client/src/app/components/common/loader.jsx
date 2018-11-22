import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalOverlay from './modalOverlay';

const Loader = () => (
  <div className="common">
    <ModalOverlay />
    <div className="absolute loader-modal">
      <div className="spinner">
        <FontAwesomeIcon icon="spinner" className="fa-spin" />
      </div>
    </div>
  </div>
);

export default Loader;
