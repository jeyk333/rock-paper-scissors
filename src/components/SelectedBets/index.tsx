import { useBettingStore } from '../../store';
import { useEffect } from 'react';
import { determineOutcome, calculateReturn } from 'utils';
import { BettingResult, Choices, BettingResultType } from '../../types';

const SelectedBets = () => {
  const { botBet, bets, setBettingResult, setWinAmount } = useBettingStore();
  const positions = new Set<Choices>(bets.map((bet) => bet.choice));
  const playerBet: string = [...positions].join(' & ');

  useEffect(() => {
    const handleCalculateReturn = (
      bettingResultType: BettingResultType,
      isSinglePosition: boolean
    ) => {
      const winAmount: number = calculateReturn(bets, bettingResultType, isSinglePosition);
      setWinAmount(winAmount);
    };

    const handleOutcome = () => {
      const bettingResult: BettingResult = determineOutcome(
        bets.map((bet) => bet.choice),
        botBet as Choices
      );
      setBettingResult(bettingResult);
      handleCalculateReturn(
        bettingResult.bettingResultType as BettingResultType,
        bettingResult.isSinglePosition
      );
    };
    handleOutcome();
  }, [bets, botBet, setBettingResult, setWinAmount]);

  return (
    <div className="flex flex-col md:flex-row gap-1 items-center md:items-end lg:gap-16 font-semibold">
      <h2 className="text-white-shade uppercase text-xl md:text-5xl"> {botBet} </h2>
      <h2 className="text-light-brown text-lg md:text-4xl"> VS </h2>
      <h2 className="text-white-shade uppercase text-xl md:text-5xl"> {playerBet} </h2>
    </div>
  );
};

export default SelectedBets;
