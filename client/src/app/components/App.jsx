import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Categories from './categories/categories';
import Loader from './common/loader';
import Sidebar from './sidebar';
import expandOrCollapseSidebar from '../actions/sidebarAction';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.collapseSidebar = this.collapseSidebar.bind(this);
  }

  collapseSidebar() {
    const { collapseSidebar } = this.props;
    collapseSidebar();
  }

  render() {
    const { ajaxCallsInProgress } = this.props;
    return (
      <React.Fragment>
        {
          ajaxCallsInProgress ? <Loader /> : ''
        }
        <Sidebar />
        <div className="main" onClick={this.collapseSidebar}>
          <Categories />
        </div>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  ajaxCallsInProgress: PropTypes.number.isRequired,
  collapseSidebar: PropTypes.func.isRequired,
};

export const mapStateToProps = state => ({
  ajaxCallsInProgress: state.ajaxCallsInProgress,
});

export const mapDispatchToProps = dispatch => ({
  collapseSidebar: () => dispatch(expandOrCollapseSidebar(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
