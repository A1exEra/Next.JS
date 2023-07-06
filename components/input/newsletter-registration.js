import classes from './newsletter-registration.module.css';
import { useRef } from 'react';
function NewsletterRegistration() {
  const emailRef = useRef();
  const registrationHandler = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
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
