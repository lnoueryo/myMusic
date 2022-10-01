/** @jsxImportSource @emotion/react */

import { css }  from '@emotion/react';
import { useSelector } from 'react-redux';

export default function Overlay({ onCover, children }) {
  const windowX = useSelector(state => state.config.windowSize.x)
  return (
    <>
      <div css={[overlay, out, onCover && hover ]} role="overlay">
        <span className="flex-align-center justify-center w100 bold" css={windowX > 768 ? title : titleSP}>{children}</span>
      </div>
    </>
  )
}

const overlay = {
  width: '100%',
  position: 'absolute',
  transition: 'all .3s',
  zIndex: 5
}

const out = {
  transform: 'translateY(0%)',
  bottom: '-100%',
}

const hover = {
  bottom: '0%',
}

const title = {
  fontSize: '20px',
  backgroundColor: '#ffffff94'
}

const titleSP = {
  fontSize: '10px',
  backgroundColor: '#ffffff94'
}