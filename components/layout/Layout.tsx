import { useContext, ReactNode } from 'react';
import MainHeader from './MainHeader';
import Notification from '../ui/notification';
import NotificationContext from '@/store/notification-context';
const Layout = (props: { children: React.ReactNode }) => {
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;
  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  );
};

export default Layout;
