/** @jsxImportSource @emotion/react */

import BlogAdminCards from '../components/BlogAdminCards';
import axios from '/modules/httpclient';
import { LoadingButton } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { TextField } from '@mui/material';
import { useRouter } from 'next/router';
export default function Admin(props) {
  const router = useRouter()
  const blogs = Object.values(props) || [];
  const [loading, setLoading] = useState(false);
  const [searchWord, setSearchWord] = useState(null);
  const moveCreatePage = () => router.push('/admin/create');

  const searchBlogs = (blogs) => {
    return blogs?.length != 0 ? blogs.filter(blog => !searchWord || blog.title.includes(searchWord) || blog.description.includes(searchWord)) : []
  };

  return (
    <section>
    <div className="wrapper">
      <div className="container">
        <div className="flex justify-center wrap w100 content-container" css={contentContainer}>
          <div style={{width: '100%'}}>
              <LoadingButton
                className="mr5 mb10"
                color="primary"
                onClick={() => moveCreatePage()}
                loading={loading}
                loadingPosition="start"
                variant="outlined"
                endIcon={<AddIcon />}
              >
                create
              </LoadingButton>
              <TextField
              fullWidth
                id="outlined-name"
                label="search"
                onChange={(e) => setSearchWord(e.target.value)}
              />
          </div>
          {blogs && <BlogAdminCards blogs={searchBlogs(blogs)} />}
        </div>
      </div>
    </div>
  </section>
  )
}

Admin.getInitialProps = async ({query}) => {
  const response = await axios.get('/api/blog')
  return response.data;
}

const contentContainer = {
  filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,.1))'
}