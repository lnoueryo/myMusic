import styles from '../../styles/Home.module.css'
import ArticleAdminCards from '../components/ArticleAdminCards'
import axios from '/modules/httpclient'
export default function Admin(props) {
  const blogs = Object.values(props)
  return (
    <div className={styles.container}>
      {<ArticleAdminCards articles={blogs} />}
    </div>
  )
}

Admin.getInitialProps = async ({query}) => {
  const response = await axios.get('/api/blog')
  return response.data;
}
