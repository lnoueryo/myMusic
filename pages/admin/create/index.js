import styles from '/styles/Home.module.css'
import { Avatar, Box, Badge, Text, Textarea, Button, useToast, Image } from '@chakra-ui/react'
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import rehypeRaw from "rehype-raw";
import { useRef, useState } from 'react';
import axios from '/modules/httpclient';
import AlertDialog from '../../components/AlertDialog';
import SelectTag from '../../components/SelectTag';
import CropperModal from '../../components/CropperModal';
import Icon from '@mdi/react'
import { mdiCloseCircleOutline  } from '@mdi/js';
import { useRouter } from 'next/router';


export default function CreateArticle(props) {
  const imageRef = useRef(null);
  const router = useRouter()
  const allTags = Object.values(props);
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [content, setContent] = useState()
  const [tags, setTags] = useState([])
  const [newSrc, setNewSrc] = useState('')
  const toast = useToast();

  const create = async(params) => {
    const srcParams = {src: '', newSrc: params['newSrc'], isDelete: false}
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
      response = await axios.post('/api/blog', params);
    } catch (error) {
      toastObl.title = 'Failed'
      toastObl.description = '行進失敗しました。'
      toastObl.status = 'error'
    }
    toast(toastObl);
    router.push('/admin');
  }

  const saveImage = async params => {
    const response = await axios.post('/api/storage', params);
    return response;
  }

  const unselectedTags = (unselectedTags, tags) => {
    let set = new Set(tags.map(tag => tag.id));
    return unselectedTags.filter(unselectedTag => {
      return !set.has(unselectedTag.id)
    })
  }

  const addTag = (e) => {
    setTags( [...tags, JSON.parse(e.target.value)])
    e.target.value = ''
  }

  const removeTag = (unneededTag) => {
    const filteredTags = tags.filter(tag => tag.id != unneededTag.id)
    setTags(filteredTags)
  }

  return (
    <div className={styles.container}>
      {
        <div style={{width: '100%', maxWidth: '1000px', margin: 'auto', position: 'relative', }}>
          <div style={{width: '100%%', backgroundColor: 'white', padding: '30px', marginBottom: '20px', filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,.1))'}}>
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
                  <Image src={ newSrc || "/noimage.png"} style={{width: '100%', border: 'solid 1px #e2e8f0', borderRadius: '3px'}} ref={imageRef} />
                  {
                    newSrc &&
                      <Icon path={mdiCloseCircleOutline}
                      style={{position: 'absolute', top: '5px', right: '5px'}}
                      size={0.7}
                      color="#fb6b30"
                      onClick={() => {setNewSrc('')}}
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
                </div>
                <SelectTag tags={unselectedTags(allTags, tags)} func={addTag} selectedTags={tags}></SelectTag>
              </div>
              {/* <button onClick={() => {test(input.current.files[0])}}>hello</button> */}
              <AlertDialog buttonText="更新" func={() => {create({title, description, content, tags, newSrc})}}></AlertDialog>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{width: '48%', backgroundColor: 'white', padding: '30px', borderRadius: '3px', filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,.1))'}}>
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
  // return (
  //   <div className={styles.container}>
  //     <AlertDialog buttonText="保存" func={() => {create({title, description, content})}}></AlertDialog>
  //     {
  //       <div style={{width: '100%', maxWidth: '1000px', margin: 'auto', position: 'relative', }}>
  //         <div style={{width: '49%', marginBottom: '20px'}}>
  //           {/* <Button colorScheme='blue' size='sm' onClick={() => create({title, description, content})}>保存</Button> */}
  //         </div>
  //         <div style={{display: 'flex', justifyContent: 'space-between'}}>
  //           <div style={{width: '49%', backgroundColor: 'white', padding: '30px', borderRadius: '3px', filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,.1))'}}>
  //             <Text mb='8px'>タイトル</Text>
  //             <Textarea
  //               value={title}
  //               onChange={(e) => setTitle(e.target.value)}
  //               placeholder='Here is a sample placeholder'
  //               size='sm'
  //             ></Textarea>
  //             <Text mb='8px'>背景</Text>
  //             <Textarea
  //               value={description}
  //               onChange={(e) => setDescription(e.target.value)}
  //               placeholder='Here is a sample placeholder'
  //               size='sm'
  //             ></Textarea>
  //             <Text mb='8px'>背景</Text>
  //             <Textarea
  //             rows="30"
  //               value={content}
  //               onChange={(e) => setContent(e.target.value)}
  //               placeholder='Here is a sample placeholder'
  //               size='sm'
  //             ></Textarea>
  //             <div>
  //             </div>
  //           </div>
  //           <div style={{padding: '15px', width: '48%', minHeight: '150px', right: '8rem', backgroundColor: 'white', borderRadius: '3px', filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,.1))'}}>
  //             <h2 style={{fontWeight: 'bold', fontSize: '20px', marginBottom: '20px'}}>{title}</h2>
  //             <p style={{fontSize: '14px', marginBottom: '20px'}}>{description}</p>
  //               <ReactMarkdown
  //               components={markdownComponents}
  //               rehypePlugins={[rehypeRaw]}

  //               >
  //                 {content}
  //               </ReactMarkdown>
  //           </div>
  //         </div>
  //     </div>
  //     }
  //   </div>
  // )
}

CreateArticle.getInitialProps = async ({query}) => {
  const tags = await axios.get('/api/tag');
  return tags.data;
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
