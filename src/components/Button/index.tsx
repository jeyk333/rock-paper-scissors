import { FC } from 'react';

import { Button as ButtonProps } from 'types';

const Button: FC<ButtonProps> = ({ onClick, isPending, label }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${isPending ? 'opacity-25' : 'opacity-100'} text-light-brown bg-dark-200 border-light-brown w-[10.25rem] h-[4.5rem] border-2 border-solid rounded-full hover:shadow-sm hover:shadow-light-brown transition-all duration-300`}>
      <span className="uppercase text-base md:text-lg lg:text-xl font-semibold">{label}</span>
    </button>
  );
};

export default Button;
