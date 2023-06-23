import { link } from 'fs';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
interface SaleItem {
  id: string;
  user: string;
  amount: string;
}
const URL =
  'https://nextjs-client-side-db43a-default-rtdb.europe-west1.firebasedatabase.app/sales';
const lastSales = (props: { sales: SaleItem[] }) => {
  const [sales, setSales] = useState(props.sales);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`${URL}.json`, fetcher);
  useEffect(() => {
    if (data) {
      setSales(data);
    }
  }, [data]);
  //   console.log(sales);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <div>
      <h2>Sales Data</h2>
      <ul>
        {Object.keys(data).map((key) => {
          const item = data[key];
          return (
            <li key={key}>
              <h3>{item.user}:</h3>
              <p>${item.amount}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
//pre-generate data on the server
export const getStaticProps = async () => {
  //   return fetch(`${URL}.json`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const transformedSales = [];
  //       for (const key in data) {
  //         transformedSales.push({
  //           id: key,
  //           user: data[key].user,
  //           amount: data[key].amount,
  //         });
  //       }
  //       return { props: { sales: transformedSales }, revalidate: 10 };
  //     });
  const response = await fetch(`${URL}.json`);
  const data = await response.json();
  const transformedSales = [];
  for (const key in data) {
    transformedSales.push({
      id: key,
      user: data[key].user,
      amount: data[key].amount,
    });
  }
  console.log(transformedSales);
  return { props: { sales: transformedSales }, revalidate: 10 };
};
export default lastSales;
// import { useEffect, useState } from 'react';
// const URL =
//   'https://nextjs-client-side-db43a-default-rtdb.europe-west1.firebasedatabase.app/sales';
// const lastSales = () => {
//    const [isLoading, setIsLoading] = useState<boolean>(false);
//    const [sales, setSales] = useState<any>(null);
//   useEffect(() => {
//     setIsLoading(true);
//     fetch(`${URL}.json`)
//       .then((response) => response.json())
//       .then((data) => {
//         setSales(data);
//         setIsLoading(false);
//       });
//   }, []);
//   return (
//     <div>
//       <h2>Sales Data</h2>
//       {isLoading ? (
//         <h3>Loading...</h3>
//       ) : sales && Object.keys(sales).length > 0 ? (
//         <ul>
//           {Object.keys(sales).map((key) => {
//             const item = sales[key];
//             return (
//               <li key={key}>
//                 <h3>{item.user}:</h3>
//                 <p>${item.amount}</p>
//               </li>
//             );
//           })}
//         </ul>
//       ) : (
//         <h3>No sales data available.</h3>
//       )}
//     </div>
//   );
// };

// export default lastSales;

// useSWR(<request-url>, (url) => fetch(url).then(res => res.json()))
