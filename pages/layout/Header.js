/** @jsxImportSource @emotion/react */

import { css }  from '@emotion/react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function Header() {
  const router = useRouter()
  const windowX = useSelector(state => state.config.windowSize.x)
  return (
    <header className="flex-align-center justify-between" css={windowX > 769 ? header : headerSP}>
      <div>
        {/* <img src="https://fastcoding.jp/blog/wp-content/themes/fcvanilla/img/fc_logo_blog.svg" alt="" /> */}
        <span style={{color: 'white'}} onClick={() => router.push('/')}>技術ブログ</span>
      </div>
    </header>
  )
};

const header = {
  padding: '24px 8rem',
  marginBottom: '20px',
  background: '#333',
  filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,.5))'
}

const headerSP = {
  padding: '24px 40px',
  marginBottom: '20px',
  background: '#333',
  filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,.5))'
}