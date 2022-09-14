import { Image } from '@chakra-ui/react'
import { useRouter } from 'next/router';
export default function CategoryCards({title, categories}) {
  const router = useRouter();
  const movePage = (category) => router.push(category.url + category.id)
  return (
    <div style={{fontFamily: '"游ゴシック体", "Yu Gothic", YuGothic, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;'}}>
      <h3 style={{fontWeight: 'bold',fontSize: '24px'}}>{title}</h3>
      <div style={{width: '100%', maxWidth: '900px', margin: 'auto', position: 'relative', display: 'flex'}}>
        <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginRight: '250px', width: '100%', padding: '30px', borderRadius: '3px', filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,.1))'}}>
          {
            categories?.map(category => {
              return (
                <div key={category.id} onClick={() => movePage(category)} style={{width: '100%', maxWidth: '150px', backgroundColor: 'white', display: 'flex', alignItems: 'center', margin: '15px', position: 'relative'}}>
                  <span style={{position: 'absolute', right: 0, bottom: 0, backgroundColor: '#000000b8', color: 'white', minWidth: '100%', fontSize: '13px', padding: '0 5px', textAlign: 'center'}}>{category?.title}</span>
                  <Image src={category.src} />
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}