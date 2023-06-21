import { useRouter } from 'next/router';

export const ClinetsProjects = () => {
  const router = useRouter();
  const loadProjectHandler = () => {
    console.log('loading...');
    //do something
    // router.push(`/clients/${router.query.id}/projecta`);
    router.push({
      pathname: '/clients/[id]/[clientprojectid]',
      query: {
        id: router.query.id,
        clientprojectid: 'projecta',
      },
    });
  };
  console.log(router.query);
  return (
    <div>
      <h1>Projects of a given client...</h1>
      <h3>{router.query.id}</h3>
      <button onClick={loadProjectHandler}>
        Load Project {router.query.id}
      </button>
    </div>
  );
};
export default ClinetsProjects;
