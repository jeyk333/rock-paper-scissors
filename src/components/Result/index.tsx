import { useBettingStore } from 'store';
import { Choices } from 'types';
import { resultTitle } from 'utils';

const Result = () => {
  const { botBet, winAmount, bettingResult } = useBettingStore();
  const { title, className } = resultTitle(botBet as Choices, bettingResult);

  return (
    <div className="grid place-items-center gap-5 uppercase font-semibold">
      <h1 className={`${className} text-3xl md:text-4xl lg:text-5xl`}> {title}</h1>
      <h3 className="text-xl">
        <span className="text-light-brown">You win</span>
        <span className="text-white-shade"> {winAmount} </span>
      </h3>
    </div>
  );
};

export default Result;
