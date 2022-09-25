/** @jsxImportSource @emotion/react */

import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import Chip from './Chip';
import { useSelector } from 'react-redux';
const BLOG_PATH = '/blogs/';
export default function BlogCards({tag}) {
  const windowX = useSelector(state => state.config.windowSize.x);
  const router = useRouter();
  const movePage = (blog) => router.push(BLOG_PATH + blog.id);

  return (
    <>
      {
        tag?.blogs && tag.blogs.map(blog => {
          return (
            <div className={windowX < 769 || 'flex-align-center'} css={card} key={blog.id} onClick={() => movePage(blog)}>
              <div css={leftContent}>
                <img alt={tag.name} css={[leftImage, windowX < 769 && normalImage]} src={blog.src ? process.env.CATEGORY_URL + 'blog/' + blog.src : (process.env.CATEGORY_URL + tag.category.name.toLowerCase() + '/' + tag.src)} />
              </div>
              <div className={windowX < 769 || 'box'} css={rightCard}>
                <h3 className="bold font14 mb10">{blog?.title}</h3>
                <p css={para}>{blog.description}</p>
                <div className="box-bottom flex" css={tagContainer}>
                  {
                    blog.tags.length == 0 ? <div className="mb10">なし</div> : blog.tags.map(tag => {
                      return <Chip data-testid={blog.title + tag.id} key={tag.id} tag={tag}></Chip>
                    })
                  }
                </div>
              </div>
            </div>
          )
        })
      }
    </>
  )
};

const card = {
  width: '100%',
  backgroundColor: 'white',
  margin: '15px',
  position: 'relative',
  border: 'solid 1px #e2e8f0',
  borderRadius: '3px'
}

const leftContent = {
  width: '100%'
}

const rightCard = {
  width: '100%',
  height: '100%',
  padding: '5px 10px',
}

const para = {
  color: '#99a9b0',
  fontSize: '10px'
}

const buttonContainer = {
  marginTop: 'auto',
  justifyContent: 'end',
  display: 'flex'
}

const leftImage = {
  minHeight: '250px',
  objectFit: 'cover'
}

const normalImage = {
  padding: '15px',
  height: '200px',
}

const tagContainer = {
  justifyContent: 'end',
  flexWrap: 'wrap-reverse'
}
