/** @jsxImportSource @emotion/react */

import { Avatar, Box, Badge, Text, Textarea, Button, useToast, Image } from '@chakra-ui/react'
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import rehypeRaw from "rehype-raw";
import { useRef, useState } from 'react';
import axios from '/modules/httpclient';
import AlertDialog from '../components/AlertDialog';
import SelectTag from '../components/SelectTag';
import CropperModal from '../components/CropperModal';
import Icon from '@mdi/react'
import { mdiCloseCircleOutline  } from '@mdi/js';
import { useSelector } from 'react-redux';
import { FormControl, InputLabel, OutlinedInput, InputAdornment } from '@mui/material';
import Markdown from '../components/Markdown';


export default function CreateArticle({func, props}) {
  const windowX = useSelector(state => state.config.windowSize.x);
  let [allTags, article] = [props[0], props[1]]
  // console.log(article)
  if(!article) {
    article = {title: '', description: '', content: ''}
  }
  const [title, setTitle] = useState(article.title)
  const [description, setDescription] = useState(article.description)
  const [content, setContent] = useState(article.content)
  const [tags, setTags] = useState(article.tags || [])
  const [src, setSrc] = useState(article.src)
  const [newSrc, setNewSrc] = useState()
  const [created_at, setCreatedAt] = useState(article.created_at)
  const imageRef = useRef(null);
  const getNewSrc = (src) => {
    setNewSrc(src)
  }


  const unselectedTags = (unselectedTags, tags) => {
    console.log(unselectedTags)
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

  const srcPath = (src) => {
    console.log(src)
    return !!src && 'https://storage.googleapis.com/tech-blog-static/blog/' + src;
  }

  return (
    article &&
    <div style={{width: '100%', maxWidth: '1000px', margin: 'auto', position: 'relative', }}>
      <div style={{width: '100%%', backgroundColor: 'white', padding: '30px', marginBottom: '20px', borderRadius: '3px', filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,.1))'}}>
        <div className={`flex ${windowX < 768 && 'wrap'}`}>
          <div className="w100">
            <div className="mb20">
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">タイトル</InputLabel>
                <OutlinedInput
                 style={{padding: '0'}}
                  id="outlined-adornment-amount"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  label="タイトル"
                />
              </FormControl>
            </div>
            <div className="mb20">
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">背景</InputLabel>
                <OutlinedInput
                  style={{padding: '0'}}
                  id="outlined-adornment-amount"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  label="背景"
                />
              </FormControl>
            </div>
          </div>
          <div css={rightContainer}>
            <div css={imageContainer}>
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
            <CropperModal setSrc={getNewSrc} />
          </div>
        </div>
        <div style={{marginBottom: '20px'}}>
          <Text mb='8px'>タグ</Text>
          <div style={{display: 'flex', marginBottom: '8px', flexWrap: 'wrap'}}>
            {
              !tags && tags.length == 0 ? <div style={{marginRight: '10px'}}>なし</div> : tags.map(tag => {
                return (
                  <div key={tag.id} style={{marginRight: '10px', borderRadius: '20px', minWidth: '120px', backgroundColor: '#f4f4f7', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 15px'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      <Image style={{width: '24px'}} src={`${process.env.CATEGORY_URL}${(tag.category.name).toLowerCase()}/${tag.src}`} />
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
        <AlertDialog buttonText="更新" func={() => {return func({id: article.id, title, description, content, tags, created_at, src: article.src, newSrc, isDelete: article.src && !src || !!newSrc})}}></AlertDialog>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{width: '48%', backgroundColor: 'white', padding: windowX < 768 ? 0 : '30px', borderRadius: '3px', filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,.1))'}}>
          内容
          <textarea style={{width: '100%'}} rows="30" cols="30" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        </div>
        <div style={{padding: '15px', width: '48%', minHeight: '150px', right: '8rem', backgroundColor: 'white', borderRadius: '3px', filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,.1))'}}>
          <h2 style={{fontWeight: 'bold', fontSize: '20px', marginBottom: '20px'}}>{title}</h2>
          <p style={{fontSize: '14px', marginBottom: '20px'}}>{description}</p>
          <Markdown content={content} />
        </div>
      </div>
  </div>
  )
}

CreateArticle.getInitialProps = async ({query}) => {
  const tags = await axios.get('/api/tag');
  return tags.data;
}

const rightContainer = {
  minWidth: '200px',
  padding: '0 10px',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '20px'
}

const imageContainer = {
  maxWidth: '180px',
  width: '100%',
  height: '100%',
  borderRadius: '3px',
  position: 'relative'
}

const image = {
  width: '100%',
  border: 'solid 1px #e2e8f0',
  borderRadius: '3px'
}