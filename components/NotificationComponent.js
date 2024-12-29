
import { toast } from 'react-toastify';
import React from 'react';

const NotificationComponent = ({ message, type }) => {
  React.useEffect(() => {
    if (message) {
      toast(message, { type });
    }
  }, [message, type]);

  return null;
};

export default NotificationComponent;