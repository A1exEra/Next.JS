import { useRouter } from 'next/router';
import { getEventById } from '@/dummy-data';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import Button from '@/components/ui/Button';
import ErrorAlert from '@/components/ui/ErrorAlert';
const EventDetailPage = () => {
  const router = useRouter();
  console.log(router.query.eventId);
  const eventId = router.query.eventId as string;
  const event = getEventById(eventId);
  //   console.log(event);
  if (!event) {
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
export default EventDetailPage;
