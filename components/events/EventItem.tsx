import styles from './EventItem.module.scss';
import { DummyData } from '@/dummy-data';
import DateIcon from '../icons/date-icon';
import AdderssIcon from '../icons/address-icon';
import arrowRightIcon from '../icons/arrow-right-icon';
import Button from '../ui/Button';
import ArrowRightIcon from '../icons/arrow-right-icon';
import Image from 'next/image';
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
  const exploreLink = `/events/${id}`;
  return (
    <li className={styles.item}>
      <Image src={image} alt="image" width={250} height={160} />
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>
          <div className={styles.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={styles.address}>
            <AdderssIcon />
            <address>{formattedaddress}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={styles.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
