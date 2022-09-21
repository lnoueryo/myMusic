/** @jsxImportSource @emotion/react */
import { Image } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { css }  from '@emotion/react'
export default function CategoryCards(category) {
  const router = useRouter();
  const movePage = (name, tag) => {
    router.push(`/${name.toLowerCase()}/${tag.id}`)
  }
  const tagSrc = (src) => {
    return
  }
  return (
    <div>
      <h3 css={categoryTitle}>{category.name}</h3>
      <div className="content-container flex">
        <div className="flex justify-center" css={cardsContainer}>
          {
            category.tags?.map(tag => {
              return (
                <div className="flex-align-center justify-center w100 rel" css={card} key={tag.id} onClick={() => movePage(category.name, tag)}>
                  <span className="right-bottom" css={tagName}>{tag?.name}</span>
                  <div>
                    <img className="w100" src={process.env.CATEGORY_URL + category.name.toLowerCase() + '/' + tag.src} />
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

const categoryTitle = css({
  fontWeight: 'bold',
  fontSize: '24px'
})

const cardsContainer = css({
  flexWrap: 'wrap',
  marginRight: '300px',
  width: '100%',
  padding: '30px',
  borderRadius: '3px',
  filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,.1))'
})

const card = css({
  padding: '4px',
  maxWidth: '150px',
  backgroundColor: '#dcdfea',
  margin: '15px',
})

const tagName = {
  backgroundColor: '#000000b8',
  color: 'white',
  minWidth: '100%',
  fontSize: '13px',
  padding: '0 5px',
  textAlign: 'center'
}