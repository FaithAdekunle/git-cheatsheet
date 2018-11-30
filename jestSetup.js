import { configure } from 'enzyme';
import { JSDOM } from 'jsdom';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const { window } = new JSDOM('');
const { document } = window;

window.setTimeout = (callback) => {
  callback();
};

global.document = document;
global.document.execCommand = jest.fn();
global.window = window;
