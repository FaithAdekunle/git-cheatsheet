import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import expandOrCollapseSidebar from '../actions/sidebarAction';
import LoginOrRegister from './loginOrRegister';
import UserActions from "../actions/userActions";

export class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.expandSidebar = this.expandSidebar.bind(this);
  }

  expandSidebar() {
    const { expandSidebar } = this.props;
    expandSidebar();
  }

  render() {
    const { expand, user, logout } = this.props;
    return (
      <React.Fragment>
        <h6 className="expand-sidebar" onClick={this.expandSidebar}>>>></h6>
        <div className={`sidebar${expand ? ' sidebar-expand' : ''}`}>
          <div>
            {
              user.id ? (
                <div className="logout-container text-center">
                  <button className="logout" onClick={logout}>logout</button>
                </div>
              ) : (
                <div className="login-or-register">
                  <LoginOrRegister />
                </div>
              )
            }
            <hr />
            <p className="text-center">
              {'"Create/Edit/Delete your own cheat categories or mark them as public/private"'}
            </p>
            <hr />
            <p className="text-center">
              {'"Edit/Delete a command or add multiple commands to any of your cheat categories"'}
            </p>
            <hr />
            <p className="text-center">
              {'"Click on a cheat command to copy it to your clipboard"'}
            </p>
            <hr />
            <p className="text-center">
              {'"Find keyword related commands using the keyword search bar"'}
            </p>
            <hr />
          </div>
          <h6 className="text-center">&copy; Faith Adekunle</h6>
        </div>
      </React.Fragment>
    );
  }
}

Sidebar.propTypes = {
  expand: PropTypes.bool.isRequired,
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  expandSidebar: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export const mapStateToProps = state => ({
  expand: state.expandSidebar,
  user: state.user,
});

export const mapDispatchToProps = dispatch => ({
  expandSidebar: () => dispatch(expandOrCollapseSidebar(true)),
  logout: () => dispatch(UserActions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
