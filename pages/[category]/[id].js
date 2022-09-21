import styles from '../../styles/Home.module.css'
import ArticleCards from '../components/ArticleCards'
import axios from '/modules/httpclient'
export default function Languages(tag) {
  return (
    <div className={styles.container}>
      {tag.blogs && <ArticleCards articles={tag.blogs} tag={tag} />}
    </div>
  )
}

Languages.getInitialProps = async ({query}) => {
  const response = await axios.get('/api/tag', {
    params: {id: query.id}
  })
  return response?.data[0];
}
