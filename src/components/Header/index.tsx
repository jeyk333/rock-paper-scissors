import { useBettingStore } from 'store';
import { Bet } from 'types';

const Header = () => {
  const { winAmount, balance, bets } = useBettingStore();
  const totalBetAmount: number = bets.reduce((total: number, bet: Bet) => total + bet.amount, 0);

  return (
    <header className="flex justify-center h-8 bg-dark-100">
      <div className="flex items-center gap-10 text-sm lg:text-base">
        <p className="font-medium">
          <span className="text-light-brown uppercase">BALANCE:</span>
          <span className="text-white-shade"> {balance} </span>
        </p>
        <p className="font-medium">
          <span className="text-light-brown uppercase">BET:</span>
          <span className="text-white-shade"> {totalBetAmount} </span>
        </p>
        <p className="font-medium">
          <span className="text-light-brown uppercase">WIN:</span>
          <span className="text-white-shade"> {winAmount} </span>
        </p>
      </div>
    </header>
  );
};

export default Header;
