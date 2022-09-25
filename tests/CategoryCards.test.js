process.env.CATEGORY_URL = 'https://storage.googleapis.com/tech-blog-static/'
import { fireEvent, render,screen } from '@testing-library/react'
import CategoryCards from "../pages/components/CategoryCards";
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux';
import store from '../store';

const category = {
  id: 1,
  name: 'language',
  tags: [
    {id: 1, name: 'HTML', src: 'html.png'},
    {id: 2, name: 'CSS', src: 'css.png'},
  ]
}
describe('The CategoryCards component', () => {
  test('check src', () => {
    render(
      <Provider store={store}>
        <CategoryCards {...category} />
      </Provider>
    );
    category.tags.forEach(tag => {
      const imgEl = screen.getByAltText(tag.name);
      expect(imgEl.src).toContain('https://storage.googleapis.com/tech-blog-static/language/' + tag.src);
    });
  });

  test('check hover src', () => {
    render(
      <Provider store={store}>
        <CategoryCards {...category} />
      </Provider>
    );

    const overlay = screen.queryByText('HTML').closest('div');
    // before hover
    expect(getComputedStyle(overlay).getPropertyValue('transform')).toBe('translateY(101%)');
    const imgEl = screen.getByAltText(category.tags[0].name);

    // hover
    fireEvent.mouseOver(imgEl);
    expect(getComputedStyle(overlay).getPropertyValue('transform')).toBe('translateY(0)');
  });

})
