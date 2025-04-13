// app/page.tsx
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeHighlight from 'rehype-highlight';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';
import BlogContent from '../components/BlogContent';

// Define types for front matter with index signature
interface FrontMatter {
  title: string;
  date: string;
  author?: string;
  tags?: string[];
  [key: string]: unknown;
}

// Function to get the post data
async function getPostData() {
  try {
    const postPath = path.join(process.cwd(), 'posts', 'first-post.mdx');
    const source = fs.readFileSync(postPath, 'utf8');
    const { content, data } = matter(source);
    
    try {
      // Use rehype-prism-plus for better code syntax highlighting
      const mdxSource = await serialize(content, {
        scope: data as Record<string, unknown>,
        mdxOptions: {
          remarkPlugins: [
            remarkGfm
          ],
          rehypePlugins: [
            rehypePrism,
            [rehypeHighlight, { 
              ignoreMissing: true,
              detect: true,
              theme: 'github-dark'
            }]
          ],
          format: 'mdx',
          development: process.env.NODE_ENV === 'development'
        },
        parseFrontmatter: true
      });
      
      return {
        mdxSource,
        frontMatter: data as FrontMatter,
        rawContent: null
      };
    } catch (error) {
      console.error("Error serializing MDX:", error);
      const fallbackContent = content.split('\n').map((line, i) => (
        <p key={i}>{line}</p>
      ));
      return {
        mdxSource: null,
        frontMatter: data as FrontMatter,
        rawContent: fallbackContent
      };
    }
  } catch (error) {
    console.error("Error reading post file:", error);
    
    // Provide a default post if file can't be read
    return {
      mdxSource: null,
      frontMatter: {
        title: "Welcome to My Neobrutalist Blog",
        date: new Date().toLocaleDateString(),
        author: "Default Author",
        tags: ["nextjs", "mdx", "neobrutalism"]
      } as FrontMatter,
      rawContent: [(
        <div key="fallback">
          <p>This is a fallback post. The actual content could not be loaded.</p>
          <p>Please check your file system and make sure you have a valid MDX file at 
          `posts/first-post.mdx`</p>
        </div>
      )]
    };
  }
}

export default async function Home() {
  const { mdxSource, frontMatter, rawContent } = await getPostData();
  
  return (
    <BlogContent 
      mdxSource={mdxSource} 
      frontMatter={frontMatter} 
      rawContent={rawContent}
    />
  );
}