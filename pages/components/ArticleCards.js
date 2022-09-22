/** @jsxImportSource @emotion/react */

import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import Chip from './Chip';
const BLOG_PATH = '/blogs/';
export default function ArticleCards({tag}) {
  const router = useRouter();
  const movePage = (article) => router.push(BLOG_PATH + article.id);

  return (
    <>
      {
        tag?.blogs && tag.blogs.map(blog => {
          return (
            <div className="w100 flex-align-center rel" css={cardFrame} key={blog.id} onClick={() => movePage(blog)}>
              <img css={leftImage}  src={process.env.CATEGORY_URL + tag.category.name.toLowerCase() + '/' + tag.src} />
              <div className="w100 h100 box" css={box}>
                <h3 className="bold font14 mb10">{blog?.title}</h3>
                <p className="font10" css={description}>{blog.description}</p>
                <div className="box-bottom flex" css={tagContainer}>
                  {
                    blog.tags.length == 0 ? <div className="mb10">なし</div> : blog.tags.map(tag => {
                      return <Chip key={tag.id} tag={tag}></Chip>
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

const cardFrame = css({
  height: '150px',
  backgroundColor: 'white',
  margin: '15px',
})

const leftImage = css({
  width: '150px',
  padding: '0 5px'
})

const box = css({
  padding: '5px 10px'
})

const description = css({
  color: '#99a9b0'
})

const tagContainer = css({
  justifyContent: 'end',
  flexWrap: 'wrap-reverse'
})
