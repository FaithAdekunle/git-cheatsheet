import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Categories from './categories/categories';
import Loader from './common/loader';

export class App extends React.Component {
  render() {
    const { ajaxCallsInProgress } = this.props;
    return (
      <React.Fragment>
        {
          ajaxCallsInProgress ? <Loader /> : ''
        }
        <Categories />
      </React.Fragment>
    );
  }
}

App.propTypes = {
  ajaxCallsInProgress: PropTypes.number.isRequired,
};

export const mapStateToProps = state => ({
  ajaxCallsInProgress: state.ajaxCallsInProgress,
});

export default connect(mapStateToProps)(App);
