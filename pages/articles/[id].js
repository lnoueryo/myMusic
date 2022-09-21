import styles from '../../styles/Home.module.css'
import { Avatar, Box, Badge, Text, AvatarBadge, AvatarGroup, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import ReactMarkdown from "react-markdown";
import { useRef } from 'react'
import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import rehypeRaw from "rehype-raw";
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
export default function Articles(article) {
  return (
    <div className={styles.container}>
      {
        article &&
      <div style={{width: '100%', paddingRight: '300px', maxWidth: '1000px', margin: 'auto', position: 'relative', display: 'flex'}}>
        <div style={{width: '100%', backgroundColor: 'white', padding: '30px', borderRadius: '3px', filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,.1))'}}>
          <h2 style={{fontWeight: 'bold', fontSize: '20px', marginBottom: '20px'}}>{article.title}</h2>
          <p style={{fontSize: '14px', marginBottom: '20px'}}>{article.description}</p>
            <ReactMarkdown
            components={markdownComponents}
            rehypePlugins={[rehypeRaw]}

            >
              {article.content}
            </ReactMarkdown>
        </div>
        <div style={{position: 'fixed', padding: '15px', width: '250px', minHeight: '150px', right: '8rem', backgroundColor: 'white', borderRadius: '3px', filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,.1))'}}>
          <Flex style={{marginBottom: '10px'}}>
            <Avatar src='/inoueryo.png' />
            <Box ml='3'>
              <Text fontWeight='bold'>
                lnoueryo
              </Text>
              <Text fontSize='sm'>Web Developer</Text>
            </Box>
          </Flex>
          <Flex style={{marginBottom: '10px'}}>
            <Badge ml='1' variant='solid'>
                Python
            </Badge>
            <Badge ml='1'  variant='solid' colorScheme='yellow'>
                Javascript
            </Badge>
            <Badge ml='1'  variant='solid' colorScheme='blue'>
                GO
            </Badge>
          </Flex>
          <p style={{fontSize: '13px'}}>I&apos;m a Python and Javascript web developer and aiming to be a full-stack developer</p>
          <a href="https://lnoueryo.jounetsism.biz" target="blank" style={{fontSize: '10px'}}>プロフィール →</a>
        </div>
      </div>
      }
    </div>
  )
}

import axios from '../../modules/httpclient'
Articles.getInitialProps = async ({query}) => {
  const response = await axios.get('/api/blog', {
    params: {
      id: query.id
    }
  })
  return response.data[0];
}