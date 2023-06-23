import path from 'path';
import fs from 'fs/promises';
import Link from 'next/link';
interface Product {
  id: string;
  title: string;
  description: string;
}
const ProductDetailPage = (props: { loadedProduct: Product }) => {
  const { loadedProduct } = props;
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
      <Link href="/">Home</Link>
    </>
  );
};
const getData = async () => {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData: any = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
};
export async function getStaticProps(context: { params: any }) {
  const { params } = context;
  const productId = params.pid;
  //   const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  //   const jsonData = await fs.readFile(filePath);
  //   const data = JSON.parse(jsonData);
  const data = await getData();
  const product = data.products.find(
    (product: Product) => product.id === productId
  );
  if (!product) {
    return { notFound: true };
  }
  return {
    props: { loadedProduct: product },
  };
}
export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products
    .map((product: Product) => product.id)
    .map((id: string) => ({ params: { pid: id } }));
  //   return {
  //     paths: [
  //         { params: { pid: 'p1' } },
  //       //   { params: { pid: 'p2' } },
  //       //   { params: { pid: 'p3' } },
  //     ],
  //     // fallback: true,
  //     fallback: 'blocking',
  //   };
  return {
    paths: ids,
    fallback: true,
  };
}
export default ProductDetailPage;
