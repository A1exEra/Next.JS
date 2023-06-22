import EventItem from './EventItem';
import { DummyData } from '@/dummy-data';
import styles from './EventList.module.scss';
const EventList = (props: { events: DummyData[] }) => {
  const { events } = props;
  return (
    <ul className={styles.list}>
      {events.map((event: DummyData) => (
        <EventItem event={event} key={event.id} />
      ))}
    </ul>
  );
};

export default EventList;
