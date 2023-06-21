import Link from 'next/link';
export const ClientsPage = () => {
  const clients = [
    { id: 1, name: 'Alex' },
    { id: 2, name: 'Sandro' },
    { id: 3, name: 'God Of Code' },
  ];
  return (
    <div>
      <h1>This is the page for all the clients</h1>
      <code>//this is the example of a normal react link</code>
      <ul>
        {clients.map((el) => (
          <li key={el.id}>
            <Link href={`/clients/${el.name + el.id}`}>{el.name}</Link>
          </li>
        ))}
      </ul>
      <code>//this is the example of a NECT.JS way to render LINKS</code>
      <ul>
        {clients.map((el) => (
          <li key={el.id}>
            <Link
              href={{
                pathname: '/clients/[id]',
                query: { id: el.name + el.id },
              }}>
              {el.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ClientsPage;
