import {
  getEventById,
  getAllEvents,
  getFeaturedEvents,
} from '@/helpers/api-util';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import Button from '@/components/ui/Button';
import ErrorAlert from '@/components/ui/ErrorAlert';
import { DummyData } from '@/dummy-data';
const EventDetailPage = (props: { event: DummyData }) => {
  const event = props.event;
  if (!event) {
    return (
      <>
        <div className="center">
          <p>Loading...</p>
        </div>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }
  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics event={event} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};
export const getStaticProps = async (ctx: any) => {
  const eventId = ctx.params.eventId;
  const event = await getEventById(eventId);
  return {
    props: { event: event },
    revalidate: 60, //seconds
  };
};
export const getStaticPaths = async () => {
  // const events = await getAllEvents();
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  console.log(paths);
  return {
    paths: paths,
    fallback: 'blocking',
  };
};
export default EventDetailPage;
