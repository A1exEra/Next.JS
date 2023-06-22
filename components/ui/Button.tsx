import Link from 'next/link';
import styles from './button.module.scss';
const Button = (props: any) => {
  if (props.link) {
    return (
      <Link href={props.link} className={styles.btn}>
        {props.children}
      </Link>
    );
  }
  return (
    <button type="submit" className={styles.btn}>
      {props.children}
    </button>
  );
};

export default Button;
