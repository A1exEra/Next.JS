import NotificationContext from '@/store/notification-context';
import classes from './newsletter-registration.module.css';
import { useRef, useContext } from 'react';
function NewsletterRegistration() {
  const emailRef = useRef();
  const notificationCtx = useContext(NotificationContext);
  const registrationHandler = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    notificationCtx.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter.',
      status: 'pending',
    });
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        console.log(response);
        notificationCtx.showNotification({
          title: 'Error',
          message:
            `${response.status} -- ${response.statusText}` ||
            'Error sending to Database...',
          status: 'error',
        });
        return;
      }
      const data = await response.json();
      notificationCtx.showNotification({
        title: 'Signing up...',
        message: 'successfully registered for newsletter.',
        status: 'success',
      });
    } catch (error) {
      notificationCtx.showNotification({
        title: 'Error!',
        message: error.message || 'something went wrong...',
        status: 'error',
      });
    }
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailRef}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
