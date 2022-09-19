import { Image, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router';

export default function ArticleCards({articles, tag}) {
  const articleURL = '/articles/'
  const router = useRouter();
  const movePage = (article) => router.push(articleURL + article.id)
  const moveEditPage = (e, article) => {
    e.stopPropagation();
    router.push('/admin/edit/' + article.id)
  }
  const deletePage = (article) => console.log(article)
  return (
    <div style={{fontFamily: '"游ゴシック体", "Yu Gothic", YuGothic, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif'}}>
      <h3 style={{fontWeight: 'bold',fontSize: '24px'}}>{tag?.title}</h3>
      <div style={{width: '100%', maxWidth: '1000px', margin: 'auto', position: 'relative', display: 'flex'}}>
        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginRight: '300px', width: '100%', padding: '30px', borderRadius: '3px', filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,.1))'}}>
          {
            articles.map(article => {
              return (
                <div key={article.id} onClick={() => movePage(article)} style={{width: '100%', backgroundColor: 'white', display: 'flex', alignItems: 'center', margin: '15px', position: 'relative'}}>
                  <Image style={{height: '150px'}} src={`/inoueryo.png`} />
                  <div style={{width: '100%', height: '100%', padding: '5px 10px', display: 'flex', flexDirection: 'column'}}>
                    <h3 style={{fontWeight: 'bold', fontSize: '14px', marginBottom: '10px'}}>{article?.title}</h3>
                    <p style={{color: '#99a9b0', fontSize: '10px'}}>{article.description}</p>
                    <div style={{marginTop: 'auto', justifyContent: 'end', display: 'flex'}}>
                      <Button style={{marginRight: '10px'}} onClick={(e) => moveEditPage(e, article)}>edit</Button>
                      <Button onClick={() => deletePage(article)}>delete</Button>
                    </div>
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