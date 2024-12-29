import NotificationComponent from '../components/NotificationComponent';
import EmbedCodeComponent from '../components/EmbedCodeComponent';
import * as React from 'react';

const SomePage = () => {
  const [message, setMessage] = React.useState('');

  const handleClick = () => {
    setMessage('This is a notification message!');
  };

  return (
    <div>
      <button onClick={handleClick}>Show Notification</button>
      <NotificationComponent message={message} type="success" />
      <EmbedCodeComponent embedUrl="https://www.example.com/embed" />
    </div>
  );
};

export default SomePage;