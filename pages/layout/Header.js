import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@chakra-ui/react'
import { useRouter } from 'next/router';
export default function Header() {
  const router = useRouter();
  const paths = router.asPath.split('/').filter(path => {
    return path && path[0] != '#'
  });
  const movePage = (paths, currentPath) => {
    let url = '/'
    for(let i = 0; i < paths.length; i++) {
      url += paths[i] + '/';
      if( paths[i] == currentPath) break;
    }
    router.push(url);
  }
  return (
    <div style={{marginBottom: '20px'}}>
      <header style={{padding: '24px 8rem', marginBottom: '20px', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'spaceBetween', filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,.5))'}}>
        <div><img src="https://fastcoding.jp/blog/wp-content/themes/fcvanilla/img/fc_logo_blog.svg" alt="" /></div>
      </header>
      <Breadcrumb style={{padding: '12px 8rem', }} fontWeight='medium' fontSize='sm'>
        <BreadcrumbItem>
          <BreadcrumbLink onClick={() => router.push('/')}>Home</BreadcrumbLink>
        </BreadcrumbItem>
        {
          paths.map((path, i) => {
            return (
              <BreadcrumbItem key={i}>
                <BreadcrumbLink onClick={() => movePage(paths, path)}>{path}</BreadcrumbLink>
              </BreadcrumbItem>
            )
          })
        }


        {/* <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href='#'>Current</BreadcrumbLink>
        </BreadcrumbItem> */}
      </Breadcrumb>
    </div>
  )
}