/** @jsxImportSource @emotion/react */

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import rehypeRaw from "rehype-raw";
import ProfileCard from '../components/ProfileCard';

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
export default function Blogs(article) {
  const windowX = useSelector(state => state.config.windowSize.x)
  return (
    <section>
      <div className="wrapper">
        <div className="container">
          <div className="content-container flex">
            <div className="w100" css={leftContent}>
              <h2 className="font20 bold mb20">{article.title}</h2>
              <p className="font14 mb20">{article.description}</p>
                <ReactMarkdown
                  components={markdownComponents}
                  rehypePlugins={[rehypeRaw]}
                >
                  {article.content}
                </ReactMarkdown>
            </div>
            {
              windowX > 768 &&
              <div css={rightContent}>
                <ProfileCard maxWidth="360px"></ProfileCard>
              </div>
            }
          </div>
          {
            windowX < 769 &&
            <ProfileCard></ProfileCard>
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