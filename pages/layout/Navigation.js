/** @jsxImportSource @emotion/react */
import BreadCrumbs from './components/BreadCrumbs';
import { css }  from '@emotion/react';
export default function Navigation() {

  return (
    <div css={navigationWrapper}>
      <BreadCrumbs></BreadCrumbs>
    </div>
  )
}

const navigationWrapper = css({
  marginBottom: '20px'
})