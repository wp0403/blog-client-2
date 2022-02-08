import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// 设置高亮样式
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';

import darkStyle from './darkStyle';

const RanderMarkdown = (props: any) => {
  return (
    <div className={darkStyle.markdown_body}>
      <ReactMarkdown
        children={props.markdown}
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={coy}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
};

export default RanderMarkdown;
