import styles from '../styles/Home.module.css'
import CategoryCards from './components/CategoryCards'
import axios from '/modules/httpclient'
export default function Home(categories) {
  console.log(categories)
  return (
    <div className={styles.container}>
      {
        categories && Object.values(categories).map(category => {
          return <CategoryCards key={category.id} {...category}></CategoryCards>
        })
      }
    </div>
  )
}

Home.getInitialProps = async ({query}) => {
  const response = await axios.get('/api/category')
  return response.data;
}