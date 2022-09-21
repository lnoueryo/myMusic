/** @jsxImportSource @emotion/react */

import { css }  from '@emotion/react';

export default function Header() {

  return (
    <header className="flex-align-center justify-between" css={header}>
      <div>
        {/* <img src="https://fastcoding.jp/blog/wp-content/themes/fcvanilla/img/fc_logo_blog.svg" alt="" /> */}
        <span style={{color: 'white'}}>Golang</span>
      </div>
    </header>
  )
};

const header = css({
  padding: '24px 8rem',
  marginBottom: '20px',
  background: '#333',
  filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,.5))'
})