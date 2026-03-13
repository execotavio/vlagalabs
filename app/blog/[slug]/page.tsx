import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getPayloadClient } from "@/lib/payload";
import { LexicalContent } from "@/components/lexical-content";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: 'posts',
      where: {
        slug: {
          equals: slug,
        },
        status: {
          equals: 'published',
        },
      },
      depth: 2,
      limit: 1,
    });
    return docs[0] || null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: 'posts',
      where: {
        status: {
          equals: 'published',
        },
      },
      limit: 1000,
    });
    return docs.map((post) => ({ slug: post.slug }));
  } catch (error) {
    return [];
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const coverImageUrl = typeof post.coverImage === 'object' && post.coverImage?.url 
    ? post.coverImage.url 
    : null;
  
  const authorName = typeof post.author === 'object' && post.author?.name 
    ? post.author.name 
    : 'Autor';

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-vlaga-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao blog</span>
          </Link>

          {/* Cover Image */}
          {coverImageUrl && (
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 bg-gray-200">
              <Image
                src={coverImageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-vlaga-primary mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>{authorName}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString("pt-BR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "--"}
              </span>
            </div>
          </div>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-gray-700 mb-8 leading-relaxed italic">
              {post.excerpt}
            </p>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none prose-headings:text-vlaga-primary prose-a:text-vlaga-accent hover:prose-a:text-vlaga-primary">
            <LexicalContent content={post.content} />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}