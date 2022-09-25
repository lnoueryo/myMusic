/** @jsxImportSource @emotion/react */

import { useRouter } from 'next/router';
import Overlay from './Overlay'
import { useState } from 'react'

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
        <div className="flex-align-center justify-center rel hide" css={card}><img /></div>
      )
    }
    return fakes
  }

  return (
    <>
      {
        category.tags?.map((tag, i) => {
          return (
            <div key={tag.id} onMouseEnter={() => setTagKey(tag.id)} onMouseLeave={() => setTagKey('Nan')} className="flex-align-center justify-center rel" css={card} onClick={() => movePage(category.name, tag)}>
              <Overlay key={tag.id} onCover={tagKey == tag.id}>{tag?.name}</Overlay>
              <div>
                <img className="w100" src={process.env.CATEGORY_URL + category.name.toLowerCase() + '/' + tag.src} alt={tag.name} />
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
  backgroundColor: '#dcdfea',
  margin: '20px',
  overflow: 'hidden'
};

const tagName = {
  backgroundColor: '#000000b8',
  color: 'white',
  minWidth: '100%',
  fontSize: '13px',
  padding: '0 5px',
  textAlign: 'center'
};
