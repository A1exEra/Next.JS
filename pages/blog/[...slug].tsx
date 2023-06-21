import { useRouter } from 'next/router';

export const BlogPostsPage = () => {
  const router = useRouter();
  console.log(router.query);
  return (
    <div>
      <h1>The blog Posts</h1>
    </div>
  );
};
export default BlogPostsPage;
