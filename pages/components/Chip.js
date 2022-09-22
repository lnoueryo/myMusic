/** @jsxImportSource @emotion/react */

import { css }  from '@emotion/react';

export default function Chip({ tag }) {

  const moveTagPage = (e, tag) => {
    e.stopPropagation();
    router.push('/' + tag?.category.name.toLowerCase() + '/' + tag.id)
  }

  return (
    <div className="flex-align-center justify-between" onClick={(e) => {moveTagPage(e, tag)}} css={chip}>
      <div className="flex-align-center">
        <img css={chipImage} src={process.env.CATEGORY_URL + tag?.category.name.toLowerCase() + '/' + tag?.src} />
        <div css={tagName}>{tag?.name}</div>
      </div>
    </div>
  )
};

const chip = css({
  margin: '3px',
  borderRadius: '20px',
  minWidth: '80px',
  backgroundColor: '#f4f4f7',
  padding: '5px 15px'
})

const chipImage = css({
  width: '12px'
})

const tagName = css({
  padding: '0 7px',
  fontSize: '8px',
  fontWeight: 'bold'
})