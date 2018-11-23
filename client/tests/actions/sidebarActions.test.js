import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expandSidebar } from '../../src/app/actions/actionTypes';
import expandOrCollapseSidebar from '../../src/app/actions/sidebarAction';

const mockStore = configureStore([thunk]);
const store = mockStore();

describe('sidebarActions', () => {
  test('should create action to expand sidebar', () => {
    const expand = true;
    const expectedActions = [
      { type: expandSidebar, expand },
    ];
    store.dispatch(expandOrCollapseSidebar(expand));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
