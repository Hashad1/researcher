import '../styles/globals.css';
import dynamic from 'next/dynamic';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyApp = ({ Component, pageProps }) => {
  const DynamicComponent = dynamic(() => import(`../components/${Component.name}`), {
    ssr: false,
  });

  return (
    <>
      <DynamicComponent {...pageProps} />
      <ToastContainer />
    </>
  );
};

export default MyApp;