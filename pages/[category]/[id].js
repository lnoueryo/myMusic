/** @jsxImportSource @emotion/react */

import BlogCards from '../components/BlogCards';
import axios from '/modules/httpclient';
import { css } from '@emotion/react';

export default function Languages(tag) {

  return (
    <section>
      <div className="wrapper">
        <h3 className="title">{tag.name}</h3>
        <div className="container">
          <div className="flex justify-center wrap w100 content-container" css={contentContainer}>
            {tag.blogs && <BlogCards tag={tag} />}
          </div>
        </div>
      </div>
    </section>
  );
};

Languages.getInitialProps = async ({query}) => {

  const response = await axios.get('/api/tag', {
    params: {id: query.id}
  });

  return response?.data[0];
}

const contentContainer = css({
  filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,.1))'
})