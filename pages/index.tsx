import path from 'path';
import fs from 'fs/promises';
import Link from 'next/link';
interface Product {
  id: string;
  title: string;
  description: string;
}
const Home = (props: { products: Product[] }) => {
  const { products } = props;
  return (
    <>
      <h1>This is the home page of the app</h1>
      <ul>
        {products.map((product: Product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
      <Link href={'/userProfile'}>User Profile Page</Link>
    </>
  );
};
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData: any = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  if (data.products.length === 0) {
    return { redirect: { destination: '/no-data' } };
  }
  if (!data) {
    return { notFound: true };
  }
  return {
    props: {
      products: data.products,
    },
    revalidate: 20,
  };
}
export default Home;
