import styles from '../../styles/Home.module.css'
import ArticleAdminCards from '../components/ArticleAdminCards'
import axios from '/modules/httpclient'
import { Button } from '@chakra-ui/react'
export default function Admin(props) {
  const blogs = Object.values(props) || []
  return (
    <div className={styles.container}>
      {blogs.length == 0 || <ArticleAdminCards articles={blogs} />}
    </div>
  )
}

Admin.getInitialProps = async ({query}) => {
  const response = await axios.get('/api/blog')
  return response.data;
}
