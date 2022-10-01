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

  const createFake = (tags) => {
    const fakeNum = MAX_CARD_NUM - ((tags?.length || 0) % MAX_CARD_NUM);
    const fakes = [];
    for (let i = 0; i < fakeNum; i++) {
      fakes.push(
        <div className="flex-align-center justify-center rel hide" css={card} style={{cursor: 'initial'}}><img /></div>
      )
    }
    return fakes
  }

  return (
    <>
      {
        category.tags?.map((tag, i) => {
          return (
            <div key={tag.name} onMouseEnter={() => setTagKey(tag.id)} onMouseLeave={() => setTagKey('Nan')} className="flex-align-center justify-center rel" css={card} onClick={() => movePage(category.name, tag)}>
              <Overlay key={tag.name} onCover={tagKey == tag.id}>{tag?.name}</Overlay>
              <div className="flex">
                <img className="w100" style={{filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,.3))'}} src={process.env.CATEGORY_URL + category.name.toLowerCase() + '/' + tag.src} alt={tag.name} />
              </div>
            </div>
          )
        })
      }
      {
        createFake(category.tags)
      }
    </>
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
