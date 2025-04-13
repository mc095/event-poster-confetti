'use client';

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CheckIcon, ClipboardIcon } from 'lucide-react';

interface CodeBlockProps {
  children: string | React.ReactNode;
  className?: string;
  filename?: string;
}

const CodeBlock = ({ children, className, filename }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  // Extract language from className
  const languageMatch = className?.match(/language-(\w+)/);
  const language = languageMatch ? languageMatch[1] : 'text';

  // Ensure children is converted to a string
  const codeString = typeof children === 'string'
    ? children
    : React.Children.toArray(children)
        .map((child) => (typeof child === 'string' ? child : ''))
        .join('');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="my-6 group relative">
      {/* Code block container with neobrutalist styling */}
      <div className="overflow-hidden rounded-lg border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        {/* Header with language */}
        <div className="flex items-center justify-between bg-black px-4 py-2 text-white">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-semibold">
              {filename || (language && language !== 'text' ? language.toUpperCase() : 'CODE')}
            </span>
            {filename && language && language !== 'text' && (
              <span className="rounded bg-gray-700 px-2 py-1 text-xs font-medium">
                {language}
              </span>
            )}
          </div>
        </div>

        {/* Code content with horizontal scroll */}
        <div className="relative max-h-[600px] overflow-auto">
          {/* Copy button - Absolute positioned in the top right */}
          <button
            onClick={copyToClipboard}
            className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-md bg-gray-800/80 px-3 py-2 text-xs font-medium text-white opacity-0 backdrop-blur transition-all hover:bg-gray-700 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label={copied ? 'Copied!' : 'Copy code'}
          >
            {copied ? (
              <>
                <CheckIcon size={14} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <ClipboardIcon size={14} />
                <span>Copy</span>
              </>
            )}
          </button>

          <SyntaxHighlighter
            language={language}
            style={tomorrow}
            customStyle={{ 
              margin: 0, 
              padding: '1.25rem',
              borderRadius: 0,
              backgroundColor: '#1e1e1e',
              fontSize: '0.9rem',
              fontFamily: "'JetBrains Mono', monospace"
            }}
            codeTagProps={{ 
              style: { 
                fontFamily: "'JetBrains Mono', monospace",
                lineHeight: '1.5'
              } 
            }}
            showLineNumbers={true}
            lineNumberStyle={{ 
              minWidth: '2.5em', 
              paddingRight: '1em', 
              textAlign: 'right', 
              userSelect: 'none',
              color: '#6e6e6e',
              borderRight: '1px solid #404040',
              marginRight: '1em'
            }}
            wrapLongLines={false}
          >
            {codeString.trim()}
          </SyntaxHighlighter>
        </div>
      </div>

      {/* Scroll indicators */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
};

export default CodeBlock;