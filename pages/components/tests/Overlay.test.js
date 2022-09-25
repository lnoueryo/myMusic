process.env.CATEGORY_URL = 'https://storage.googleapis.com/tech-blog-static/'
import { fireEvent, render,screen } from '@testing-library/react'
import Overlay from "../Overlay";
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux';
import store from '../../../store';

const tag = {id: 1, name: 'HTML', src: 'html.png'}

describe('The Overlay component', () => {

  test('check hover on', () => {
    render(
      <Provider store={store}>
        <Overlay onCover={true}>{tag.name}</Overlay>
      </Provider>
    );

    const overlay = screen.queryByText('HTML').closest('div');
    expect(getComputedStyle(overlay).getPropertyValue('transform')).toBe('translateY(0)');

  });

  test('check hover off', () => {
    render(
      <Provider store={store}>
        <Overlay onCover={false}>{tag.name}</Overlay>
      </Provider>
    );

    const overlay = screen.queryByText('HTML').closest('div');
    expect(getComputedStyle(overlay).getPropertyValue('transform')).toBe('translateY(101%)');

  });

})
