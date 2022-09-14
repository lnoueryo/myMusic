import { Image } from '@chakra-ui/react'
import { useRouter } from 'next/router';

export default function ArticleCards({articles, category}) {
  const articleURL = '/articles/'
  const router = useRouter();
  const movePage = (article) => router.push(articleURL + article.id)
  return (
    <div style={{fontFamily: '"游ゴシック体", "Yu Gothic", YuGothic, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;'}}>
      <h3 style={{fontWeight: 'bold',fontSize: '24px'}}>{category?.title}</h3>
      <div style={{width: '100%', maxWidth: '900px', margin: 'auto', position: 'relative', display: 'flex'}}>
        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginRight: '250px', width: '100%', padding: '30px', borderRadius: '3px', filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,.1))'}}>
          {
            articles && category &&
            articles.map(article => {
              return (
                <div key={article.id} onClick={() => movePage(article)} style={{width: '100%', backgroundColor: 'white', display: 'flex', alignItems: 'center', margin: '15px', position: 'relative'}}>
                  <Image style={{height: '150px'}} src={category.src} />
                  <div style={{height: '100%', padding: '5px 10px'}}>
                    <h3 style={{fontWeight: 'bold', fontSize: '14px', marginBottom: '10px'}}>{article?.title}</h3>
                    <p style={{color: '#99a9b0', fontSize: '10px'}}>{article.description}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}