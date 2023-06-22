import path from 'path';
import fs from 'fs/promises';
interface Product {
  id: string;
  title: string;
  desription: string;
}
const Home = (props: { products: Product[] }) => {
  const { products } = props;
  return (
    <>
      <h1>This is the home page of the app</h1>
      <ul>
        {products.map((product: Product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </>
  );
};
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  console.log(data);
  return {
    props: {
      products: data.products,
    },
  };
}
export default Home;
