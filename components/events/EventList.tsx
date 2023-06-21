import EventItem from './EventItem';
import { DummyData } from '@/dummy-data';

const EventList = (props: { events: DummyData[] }) => {
  const { events } = props;
  return (
    <ul>
      {events.map((event: DummyData) => (
        <EventItem event={event} key={event.id} />
      ))}
    </ul>
  );
};

export default EventList;
