import { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useBettingStore } from 'store';
import { CHOICE_COLORS, MAX_CHOICE_BET, MESSAGES } from '../../constants';
import { Choices, BettingState, Bet } from 'types';
import BetButton from '../BetButton';
import { getBorderSize } from 'utils';

const Bets = () => {
  const {
    balance,
    bets,
    botBet,
    bettingResult,
    bettingState,
    choiceBet,
    removeBet,
    isBettingFinished,
    updateBalance
  } = useBettingStore();
  const playerChoices: Choices[] = bets.map((bet) => bet.choice);
  const choices = useMemo(
    () =>
      Object.values(Choices).map((choice) => ({
        choice,
        ...CHOICE_COLORS[choice],
        amount: bets
          .filter((bet) => bet.choice === choice)
          .reduce((total: number, bet: Bet) => total + bet.amount, 0),
        showBetAmount: playerChoices.includes(choice),
        borderWidth: getBorderSize(choice, botBet as Choices, bettingResult)
      })),
    [bets, bettingResult, botBet, playerChoices]
  );

  const selectedBetCount: number = bets.length;
  const showLabel: boolean = selectedBetCount === 0;

  const onChoice = useCallback(
    (chosenBet: Bet): void => {
      if (isBettingFinished || bettingState !== BettingState.Started) return;

      const positions = new Set<Choices>(playerChoices);

      if (positions.size >= MAX_CHOICE_BET && !positions.has(chosenBet.choice)) {
        toast.warn(MESSAGES[1]);
        return;
      }

      const hasBalance: boolean = !!balance && balance >= chosenBet.amount;

      if (!hasBalance) {
        toast.warn(MESSAGES[2]);
        return;
      }

      choiceBet(chosenBet);
      updateBalance('decrease', chosenBet.amount);
    },
    [isBettingFinished, bettingState, balance, playerChoices, choiceBet, updateBalance]
  );

  const handleReduceBet = useCallback(
    (chosenBet: Bet): void => {
      const isBetPresent = bets.some((currentBet) => currentBet.choice === chosenBet.choice);
      if (isBetPresent) {
        if (isBettingFinished || bettingState !== BettingState.Started) return;

        const currentBets = [];
        let foundFirst = false;
        for (const bet of bets) {
          if (bet.choice !== chosenBet.choice || foundFirst) {
            currentBets.push(bet);
          } else {
            foundFirst = true;
          }
        }
        removeBet(currentBets);
        updateBalance('increase', chosenBet.amount);
      }
    },
    [isBettingFinished, bettingState, removeBet, updateBalance, bets]
  );

  return (
    <section className="grid place-items-center content-end gap-4">
      <div className="h-6">
        {showLabel ? (
          <p className="h-6 text-light-brown font-semibold text-base">PICK YOUR POSITIONS</p>
        ) : null}
      </div>
      <div className="flex justify-center flex-wrap gap-2 md:gap-3 lg:gap-4">
        {choices.map((choice) => (
          <BetButton
            key={choice.choice}
            {...choice}
            onClick={onChoice}
            onClickReduce={handleReduceBet}
          />
        ))}
      </div>
    </section>
  );
};

export default Bets;
