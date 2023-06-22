import { getAllEvents } from '@/dummy-data';
import EventList from '@/components/events/EventList';
import EventsSearch from '@/components/events/EventsSearch';
import { useRouter } from 'next/router';
const AllEventsPage = () => {
  const router = useRouter();

  const events = getAllEvents();
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
export default AllEventsPage;
