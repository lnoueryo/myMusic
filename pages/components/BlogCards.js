/** @jsxImportSource @emotion/react */

import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import Chip from './Chip';
import { useSelector } from 'react-redux';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
const BLOG_PATH = '/blogs/';
export default function BlogCards({tag}) {
  const windowX = useSelector(state => state.config.windowSize.x);
  const router = useRouter();
  const movePage = (blog) => router.push(BLOG_PATH + blog.id);
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

  const noImageSrc = (tag) => {
    let path = 'category' in tag ? tag.category.name.toLowerCase() : tag.name.toLowerCase();
    if(!tag.src) return '/inoueryo.png'
    return process.env.CATEGORY_URL + path + '/' + tag.src;
  }

  return (
    <>
      {
        tag?.blogs && tag.blogs.map(blog => {
          return (
            <div className={windowX < 769 || 'flex-align-center'} css={card} key={blog.id} onClick={() => movePage(blog)}>
              <div css={windowX > 768 ? leftContent : leftContentSP}>
                <img alt={tag.name} css={[leftImage, windowX < 769 && normalImage]} src={blog.src ? process.env.CATEGORY_URL + 'blog/' + blog.src : noImageSrc(tag)}/>
              </div>
              <div className={windowX < 769 || 'box'} css={rightCard}>
                <h3 className="title font20 mb10">{blog?.title}</h3>
                <p css={para}>{blog.description}</p>
                <div className="box-bottom">
                  <div className="flex mb10" css={tagContainer}>
                    {
                      blog.tags.length == 0 ? <div className="mb10">なし</div> : blog.tags.map(tag => {
                        return <Chip data-testid={blog.title + tag.id} key={tag.id} tag={tag}></Chip>
                      })
                    }
                  </div>
                  <div className="justify-end flex mb10" css={date}>
                    <div css={icon}>
                      <AccessTimeIcon className="mr5" fontSize="small" />
                    </div>
                    <div css={para}>
                      {date(blog.created_at)}
                    </div>
                  </div>
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
  borderRadius: '3px',
  cursor: 'pointer'
}

const leftContent = {
  width: '100%',
  maxWidth: '250px'
}

const leftContentSP = {
  width: '100%',
  maxWidth: 'initial'
}

const rightCard = {
  width: '100%',
  height: '100%',
  padding: '5px 15px',
}

const para = {
  color: '#99a9b0',
  fontSize: '14px'
}

const icon = {
  display: 'flex',
  alignItems: 'end'
}

const buttonContainer = {
  marginTop: 'auto',
  justifyContent: 'end',
  display: 'flex'
}

const leftImage = {
  minHeight: '200px',
  maxHeight: '300px',
  objectFit: 'cover',
  // padding: '30px'
}

const normalImage = {
  padding: '15px',
  maxHeight: '350px',
}

const tagContainer = {
  justifyContent: 'end',
  flexWrap: 'wrap-reverse'
}
