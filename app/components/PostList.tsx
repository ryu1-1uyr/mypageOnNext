import { prisma } from "@/lib/prisma";

export default async function PostList() {
  const posts = await prisma.post.findMany({
    where: { published: false },
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });
  console.log(posts, "posts");

  if (posts.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">投稿がまだありません</div>
    );
  }

  // postの型は以下
  // id: string;
  // title: string;
  // slug: string;
  // content: string;
  // published: boolean;
  // createdAt: Date;
  // updatedAt: Date;
  // authorId: string;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">投稿一覧</h2>
      {posts.map((post) => (
        <article
          key={post.id}
          className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-xl font-semibold">{post.title}</h3>
          <p className="text-sm text-gray-500 mt-1">
            by {post.author.email} ·{" "}
            {new Date(post.createdAt).toLocaleDateString("ja-JP")}
          </p>
          <p className="mt-2 text-gray-700 line-clamp-3">{post.content}</p>
        </article>
      ))}
    </div>
  );
}
