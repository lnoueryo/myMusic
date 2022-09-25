/** @jsxImportSource @emotion/react */

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const BLOG_PATH = '/blogs/'
export default function ArticleCards({blogs}) {
  const router = useRouter();
  const windowX = useSelector(state => state.config.windowSize.x);
  const [loading, setLoading] = useState(false);
  const movePage = (blog) => router.push(BLOG_PATH + blog.id);
  const moveEditPage = (e, blog) => {
    setLoading(true)
    e.stopPropagation();
    router.push('/admin/edit/' + blog.id);
  }
  const deletePage = (blog) => console.log(blog);

  return (
    <>
      {
        blogs && blogs.map(blog => {
          return (
            <div className={windowX < 769 || 'flex-align-center'} css={card} key={blog.id} onClick={() => movePage(blog)}>
              <div css={leftContent}>
                <img css={[leftImage, windowX < 769 && normalImage]} src={blog.src ? process.env.CATEGORY_URL + 'blog/' + blog.src : `/inoueryo.png`} />
              </div>
              <div className={windowX < 769 || 'box'} css={rightCard}>
                <h3 className="bold font14 mb10">{blog?.title}</h3>
                <p css={para}>{blog.description}</p>
                <div className="box-bottom" css={buttonContainer}>
                  <LoadingButton
                  className="mr5"
                    color="warning"
                    size="small"
                    onClick={(e) => moveEditPage(e, blog)}
                    loading={loading}
                    loadingPosition="start"
                    variant="outlined"
                    endIcon={<EditIcon />}
                  >
                    edit
                  </LoadingButton>
                  <LoadingButton
                    color="error"
                    size="small"
                    onClick={() => deletePage(blog)}
                    loading={loading}
                    loadingPosition="start"
                    variant="outlined"
                    endIcon={<DeleteIcon />}
                  >
                    delete
                  </LoadingButton>

                  {/* <button size='sm' colorScheme='orange' style={{marginRight: '10px'}} onClick={(e) => moveEditPage(e, blog)}>edit</button>
                  <button size='sm' colorScheme='red' onClick={() => deletePage(blog)}>delete</button> */}
                </div>
              </div>
            </div>
          )
        })
      }
    </>
  )
}

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
  // maxWidth: '200px',
  height: '200px',
}