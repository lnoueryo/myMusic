import styles from '../styles/Home.module.css'
import CategoryCards from './components/CategoryCards'
import languages from '/public/categories/languages.json'
export default function Home() {
  return (
    <div className={styles.container}>
      {
        languages &&
        <CategoryCards title="language" categories={languages} />
      }
    </div>
  )
}

