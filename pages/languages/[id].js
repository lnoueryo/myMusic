import styles from '../../styles/Home.module.css'
import { Avatar, Box, Badge, Text, AvatarBadge, AvatarGroup, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import languages from '/public/categories/languages.json'
import articles from '/public/articles.json'
import ArticleCards from '../components/ArticleCards'
export default function Home() {
  const router = useRouter()
  const { id, lang } = router.query
  const language = languages.find(lang => lang.id == id)
  return (
    <div className={styles.container}>
      {language && articles && <ArticleCards articles={articles} category={language} />}
    </div>
  )
}

