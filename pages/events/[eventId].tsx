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
import Head from 'next/head';
import Comments from '../../components/input/comments';
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
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics event={event} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
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
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    fallback: 'blocking',
  };
};
export default EventDetailPage;
