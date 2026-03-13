import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/lib/auth-options";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

// GET - List all posts (admin gets all, public gets only published)
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    const posts = await prisma.blogPost.findMany({
      where: session ? {} : { published: true },
      include: { author: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Erro ao buscar posts" },
      { status: 500 }
    );
  }
}

// POST - Create new post (requires authentication)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    const { title, slug, excerpt, content, published, coverImage } = await req.json();

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Título, slug e conteúdo são obrigatórios" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return NextResponse.json(
        { error: "Já existe um post com este slug" },
        { status: 400 }
      );
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        content,
        published: published ?? false,
        publishedAt: published ? new Date() : null,
        coverImage: coverImage || null,
        coverImagePublic: !!coverImage,
        authorId: (session.user as any).id,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Erro ao criar post" },
      { status: 500 }
    );
  }
}