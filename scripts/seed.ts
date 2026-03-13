import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const blogPosts = [
  {
    title: "Lorem Ipsum Dolor Sit Amet Consectetur",
    slug: "lorem-ipsum-dolor-sit-amet-consectetur",
    excerpt: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    content: `<h2>Lorem ipsum dolor sit amet</h2>
<p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

<h3>Duis aute irure dolor</h3>
<p>In reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>`,
    coverImage: "https://cdn.abacus.ai/images/06b5694b-7dce-4451-a2f7-d48211a2eeee.jpg",
  },
  {
    title: "Sed Do Eiusmod Tempor Incididunt",
    slug: "sed-do-eiusmod-tempor-incididunt",
    excerpt: "Ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco.",
    content: `<h2>Quis autem vel eum iure reprehenderit</h2>
<p>Qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.</p>

<h3>At vero eos et accusamus</h3>
<p>Et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>

<p>Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.</p>`,
    coverImage: "https://cdn.abacus.ai/images/74797ec0-48a7-4411-a07e-d96dd63917c1.jpg",
  },
  {
    title: "Temporibus Autem Quibusdam Et Aut",
    slug: "temporibus-autem-quibusdam-et-aut",
    excerpt: "Officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint.",
    content: `<h2>Nam libero tempore</h2>
<p>Cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p>

<h3>Temporibus autem quibusdam</h3>
<p>Et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.</p>

<p>Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Hanc ego cum teneam sententiam, quid est cur verear ne ad eam non possim?</p>`,
    coverImage: "https://cdn.abacus.ai/images/9449c234-c696-4b09-880d-efe14f3936fd.jpg",
  },
];

async function main() {
  console.log("Starting seed...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("johndoe123", 10);
  
  const admin = await prisma.user.upsert({
    where: { email: "john@doe.com" },
    update: {},
    create: {
      email: "john@doe.com",
      password: hashedPassword,
      name: "Admin",
    },
  });

  console.log("Admin user created:", admin.email);

  // Create blog posts
  for (const postData of blogPosts) {
    const post = await prisma.blogPost.upsert({
      where: { slug: postData.slug },
      update: {},
      create: {
        ...postData,
        published: true,
        publishedAt: new Date(),
        coverImagePublic: true,
        authorId: admin.id,
      },
    });
    console.log(`Blog post created: ${post.title}`);
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });