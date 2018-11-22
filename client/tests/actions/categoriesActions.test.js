import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { beginAjaxCall, fetchCategoriesSuccess } from '../../src/app/actions/actionTypes';
import CategoriesActions from '../../src/app/actions/categoriesActions';
import categories from '../../../server/seeds/categories';

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
});
