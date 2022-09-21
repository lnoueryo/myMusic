import styles from '/styles/Home.module.css'
import { Avatar, Box, Badge, Text, Textarea, Button, useToast, Image } from '@chakra-ui/react'
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import rehypeRaw from "rehype-raw";
import axios from '/modules/httpclient'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import AlertDialog from '../../components/AlertDialog';
import SelectTag from '../../components/SelectTag';
import CropperModal from '../../components/CropperModal';
import { useRef } from 'react';
import Icon from '@mdi/react'
import { mdiCloseCircleOutline  } from '@mdi/js';
import { useRouter } from 'next/router';
export default function EditArticle(props) {
  const router = useRouter()
  let [article, allTags] = [props[0], props[1]]
  const [title, setTitle] = useState(article.title)
  const [description, setDescription] = useState(article.description)
  const [content, setContent] = useState(article.content)
  const [tags, setTags] = useState(article.tags || [])
  const [src, setSrc] = useState(article.src)
  const [newSrc, setNewSrc] = useState()
  const [created_at, setCreatedAt] = useState(article.created_at)
  const toast = useToast();
  const imageRef = useRef(null);

  const unselectedTags = (unselectedTags, tags) => {
    let set = new Set(tags.map(tag => tag.id));
    return unselectedTags.filter(unselectedTag => {
      return !set.has(unselectedTag.id)
    })
  }

  const update = async(params) => {
    console.log((article.src && src && !!newSrc) ? '削除' : '削除不要')
    const srcParams = {src: params['src'], newSrc: params['newSrc'], isDelete: params['isDelete']}
    console.log(srcParams)
    const res = await saveImage(srcParams);
    params['src'] = res.data.src;
    const toastObl = {
      title: 'Success',
      description: '更新しました。',
      status: 'success',
      duration: 5000,
      isClosable: true,
    }
    let response;
    try {
      response = await axios.put('/api/blog', params);
    } catch (error) {
      toastObl.title = 'Failed'
      toastObl.description = '行進失敗しました。'
      toastObl.status = 'error'
    }
    toast(toastObl)
    router.push('/admin')
  }

  const saveImage = async params => {
    const response = await axios.post('/api/storage', params);
    return response;
  }

  const addTag = (e) => {
    setTags( [...tags, JSON.parse(e.target.value)])
    e.target.value = ''
  }

  const removeTag = (unneededTag) => {
    const filteredTags = tags.filter(tag => tag.id != unneededTag.id)
    setTags(filteredTags)
  }

  const srcPath = (src) => {
    return !!src && 'https://storage.googleapis.com/tech-blog-static/blog/' + src;
  }

  return (
    <div className={styles.container}>
      {
        article &&
        <div style={{width: '100%', maxWidth: '1000px', margin: 'auto', position: 'relative', }}>
          <div style={{width: '100%%', backgroundColor: 'white', padding: '30px', marginBottom: '20px', borderRadius: '3px', filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,.1))'}}>
              {/* <div style={{marginBottom: '20px'}}>
                <Text mb='8px'>タイトル</Text>
                <Textarea
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder='Here is a sample placeholder'
                  size='sm'
                ></Textarea>
              </div> */}
            <div style={{display: 'flex'}}>
              <div style={{width: '100%'}}>
                <div style={{marginBottom: '20px'}}>
                  <Text mb='8px'>タイトル</Text>
                  <Textarea
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder='Here is a sample placeholder'
                    size='sm'
                  ></Textarea>
                </div>
                <div style={{marginBottom: '20px'}}>
                  <Text mb='8px'>背景</Text>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Here is a sample placeholder'
                    size='sm'
                  ></Textarea>
                </div>
              </div>
              <div style={{minWidth: '200px', padding: '0 10px', display: 'flex', flexDirection: 'column', marginBottom: '20px'}}>
                <div style={{maxWidth: '180px', width: '100%', height: '100%', marginTop: '33px', borderRadius: '3px', position: 'relative'}}>
                  <Image src={ newSrc || srcPath(src) || "/noimage.png" } style={{width: '100%', border: 'solid 1px #e2e8f0', borderRadius: '3px'}} ref={imageRef} />
                  {
                    !!src &&
                      <Icon path={mdiCloseCircleOutline}
                      style={{position: 'absolute', top: '5px', right: '5px'}}
                      size={0.7}
                      color="#fb6b30"
                      onClick={() => {newSrc ? setNewSrc('') : setSrc('')}}
                      role="mdiCloseCircleOutline"
                    />
                  }
                </div>
                <CropperModal setSrc={setNewSrc} />
              </div>
            </div>
              <div style={{marginBottom: '20px'}}>
                <Text mb='8px'>タグ</Text>
                <div style={{display: 'flex', marginBottom: '8px'}}>
                  {
                    !tags && tags.length == 0 ? <div style={{marginRight: '10px'}}>なし</div> : tags.map(tag => {
                      return (
                        <div key={tag.id} style={{marginRight: '10px', borderRadius: '20px', minWidth: '120px', backgroundColor: '#f4f4f7', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 15px'}}>
                          <div style={{display: 'flex', alignItems: 'center'}}>
                            <Image style={{width: '24px'}} src={`/${tag.category.name}/${tag.src}`} />
                            <div style={{padding: '0 7px', fontSize: '12px', fontWeight: 'bold'}}>{tag.name}</div>
                          </div>
                          <div>
                          <Icon path={mdiCloseCircleOutline}
                            size={0.6}
                            color="#fb6b30"
                            onClick={() => {removeTag(tag)}}
                            role="mdiCloseCircleOutline"
                          />
                          </div>
                        </div>
                      )
                    })
                  }
                  {/* <Button colorScheme='blue' size='sm'>追加</Button> */}
                </div>
                <SelectTag tags={unselectedTags(allTags, tags)} func={addTag} selectedTags={tags}></SelectTag>
              </div>
              <AlertDialog buttonText="更新" func={() => {update({id: article.id, title, description, content, tags, created_at, src: article.src, newSrc, isDelete: article.src && src && !!newSrc})}}></AlertDialog>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{width: '48%', backgroundColor: 'white', padding: '30px', borderRadius: '3px', filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,.1))'}}>
              <Text mb='8px'>背景</Text>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Here is a sample placeholder'
                size='sm'
              ></Textarea>
              <Text mb='8px'>内容</Text>
              <Textarea
              rows="30"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='Here is a sample placeholder'
                size='sm'
              ></Textarea>
            </div>
            <div style={{padding: '15px', width: '48%', minHeight: '150px', right: '8rem', backgroundColor: 'white', borderRadius: '3px', filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,.1))'}}>
              <h2 style={{fontWeight: 'bold', fontSize: '20px', marginBottom: '20px'}}>{title}</h2>
              <p style={{fontSize: '14px', marginBottom: '20px'}}>{description}</p>
                <ReactMarkdown
                components={markdownComponents}
                rehypePlugins={[rehypeRaw]}

                >
                  {content}
                </ReactMarkdown>
            </div>
          </div>
      </div>
      }
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
  return [blog.data[0], tags.data];
}

const markdownComponents = {
  pre: (pre) => {
    // 中身がcodeでなければ普通に表示させる
    if (pre.children[0].type !== "code") {
      return <pre>{pre.children}</pre>;
    }

    const code = pre.children[0];
    // 正規表現で"language-言語名:ファイル名"をマッチする
    const matchResult = code.props.className?.match(/language-(\w+)(:(.+))?/);
    const language = matchResult?.[1] || "";
    const filename = matchResult?.[3] || undefined;

    return (
      <SyntaxHighlighter
        language={language}
        // ファイル名がある場合、表示用の余白を作る
        customStyle={filename && { paddingTop: "2.5rem" }}
        showLineNumbers
        // CSSの擬似要素を使ってファイル名を表示させるため
        data-filename={filename}
      >
        {code.props.children[0]}
      </SyntaxHighlighter>
    );
  },
};