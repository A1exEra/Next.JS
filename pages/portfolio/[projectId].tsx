import { useRouter } from 'next/router';

export const PortfolioProjectPage = () => {
  const router = useRouter();
  console.log(router.pathname);
  router.query.projectId = 'alex';
  console.log(router.query);
  return <div>The Portfolio Project Page</div>;
};
export default PortfolioProjectPage;
