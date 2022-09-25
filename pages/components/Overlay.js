/** @jsxImportSource @emotion/react */

import { css }  from '@emotion/react';

export default function Overlay({ onCover, children }) {

  return (
    <>
      <div css={[overlay, out, onCover && hover ]} role="overlay">
        <span className="flex-align-center justify-center w100 h100 bold font20">{children}</span>
      </div>
    </>
  )
}

const overlay = css({
  width: '100%',
  height: '100%',
  backgroundColor: '#8b9ad0',
  position: 'absolute',
  transition: 'all .3s',
  opacity: '.5'
})

const out = css({
  transform: 'translateY(101%)'
})

const hover = css({
  transform: 'translateY(0)'
})
