/** @jsxImportSource @emotion/react */

import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function Header() {
  const router = useRouter()
  const windowX = useSelector(state => state.config.windowSize.x)
  return (
    <header className="flex-align-center justify-between" css={windowX > 769 ? header : headerSP}>
      <div onClick={() => router.push('/')}>
        <img css={image} src="logo.png" alt="" />
        {/* <span style={{color: 'white'}} onClick={() => router.push('/')}>技術ブログ</span> */}
      </div>
    </header>
  )
};

const header = {
  padding: '4px 100px',
  marginBottom: '20px',
}

const headerSP = {
  padding: '4px 100px',
  marginBottom: '20px',
}

const image = {
  width: '100%',
  maxWidth: '250px',
  cursor: 'pointer'
}