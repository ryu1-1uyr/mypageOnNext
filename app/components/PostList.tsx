import { prisma } from "@/lib/prisma";
import PostListView from "@/app/components/PostListView";
import PostsHydrator from "@/app/components/PostsHydrator";

const isDev = process.env.NODE_ENV === "development";

// こいつはコンポーネントである必要はなさそう。使う箇所に移植してこいつは消す
export default async function PostList() {
  const posts = await prisma.post.findMany({
    where: isDev ? undefined : { published: true },
    orderBy: { createdAt: "desc" },
    include: { author: true },
  });

  const items = posts.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    authorEmail: post.author.email,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    content: post.content,
  }));

  return (
    <>
      {/* サーバーで取得した posts を Client 側の Context に流し込む */}
      <PostsHydrator posts={items} />
      <PostListView posts={items} />
    </>
  );
}
