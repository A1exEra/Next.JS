import { GetServerSideProps } from 'next';

const UserIdPage = (props: { id: string }) => {
  return (
    <div>
      <h1>{props.id}</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params } = ctx;
  return {
    props: {
      id: `userid-${params!.uid}`,
    },
  };
};

export default UserIdPage;
