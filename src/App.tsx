import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FC } from 'react';

import Router from 'router';

const App: FC = () => {
  return (
    <>
      <Router />
      <ToastContainer />
    </>
  );
};

export default App;
