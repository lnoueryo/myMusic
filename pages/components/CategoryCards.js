/** @jsxImportSource @emotion/react */

import { useRouter } from 'next/router';
import Overlay from './Overlay'
import { useState } from 'react'
import { HelpOutline } from '@mui/icons-material';

const MAX_CARD_NUM = 3;

export default function CategoryCards(category) {
  const router = useRouter();
  const [tagKey, setTagKey] = useState('')

  const movePage = (name, tag) => {
    router.push(`/${name.toLowerCase()}/${tag.id}`);
  }

  const createFake = (category) => {
    const fakeNum = MAX_CARD_NUM - ((category.tags?.length || 0) % MAX_CARD_NUM);
    for (let i = 0; i < fakeNum; i++) {
      const key = category.name + 'fake' + i
      category.tags.push({id: '', name: key})
    }
    return category
  }

  const createTags = (category) => {
    const copy = JSON.parse(JSON.stringify(category))
    const newCategory = createFake(copy)
    return newCategory.tags?.map((tag, i) => {
      if(tag.id) {
        return (
          <div key={tag.name} onMouseEnter={() => setTagKey(tag.id)} onMouseLeave={() => setTagKey('Nan')} className="flex-align-center justify-center rel" css={card} onClick={() => movePage(category.name, tag)}>
            <Overlay key={tag.name + 'hello'} onCover={tagKey == tag.id}>{tag?.name}</Overlay>
            <div className="flex">
              <img className="w100" style={{filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,.3))'}} src={process.env.CATEGORY_URL + category.name.toLowerCase() + '/' + tag.src} alt={tag.name} />
            </div>
          </div>
        )
      }
      return <div key={tag.name} className="flex-align-center justify-center rel hide" css={card} style={{cursor: 'initial'}}></div>
    })
  }

  return (
    <div className="flex justify-center wrap" key={category.name}>
      {
        createTags(category)
      }
      {/* {
        createFake(category)
      } */}
    </div>
  )
}

const card = {
  padding: '4px',
  width: 'calc(28% - 24px)',
  backgroundColor: '#E1F8F9',
  margin: '20px',
  overflow: 'hidden',
  cursor: 'pointer',
  borderRadius: '3px',
  filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,.2))'
};
