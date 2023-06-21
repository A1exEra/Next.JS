import React from 'react';
import { DummyData } from '@/dummy-data';
import Link from 'next/link';
interface EventItemProps {
  event: DummyData;
}
const EventItem = (props: { event: DummyData }) => {
  const { title, image, date, location, id } = props.event;
  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formattedaddress = location.replace(',', '\n');
  const exploreLink = `/event/${id}`;
  return (
    <li>
      <img src={image} alt="image" />
      <div>
        <div>
          <h2>{title}</h2>
          <div>
            <time>{humanReadableDate}</time>
          </div>
          <div>
            <address>{formattedaddress}</address>
          </div>
        </div>
        <div>
          <Link href={exploreLink}>Explore Event</Link>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
