/** @jsxImportSource @emotion/react */

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import rehypeRaw from "rehype-raw";
import ProfileCard from '../components/ProfileCard';
import Markdown from "../components/Markdown";

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
      <div style={{margin: '10px 0'}}>
        <div style={{backgroundColor: '#f5f2f0', fontWeight: 'bold', padding: '10px 0 0 20px'}}>
          {filename}
        </div>
        <SyntaxHighlighter
          language={language}
          // ファイル名がある場合、表示用の余白を作る
          customStyle={{ margin: 0 }}
          showLineNumbers
          // CSSの擬似要素を使ってファイル名を表示させるため
          filename={filename}
        >
          {code.props.children[0].replace(/\'\'/g, '\'')}
        </SyntaxHighlighter>
      </div>
    );
  },
};
export default function Blogs(blog) {
  const windowX = useSelector(state => state.config.windowSize.x)
  return (
    <section>
      <div className="wrapper">
        <div className="container">
          <div className="content-container flex mb10">
            <div className="w100" css={leftContent}>
              <h2 className="font20 bold mb20">{blog.title}</h2>
              <p className="font14 mb20">{blog.description}</p>
              <Markdown content={blog.content} />
            </div>
            {
              windowX > 1060 &&
              <div css={rightContent}>
                <ProfileCard maxWidth="360px"></ProfileCard>
              </div>
            }
          </div>
          {
            windowX < 1061 &&
            <ProfileCard className="mb20"></ProfileCard>
          }
        </div>
      </div>
    </section>
  )
}

import axios from '../../modules/httpclient'
import { useSelector } from "react-redux";
Blogs.getInitialProps = async ({query}) => {
  const response = await axios.get('/api/blog', {
    params: {
      id: query.id
    }
  })
  return response.data[0];
}

const leftContent = {
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '3px',
  filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,.1))',
  overflow: 'hidden'
}

const rightContent = {
  position: 'fixed',
  // padding: '15px',
  width: '250px',
  minHeight: '150px',
  right: '8rem',
  backgroundColor: 'white',
  borderRadius: '3px',
  filter: 'drop-shadow(0px 0px 3px rgba(0,0,0,.1))'
}

const profile = {
  display: 'block',
  textAlign: 'end',
  padding: '5px'
}