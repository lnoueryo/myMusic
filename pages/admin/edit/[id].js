/** @jsxImportSource @emotion/react */

import axios from '/modules/httpclient'
import EditMarkdown from '../../components/EditMarkdown';
import { useRouter } from 'next/router';

export default function EditArticle(props) {
  const router = useRouter()

  const update = async(params) => {
    console.log(params['isDelete'] ? '削除' : '削除不要')
    const srcParams = {src: params['src'], newSrc: params['newSrc'], isDelete: params['isDelete']}
    const res = await saveImage(srcParams);
    params['src'] = res.data.src;
    let response;
    try {
      response = await axios.put('/api/blog', params);
    } catch (error) {
      console.error(error)
    }
    router.push('/admin')
    return !!response;
  }

  const saveImage = async params => {
    const response = await axios.post('/api/storage', params);
    return response;
  }

  return (
    <div className="container">
      {props && <EditMarkdown func={update} props={props}/>}
    </div>
  )
}

EditArticle.getInitialProps = async ({query}) => {
  const blog = await axios.get('/api/blog', {
    params: {
      id: query.id
    }
  })
  const tags = await axios.get('/api/tag');
  return [tags.data, blog.data[0]];
}
