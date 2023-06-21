import { useRouter } from 'next/router';

export const SelectedClientProjectPage = () => {
  const router = useRouter();
  console.log(router.query);
  return <div>Selected Client Project Page</div>;
};
export default SelectedClientProjectPage;
