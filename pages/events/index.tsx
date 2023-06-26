import { getAllEvents } from '@/helpers/api-util';
import EventList from '@/components/events/EventList';
import EventsSearch from '@/components/events/EventsSearch';
import { useRouter } from 'next/router';
import { DummyData } from '@/dummy-data';
const AllEventsPage = (props: { events: DummyData[] }) => {
  const router = useRouter();
  const events = props.events;
  const defineEventsHandler = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  return (
    <>
      <EventsSearch onSearch={defineEventsHandler} />
      <EventList events={events} />
    </>
  );
};
export const getStaticProps = async () => {
  const events = await getAllEvents();
  return {
    props: { events: events },
    revalidate: 60,
  };
};
export default AllEventsPage;
