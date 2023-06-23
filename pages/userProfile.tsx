import { GetServerSideProps } from 'next';

const userProfile = (props: { userName: string }) => {
  return (
    <div>
      <h1>User name: {props.userName}</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { params, req, res } = ctx;
  console.log(params);
  return {
    props: { userName: 'Sandro' },
  };
};

export default userProfile;
