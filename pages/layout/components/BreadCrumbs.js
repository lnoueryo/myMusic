/** @jsxImportSource @emotion/react */

import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';

export default function IconBreadcrumbs() {
  const router = useRouter();

  const paths = router.asPath.split('/').filter(path => {
    return path && path[0] != '#';
  });

  const movePage = (paths, currentPath) => {
    let url = '/';
    for(let i = 0; i < paths.length; i++) {
      url += paths[i] + '/';
      if( paths[i] == currentPath) break;
    };
    router.push(url);
  };

  return (
    <div role="presentation" css={breadcrumbsWrapper}>
      <Breadcrumbs aria-label="breadcrumb">
        {
          paths.length == 0 ?
            <Typography
            sx={{ display: 'flex', alignItems: 'center' }}
            color="text.primary"
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Typography>
          :
          <Link
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
            color="inherit"
            onClick={() => router.push('/')}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Link>
        }
        {
          paths.map((path, i) => {
            if(paths.length - 1 == i) {
              return (
                <Typography
                  sx={{ display: 'flex', alignItems: 'center' }}
                  color="text.primary"
                  key={i}
                >
                  <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  {path}

                </Typography>
              )
            }
            return (
              <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                key={i}
                onClick={() => movePage(paths, path)}
              >
                <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                {path}
              </Link>
            )
          })
        }
      </Breadcrumbs>
    </div>
  );
}

const breadcrumbsWrapper = css({
  padding: '12px 8rem'
})