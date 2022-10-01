/** @jsxImportSource @emotion/react */

import ReactMarkdown from "react-markdown";
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
      <div style={{margin: '0'}}>
      {
        filename &&
        <div style={{backgroundColor: '#f5f2f0', fontWeight: 'bold', display: 'flex'}}>
          <div style={{backgroundColor: '#e0e0e0', padding: '2px 10px'}}>{filename}</div>
        </div>
      }
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
export default function Markdown({content}) {
  return (
    <div id="markdown">
      <ReactMarkdown
      components={markdownComponents}
      rehypePlugins={[rehypeRaw]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
