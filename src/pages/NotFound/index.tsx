import { FC } from 'react';

const NotFound: FC = () => {
  return (
    <div className="min-h-screen flex items-center flex-col justify-center bg-gradient-to-b from-light-grey to-grey">
      <h1 className="text-6xl font-bold text-white-shade">OOPS!</h1>
      <h3 className="text-2xl font-bold text-white-shade">404: Page not found</h3>
    </div>
  );
};

export default NotFound;
