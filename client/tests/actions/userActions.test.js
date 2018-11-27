import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import {
  beginAjaxCall,
  authenticateSuccess,
  mockSuccess,
  expandSidebar,
} from '../../src/app/actions/actionTypes';
import UserActions from '../../src/app/actions/userActions';

const mockStore = configureStore([thunk]);
const store = mockStore();

const user = { token: 'token', id: 'id' };
const successResponse = { success: true, ...user };
const failureResponse = { success: false, error: 'wrong email or password' };
const credentials = { email: 'test@test.com', password: 'password' };

describe('userActions', () => {
  beforeEach(() => {
    store.clearActions();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('login successfully', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: successResponse,
      });
    });
    const expectedActions = [
      { type: beginAjaxCall },
      { type: beginAjaxCall },
      { type: authenticateSuccess, user },
      { type: expandSidebar, expand: false },
    ];
    await store.dispatch(UserActions.login(credentials));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('failed login', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: failureResponse,
      });
    });
    const expectedActions = [
      { type: beginAjaxCall },
      { type: mockSuccess },
    ];
    try {
      await store.dispatch(UserActions.login(credentials));
    } catch {
      expect(store.getActions()).toEqual(expectedActions);
    }
  });

  test('register successfully', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: successResponse,
      });
    });
    const expectedActions = [
      { type: beginAjaxCall },
      { type: beginAjaxCall },
      { type: authenticateSuccess, user },
      { type: expandSidebar, expand: false },
    ];
    await store.dispatch(UserActions.register(credentials));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('failed register', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: failureResponse,
      });
    });
    const expectedActions = [
      { type: beginAjaxCall },
      { type: mockSuccess },
    ];
    try {
      await store.dispatch(UserActions.register(credentials));
    } catch {
      expect(store.getActions()).toEqual(expectedActions);
    }
  });
});
