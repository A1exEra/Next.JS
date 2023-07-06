import { useState, createContext, useEffect } from 'react';
const NotificationContext = createContext({
  notification: null, //{title,message,status}
  showNotification: function (notificationData) {},
  hideNotification: function () {},
});

export const NotificationContextProvider = (props) => {
  const [activeNotification, setNotification] = useState(null);
  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === 'success' ||
        activeNotification.status === 'error')
    ) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);
  const showNotification = (notificationData) => {
    setNotification(notificationData);
  };
  const hideNotification = () => {
    setNotification(null);
  };
  const context = {
    notification: activeNotification,
    showNotification: showNotification,
    hideNotification: hideNotification,
  };
  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
};
export default NotificationContext;
