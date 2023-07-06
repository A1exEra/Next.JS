import { useState, useEffect, useContext } from 'react';
import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '@/store/notification-context';
function Comments(props) {
  const { eventId } = props;
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [isFetchingComments, setIsFetchingComments] = useState(false);
  const notificationCtx = useContext(NotificationContext);
  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);

      fetch(`/api/comments/${eventId}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setComments(data.comments);
          setIsFetchingComments(false);
        });
    }
  }, [showComments]);
  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  const addCommentHandler = async (commentData) => {
    notificationCtx.showNotification({
      title: 'Sending...',
      message: 'Sending your comment to database...',
      status: 'pending',
    });
    // send data to API
    try {
      const response = await fetch(`/api/comments/${eventId}`, {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        notificationCtx.showNotification({
          title: 'Error',
          message:
            `${response.status} -- ${response.statusText}` ||
            'Error sending to Database...',
          status: 'error',
        });
        return;
      }
      const fetchedData = await response.json();
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
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && (
        <CommentList
          comments={comments.filter((comment) => comment.eventId === eventId)}
        />
      )}
      {showComments && isFetchingComments && <h2>Loading...</h2>}
    </section>
  );
}

export default Comments;
