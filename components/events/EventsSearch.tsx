import Button from '../ui/Button';
import styles from './EventsSearch.module.scss';
import { useRef } from 'react';
const EventsSearch = (props: any) => {
  const yearRef = useRef<HTMLSelectElement>(null);
  const monthRef = useRef<HTMLSelectElement>(null);
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const selectedYear = yearRef.current!.value;
    const selectedMonth = monthRef.current!.value;
    props.onSearch(selectedYear, selectedMonth);
  };
  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <label htmlFor="year">Year</label>
          <select name="year" id="year" ref={yearRef}>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
        </div>
        <div className={styles.control}>
          <label htmlFor="month">Month</label>
          <select name="month" id="month" ref={monthRef}>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
      </div>
      <Button>Find events</Button>
    </form>
  );
};

export default EventsSearch;
