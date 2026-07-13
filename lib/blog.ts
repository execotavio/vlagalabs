import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const postsDirectory = path.join(process.cwd(), "content/blog");

export type BlogPost = {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  author: string;
  tags: string[];
  published: boolean;
  seoTitle?: string;
  seoDescription?: string;
  contentHtml: string;
};

type BlogPostMatter = {
  title?: string;
  slug?: string;
  date?: string;
  excerpt?: string;
  coverImage?: string;
  author?: string;
  tags?: string[];
  published?: boolean;
  seoTitle?: string;
  seoDescription?: string;
};

function ensurePostsDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"));
}

function slugFromFileName(fileName: string) {
  return fileName.replace(/\.md$/, "");
}

function normalizePost(fileName: string): BlogPost {
  const fullPath = path.join(postsDirectory, fileName);
  const rawFile = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(rawFile);
  const frontmatter = data as BlogPostMatter;
  const slug = frontmatter.slug || slugFromFileName(fileName);
  const title = frontmatter.title || slug;
  const excerpt = frontmatter.excerpt || "";

  return {
    title,
    slug,
    date: frontmatter.date || new Date(0).toISOString(),
    excerpt,
    coverImage: frontmatter.coverImage,
    author: frontmatter.author || "Vlaga Labs",
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
    published: frontmatter.published !== false,
    seoTitle: frontmatter.seoTitle || title,
    seoDescription: frontmatter.seoDescription || excerpt,
    contentHtml: marked.parse(content, { async: false }) as string,
  };
}

export function getAllPosts({ includeDrafts = false } = {}) {
  return ensurePostsDirectory()
    .map(normalizePost)
    .filter((post) => includeDrafts || post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug) || null;
}

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
