import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Betting from 'pages/Betting';
import NotFound from 'pages/NotFound';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Betting />} />
        <Route path={'*'} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
