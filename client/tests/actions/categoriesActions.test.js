import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { beginAjaxCall, fetchCategoriesSuccess, toggleCategoryPrivacySuccess } from '../../src/app/actions/actionTypes';
import CategoriesActions from '../../src/app/actions/categoriesActions';
import categories from '../categories';

const mockStore = configureStore([thunk]);
const store = mockStore();

describe('categoriesActions', () => {
  beforeEach(() => {
    store.clearActions();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('should create fetchCategoriesSuccess action after loading categories', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { categories },
      });
    });
    const expectedActions = [
      { type: beginAjaxCall },
      { type: fetchCategoriesSuccess, categories },
    ];
    await store.dispatch(CategoriesActions.fetchCategories());
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('should create toggleCategoryPrivacySuccess action after toggling privacy status', async () => {
    const id = 'test-id';
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {},
      });
    });
    const expectedActions = [
      { type: beginAjaxCall },
      { type: toggleCategoryPrivacySuccess, id },
    ];
    await store.dispatch(CategoriesActions.toggleCategoryPrivacy(id));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
