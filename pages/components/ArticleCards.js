import { Image, Icon, mdiCloseCircleOutline } from '@chakra-ui/react'
import { useRouter } from 'next/router';

export default function ArticleCards({articles, tag}) {
  const articleURL = '/articles/'
  const router = useRouter();
  const movePage = (article) => router.push(articleURL + article.id)
  const moveTagPage = (e, tag) => {
    e.stopPropagation();
    router.push('/' + tag.category.name.toLowerCase() + '/' + tag.id)
  }
  return (
    <div style={{fontFamily: '"游ゴシック体", "Yu Gothic", YuGothic, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif'}}>
      <h3 style={{fontWeight: 'bold',fontSize: '24px'}}>{tag?.title}</h3>
      <div style={{width: '100%', maxWidth: '1000px', margin: 'auto', position: 'relative', display: 'flex'}}>
        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginRight: '300px', width: '100%', padding: '30px', borderRadius: '3px', filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,.1))'}}>
          {
            articles && articles.map(article => {
              return (
                <div key={article.id} onClick={() => movePage(article)} style={{width: '100%', height: '150px', backgroundColor: 'white', display: 'flex', alignItems: 'center', margin: '15px', position: 'relative'}}>
                  <Image style={{width: '150px', padding: '0 5px'}} src={`https://storage.googleapis.com/tech-blog-static/${tag.category.name.toLowerCase()}/${tag.src}`} />
                  <div style={{width: '100%', height: '100%', padding: '5px 10px', display: 'flex', flexDirection: 'column'}}>
                    <h3 style={{fontWeight: 'bold', fontSize: '14px', marginBottom: '10px'}}>{article?.title}</h3>
                    <p style={{color: '#99a9b0', fontSize: '10px'}}>{article.description}</p>
                    <div style={{marginTop: 'auto', justifyContent: 'end', display: 'flex', flexWrap: 'wrap-reverse'}}>
                    {
                    article.tags.length == 0 ? <div style={{marginRight: '10px'}}>なし</div> : article.tags.map(tag => {
                      return (
                        <div key={tag.id} onClick={(e) => {moveTagPage(e, tag)}} style={{margin: '3px', borderRadius: '20px', minWidth: '80px', backgroundColor: '#f4f4f7', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 15px'}}>
                          <div style={{display: 'flex', alignItems: 'center'}}>
                            <Image style={{width: '12px'}} src={`https://storage.googleapis.com/tech-blog-static/${tag.category.name.toLowerCase()}/${tag.src}`} />
                            <div style={{padding: '0 7px', fontSize: '8px', fontWeight: 'bold'}}>{tag.name}</div>
                          </div>
                        </div>
                      )
                    })
                  }
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