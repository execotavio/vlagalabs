import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/lib/auth-options";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET - Get single post
export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const session = await getServerSession(authOptions);

    const post = await prisma.blogPost.findUnique({
      where: { id },
      include: { author: { select: { name: true, email: true } } },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Post não encontrado" },
        { status: 404 }
      );
    }

    // Only allow unpublished posts for authenticated users
    if (!post.published && !session?.user) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Erro ao buscar post" },
      { status: 500 }
    );
  }
}

// PUT - Update post (requires authentication)
export async function PUT(req: NextRequest, context: RouteContext) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const { title, slug, excerpt, content, published, coverImage } = await req.json();

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Título, slug e conteúdo são obrigatórios" },
        { status: 400 }
      );
    }

    // Check if slug already exists (excluding current post)
    const existingPost = await prisma.blogPost.findFirst({
      where: {
        slug,
        NOT: { id },
      },
    });

    if (existingPost) {
      return NextResponse.json(
        { error: "Já existe outro post com este slug" },
        { status: 400 }
      );
    }

    const currentPost = await prisma.blogPost.findUnique({
      where: { id },
    });

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        content,
        published: published ?? false,
        publishedAt:
          published && !currentPost?.published ? new Date() : currentPost?.publishedAt,
        coverImage: coverImage || null,
        coverImagePublic: !!coverImage,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar post" },
      { status: 500 }
    );
  }
}

// DELETE - Delete post (requires authentication)
export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    await prisma.blogPost.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Post excluído com sucesso" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Erro ao excluir post" },
      { status: 500 }
    );
  }
}