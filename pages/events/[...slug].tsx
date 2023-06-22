import { useRouter } from 'next/router';
import { getFilteredEvents } from '@/dummy-data';
import EventList from '@/components/events/EventList';
import ResultsTitle from '@/components/events/ResultsTitle';
import Button from '@/components/ui/Button';
import ErrorAlert from '@/components/ui/ErrorAlert';
const FilteredEventsPage = () => {
  const router = useRouter();
  const filteredData = router.query.slug;
  console.log(filteredData);
  const year = +filteredData![0];
  const month = +filteredData![1];
  const date = new Date(year, month - 1);
  const filteredevents = getFilteredEvents({ year, month });
  if (!filteredData) {
    return <h2 className="center">Loading...</h2>;
  }
  if (
    isNaN(year) ||
    isNaN(month) ||
    year < 2022 ||
    year > 2023 ||
    month < 1 ||
    month > 12
  ) {
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
export default FilteredEventsPage;
