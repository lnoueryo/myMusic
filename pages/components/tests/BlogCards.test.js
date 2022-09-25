process.env.CATEGORY_URL = 'https://storage.googleapis.com/tech-blog-static/'
import { findAllByAltText, fireEvent, render,screen } from '@testing-library/react'
import BlogCards from "../BlogCards";
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux';
import store from '../../../store';

const tag = {
  id: 1,
  name: 'HTML',
  blogs: [
    {id: 1, title: 'HTMLです', description: 'プログラミングスクールを卒業し、学んだことの復習も', content: '**HTML**：Hyper Text Markup Language（マークアップ言語）', src: 'html.png', created_at: '2022-09-20 15:30:21', tags: [{id: 1, name: 'html', category: {name: 'Language'}}]},
    {id: 2, title: 'CSSです', description: 'プログラミングスクールを卒業し、学んだことの復習も', content: '**CSS**：Cascading Style Sheets（スタイルシート言語）', src: 'css.png', created_at: '2022-09-20 15:30:21', tags: [{id: 1, name: 'html', category: {name: 'Language'}}]},
  ],
  category: {name: 'Language'}
}
describe('The BlogCards component', () => {

  test('check tag img', () => {
    render(
      <Provider store={store}>
        <BlogCards tag={tag}  />
      </Provider>
    );
    const imgs = screen.queryAllByAltText(tag.name);
    expect(imgs).toHaveLength(2)
  });

})
