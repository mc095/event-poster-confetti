// components/BlogContent.tsx
'use client';
import React, { useState } from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { mdxComponents } from './MDXComponents';

interface BlogContentProps {
  mdxSource: MDXRemoteSerializeResult | null;
  frontMatter: {
    title: string;
    date: string;
    author?: string;
    tags?: string[];
  };
  rawContent: React.ReactNode[] | null;
}

export default function BlogContent({ mdxSource, frontMatter, rawContent }: BlogContentProps) {
  const [isClient, setIsClient] = useState(false);
  
  // Use useEffect to update isClient after mount
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dotted background - using CSS pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}></div>
      
      {/* Neobrutalist elements - colorful geometric shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-lg transform rotate-12 opacity-70 z-0"></div>
      <div className="absolute bottom-40 right-10 w-40 h-40 bg-pink-400 rounded-full opacity-50 z-0"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-blue-400 transform -rotate-6 opacity-60 z-0"></div>
      <div className="absolute top-40 right-32 w-36 h-20 bg-green-400 transform rotate-45 opacity-40 z-0"></div>

      {/* Large Icon with better positioning */}
      <div className="absolute top-6 right-6 md:top-12 md:right-12 z-10">
        <span className="text-6xl md:text-8xl block transform -rotate-6">📓</span>
      </div>

      {/* Main Content with increased width */}
      <main className="relative z-10 mx-auto max-w-[90rem] p-6 md:p-10 pt-20 min-h-[calc(100vh-120px)]">
        {/* Title with neobrutalist styling */}
        <div className="mb-10 text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-4 px-6 py-4 inline-block bg-white border-6 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">
            {frontMatter.title}
          </h1>
          
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <p className="text-xl md:text-2xl font-bold px-4 py-2 bg-white border-4 border-black inline-block transform rotate-1">
              {frontMatter.date}
            </p>
            
            {frontMatter.author && (
              <p className="text-xl md:text-2xl font-bold px-4 py-2 bg-white border-4 border-black inline-block transform -rotate-1">
                By {frontMatter.author}
              </p>
            )}
          </div>
          
          {frontMatter.tags && (
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {frontMatter.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 text-sm font-bold bg-black text-white rounded-full transform hover:scale-105 transition-transform"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* MDX Content with increased width and adjusted padding */}
        <article className="prose prose-lg md:prose-xl lg:prose-2xl mx-auto w-full max-w-[80rem] p-8 md:p-12 bg-white border-6 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-auto">
          {isClient && mdxSource ? (
            <MDXRemote {...mdxSource} components={mdxComponents} />
          ) : (
            <div className="mdx-fallback">
              {rawContent || (
                <div className="animate-pulse space-y-4">
                  <div className="h-6 w-3/4 rounded bg-gray-300"></div>
                  <div className="h-6 w-full rounded bg-gray-300"></div>
                  <div className="h-6 w-5/6 rounded bg-gray-300"></div>
                  <div className="h-6 w-4/6 rounded bg-gray-300"></div>
                </div>
              )}
            </div>
          )}
        </article>
      </main>

      {/* Footer stuck to the bottom with proper distance and reduced size */}
      <footer className="w-full bg-gray-800 text-white text-center text-base md:text-lg font-bold p-6 mt-20">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} GDG Solutions Blog - Follow me on Github - <a href="https://github.com/mc095" className="text-yellow-400 transition-colors">mc095</a></p>
          <div className="flex space-x-4 mt-4 md:mt-0">
          </div>
        </div>
      </footer>
    </div>
  );
}