/** @jsxImportSource @emotion/react */

import BlogCards from '../components/BlogCards';
import axios from '/modules/httpclient';
import { css } from '@emotion/react';

export default function Category(category) {
  return (
    <section>
      <div className="wrapper">
        <h3 className='bold font24'>{category.name}</h3>
        <div className="container">
          <div className="flex justify-center wrap w100 content-container" css={contentContainer}>
            {category.blogs && <BlogCards tag={category} />}
          </div>
        </div>
      </div>
    </section>
  );
};

Category.getInitialProps = async ({query}) => {
  const categoryName = query.category.charAt(0).toUpperCase() + query.category.slice(1)
  const response = await axios.get('/api/category', {
    params: {name: categoryName}
  });
  return response?.data[0];
}

const contentContainer = css({
  filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,.1))'
})