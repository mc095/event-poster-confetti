// components/MDXComponents.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CodeBlock from './CodeBlock';
import { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react';

const Heading1 = ({ children }: { children: React.ReactNode }) => (
  <h1 className="mb-8 mt-12 text-4xl font-black">{children}</h1>
);

const Heading2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-6 mt-10 text-3xl font-extrabold">{children}</h2>
);

const Heading3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mb-4 mt-8 text-2xl font-bold">{children}</h3>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-6 text-lg leading-relaxed">{children}</p>
);

const BlockQuote = ({ children }: { children: React.ReactNode }) => (
  <blockquote className="border-l-8 border-black bg-gray-100 p-4 italic">{children}</blockquote>
);

const CustomLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const isExternal = href.startsWith('http');
  return isExternal ? (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="font-bold text-blue-600 underline decoration-2 underline-offset-2 transition-colors hover:text-blue-800"
    >
      {children}
    </a>
  ) : (
    <Link 
      href={href}
      className="font-bold text-blue-600 underline decoration-2 underline-offset-2 transition-colors hover:text-blue-800"
    >
      {children}
    </Link>
  );
};

const UnorderedList = ({ children }: { children: React.ReactNode }) => (
  <ul className="mb-6 ml-6 list-disc space-y-2 text-lg">{children}</ul>
);

const OrderedList = ({ children }: { children: React.ReactNode }) => (
  <ol className="mb-6 ml-6 list-decimal space-y-2 text-lg">{children}</ol>
);

const Table = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-6 overflow-x-auto">
    <table className="w-full border-4 border-black">{children}</table>
  </div>
);

const TableHead = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-gray-200 text-left">{children}</thead>
);

const TableRow = ({ children }: { children: React.ReactNode }) => (
  <tr className="border-b-2 border-gray-300">{children}</tr>
);

const TableCell = ({ children }: { children: React.ReactNode }) => (
  <td className="border-r-2 border-gray-300 p-3 last:border-r-0">{children}</td>
);

const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <th className="border-r-2 border-gray-500 p-3 font-bold last:border-r-0">{children}</th>
);

// Define props interface for code elements
interface CodeElementProps {
  className?: string;
  children: React.ReactNode;
  metastring?: string;
  [key: string]: unknown;
}

// Improved version of the PreBlock component with proper TypeScript typing
const PreBlock = ({
  children,
  ...rest
}: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) => {
  // Check if children is a valid React element
  if (React.isValidElement(children)) {
    // Safely type cast the children to ReactElement
    const childElement = children as ReactElement;
    
    // Check if the child is a <code> element
    if (childElement.type === 'code') {
      // Type assertion for props
      const props = childElement.props as CodeElementProps;
      const { className, children: codeContent } = props;
      
      // Get filename from meta string if available
      const metastring = props.metastring || '';
      const match = metastring.match(/filename="([^"]*)"/);
      const filename = match ? match[1] : undefined;
      
      // Handle both string and array children
      let codeString = '';
      if (typeof codeContent === 'string') {
        codeString = codeContent;
      } else if (Array.isArray(codeContent)) {
        codeString = codeContent.join('');
      } else {
        codeString = String(codeContent || '');
      }
      
      console.log('Rendering code block with:', { className, filename, codeString: codeString.substring(0, 50) });
      
      return (
        <CodeBlock className={className} filename={filename}>
          {codeString}
        </CodeBlock>
      );
    }
  }
  
  // Fallback for non-code pre blocks
  return <pre className="rounded-lg border-2 border-gray-300 bg-gray-100 p-4" {...rest}>{children}</pre>;
};

// Export components map for MDX
export const mdxComponents = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  p: Paragraph,
  a: CustomLink,
  blockquote: BlockQuote,
  ul: UnorderedList,
  ol: OrderedList,
  table: Table,
  thead: TableHead,
  tr: TableRow,
  td: TableCell,
  th: TableHeader,
  pre: PreBlock,
  code: ({ className, children, ...rest }: { className?: string; children: React.ReactNode; [key: string]: unknown }) => {
    // Only use inline code styling for non-language code blocks
    if (className?.startsWith('language-')) {
      return <code className={className} {...rest}>{children}</code>;
    }
    
    return (
      <code className="mx-1 rounded-md bg-gray-200 px-2 py-1 font-mono text-sm" {...rest}>
        {children}
      </code>
    );
  },
  img: ({ src, alt }: { src: string; alt: string }) => (
    <div className="my-8">
      <Image
        src={src}
        alt={alt || ""}
        width={1200}
        height={630}
        className="rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      />
      {alt && <p className="mt-2 text-center text-sm text-gray-600">{alt}</p>}
    </div>
  ),
};

export default mdxComponents;