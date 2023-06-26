import { useRouter } from 'next/router';
import { getFilteredEvents } from '@/helpers/api-util';
import EventList from '@/components/events/EventList';
import ResultsTitle from '@/components/events/ResultsTitle';
import Button from '@/components/ui/Button';
import ErrorAlert from '@/components/ui/ErrorAlert';
import { DummyData } from '@/dummy-data';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

const URL =
  'https://nextjs-client-side-db43a-default-rtdb.europe-west1.firebasedatabase.app/events.json';
// const FilteredEventsPage = (props: any) => {
//   const router = useRouter();
//   const [events, setEvents] = useState<DummyData[] | null>(null);
//   const filteredData = router.query.slug;
//   const fetcher = (url: string) => fetch(url).then((res) => res.json());
//   const { data, error, isLoading } = useSWR(URL, fetcher);
//   // const { data, error } = useSWR(URL);
//   const year = +filteredData![0];
//   const month = +filteredData![1];
//   const date = new Date(year, month - 1);

//   useEffect((): void => {
//     if (data) {
//       const events: DummyData[] = [];
//       for (const key in data) {
//         events.push({
//           id: key,
//           ...data[key],
//         });
//       }
//       setEvents(events);
//     }
//   }, [data]);
//   if (!events) {
//     return <p className="center">Loading...</p>;
//   }
//   const filteredEvents = events.filter((event) => {
//     const eventDate = new Date(event.date);
//     return (
//       eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
//     );
//   });
//   if (
//     error ||
//     isNaN(year) ||
//     isNaN(month) ||
//     year < 2022 ||
//     year > 2023 ||
//     month < 1 ||
//     month > 12
//   ) {
//     return (
//       <>
//         <ErrorAlert>
//           <p>Invalid values...</p>
//         </ErrorAlert>
//         <div className="center">
//           <Button link="/events">Show All Events</Button>
//         </div>
//       </>
//     );
//   }
//   if (!filteredEvents || filteredEvents.length === 0) {
//     return (
//       <>
//         <ErrorAlert>
//           <p>No events for the chosen filter...</p>
//         </ErrorAlert>
//         <div className="center">
//           <Button link="/events">Show All Events</Button>
//         </div>
//       </>
//     );
//   }
//   return (
//     <>
//       <ResultsTitle date={date} />
//       <EventList events={filteredEvents} />
//     </>
//   );
// };
// export default FilteredEventsPage;

////this is the code for the server-side fetching///////////
const FilteredEventsPage = (props: any) => {
  const { year, month } = props.date;
  const date = new Date(year, month - 1);
  const filteredevents = props.events;
  if (props.hasError) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid values...</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }
  if (!filteredevents || filteredevents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events for the chosen filter...</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }
  return (
    <>
      <ResultsTitle date={date} />
      <EventList events={filteredevents} />
    </>
  );
};

export const getServerSideProps = async (ctx: any) => {
  const { params } = ctx;
  const filteredData = params.slug;
  const year = +filteredData[0];
  const month = +filteredData[1];
  const filteredevents = await getFilteredEvents({ year: year, month: month });
  console.log(filteredevents, year, month);
  if (
    isNaN(year) ||
    isNaN(month) ||
    year < 2022 ||
    year > 2023 ||
    month < 1 ||
    month > 12
  ) {
    return {
      props: { hasError: true },
      // notFound:true
    };
  }
  return {
    props: { events: filteredevents, date: { year: year, month: month } },
  };
};
export default FilteredEventsPage;
