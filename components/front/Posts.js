import Post from "./Post.js";

export default function Posts({ blogPosts, singerslug, home }) {
  return (
    <ul className="p-0 space-y-4 list-none">
      {blogPosts.map((blogData) => (
        <Post
          singerslug={singerslug}
          key={blogData.slug}
          path={blogData.slug}
          title={blogData.songName}
          description={blogData.description}
          date={blogData.createdAt}
          tags={blogData.tags}
          singername={blogData.singerName}
          songid={blogData._id}
          home={home}
          homesingerslug={blogData.singerSlug}
        />
      ))}
    </ul>
  );
}
