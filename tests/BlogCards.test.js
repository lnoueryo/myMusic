process.env.CATEGORY_URL = 'https://storage.googleapis.com/tech-blog-static/'
import { findAllByAltText, fireEvent, render,screen } from '@testing-library/react'
import BlogCards from "../pages/components/BlogCards";
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux';
import store from '../store';

const testTag = {
  id: 1,
  name: 'HTML',
  blogs: [
    {id: 1, title: 'HTMLです', description: 'プログラミングスクールを卒業し、学んだことの復習も', content: '**HTML**：Hyper Text Markup Language（マークアップ言語）', src: 'html.png', created_at: '2022-12-31 15:30:21', tags: [{id: 1, name: 'html', category: {name: 'Language'}}]},
    {id: 2, title: 'CSSです', description: 'プログラミングスクールを卒業し、学んだことの復習も', content: '**CSS**：Cascading Style Sheets（スタイルシート言語）', src: 'css.png', created_at: '2022-09-20 15:3:21', tags: [{id: 1, name: 'html', category: {name: 'Language'}}]},
  ],
  category: {name: 'Language'}
}

describe('The BlogCards component', () => {

  test('check tag img', () => {
    render(
      <Provider store={store}>
        <BlogCards tag={testTag}  />
      </Provider>
    );
    const imgs = screen.queryAllByAltText(testTag.name);
    expect(imgs).toHaveLength(2)
  });

  test('check displayed created_at', () => {
    render(
      <Provider store={store}>
        <BlogCards tag={testTag}  />
      </Provider>
    );
    testTag.blogs.forEach(blog => {
      expect(screen.getByText(date(blog.created_at))).toBeInTheDocument()
    })
  });

})

const date = (datetime) => {
  const time = new Date(datetime)
  const year = time.getFullYear()
  const month = ddigit(time.getMonth() + 1)
  const date = ddigit(time.getDate())
  return `${year}.${month}.${date}`
}
const ddigit = (num) => {
  if( num < 10 ) return '0' + num;

  return num;
}
