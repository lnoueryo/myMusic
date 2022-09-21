import { Image, Button, Input } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function ArticleCards({articles, tag}) {
  const articleURL = '/articles/'
  const router = useRouter();
  const [searchWord, setSearchWord] = useState(null)
  const movePage = (article) => router.push(articleURL + article.id)
  const moveCreatePage = () => router.push('/admin/create')
  const moveEditPage = (e, article) => {
    e.stopPropagation();
    router.push('/admin/edit/' + article.id)
  }
  const deletePage = (article) => console.log(article)
  const searchBlogs = (blogs) => {
    return blogs?.length != 0 ? blogs.filter(blog => !searchWord || blog.title.includes(searchWord) || blog.description.includes(searchWord)) : []
  }
  return (
    <div style={{fontFamily: '"游ゴシック体", "Yu Gothic", YuGothic, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif'}}>
      <h3 style={{fontWeight: 'bold',fontSize: '24px'}}>{tag?.title}</h3>
      <div style={{width: '100%', maxWidth: '1000px', margin: 'auto', position: 'relative', display: 'flex'}}>
        <div style={{display: 'flex', flexWrap: 'wrap', backgroundColor: 'white', marginRight: '300px', width: '100%', padding: '30px', borderRadius: '3px', filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,.1))'}}>
          <div style={{display: 'flex', alignItems: 'center', width: '100%'}}>
            <Button style={{margin: '5px 0', marginRight: '5px'}} colorScheme='blue' size='sm' onClick={() => moveCreatePage()}>create</Button>
            <Input style={{}} placeholder='small size' size='sm' onChange={(e) => setSearchWord(e.target.value)} />
          </div>
          {
            articles && searchBlogs(articles).map(article => {
              return (
                <div key={article.id} onClick={() => movePage(article)} style={{width: '100%', backgroundColor: 'white', display: 'flex', alignItems: 'center', margin: '15px', position: 'relative', border: 'solid 1px #e2e8f0', borderRadius: '3px'}}>
                  <Image style={{height: '150px'}} src={article.src ? 'https://storage.googleapis.com/tech-blog-static/blog/' + article.src : `/inoueryo.png`} />
                  <div style={{width: '100%', height: '100%', padding: '5px 10px', display: 'flex', flexDirection: 'column'}}>
                    <h3 style={{fontWeight: 'bold', fontSize: '14px', marginBottom: '10px'}}>{article?.title}</h3>
                    <p style={{color: '#99a9b0', fontSize: '10px'}}>{article.description}</p>
                    <div style={{marginTop: 'auto', justifyContent: 'end', display: 'flex'}}>
                      <Button size='sm' colorScheme='orange' style={{marginRight: '10px'}} onClick={(e) => moveEditPage(e, article)}>edit</Button>
                      <Button size='sm' colorScheme='red' onClick={() => deletePage(article)}>delete</Button>
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