process.env.CATEGORY_URL = 'https://storage.googleapis.com/tech-blog-static/'
import { findAllByAltText, fireEvent, render,screen } from '@testing-library/react'
import Chip from "../Chip";
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux';
import store from '../../../store';

const tag = {id: 1, name: 'html', category: {name: 'Language'}}
describe('The Chip component', () => {

  test('check tag img', () => {
    render(
      <Provider store={store}>
        <Chip tag={tag}  />
      </Provider>
    );
    const imgEl = screen.getByRole('img');
    expect(imgEl.src).toContain('https://storage.googleapis.com/tech-blog-static/language/' + tag.src);
  });

})
