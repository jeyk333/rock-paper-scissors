import { WIN_CONDITIONS, CHOICE_COLORS } from '../constants';
import { BettingResult, Choices, BettingResultType, Bet } from 'types';

const determineOutcome = (playerChoices: Choices[], botChoice: Choices): BettingResult => {
  const positions = new Set<Choices>(playerChoices);
  const isSinglePosition = positions.size === 1;

  if (playerChoices.includes(botChoice)) {
    return {
      bettingResultType: isSinglePosition ? BettingResultType.TIE : BettingResultType.LOSS,
      isSinglePosition,
      tieBet: botChoice || null
    };
  }

  const winnerBet: Choices | undefined = playerChoices.find((playerChoice) =>
    WIN_CONDITIONS[playerChoice].includes(botChoice)
  );

  if (winnerBet) {
    return {
      bettingResultType: BettingResultType.WIN,
      isSinglePosition,
      winnerBet
    };
  }

  return {
    bettingResultType: BettingResultType.LOSS,
    isSinglePosition,
    winnerBet: null
  };
};

const calculateReturn = (
  bets: Bet[],
  bettingResultType: BettingResultType,
  isSinglePosition: boolean,
  winnerBet: string
): number => {
  const winAmount: number = 0;

  const winnerBets: Bet[] = bets.filter((bet: Bet) => {
    return bet.choice === winnerBet;
  });

  const totalBetAmount: number = winnerBets.reduce(
    (total: number, bet: Bet) => total + bet.amount,
    0
  );
  const singleBetRate: number = 14;
  const twoBetRate: number = 3;
  const multiplier: number = isSinglePosition ? singleBetRate : twoBetRate;

  if (bettingResultType === BettingResultType.WIN) {
    return totalBetAmount * multiplier;
  } else if (bettingResultType === BettingResultType.TIE && isSinglePosition) {
    return totalBetAmount;
  }

  return winAmount;
};

const resultTitle = (
  botChoice: Choices,
  { bettingResultType, tieBet, isSinglePosition, winnerBet }: BettingResult
): {
  className: string;
  title: string;
} => {
  switch (bettingResultType) {
    case BettingResultType.TIE: {
      return {
        className: 'text-white-shade',
        title: `Tie with ${tieBet}`
      };
    }
    case BettingResultType.WIN: {
      return {
        title: `${winnerBet} won`,
        className: CHOICE_COLORS[winnerBet as keyof typeof CHOICE_COLORS].textColor
      };
    }
    case BettingResultType.LOSS: {
      return {
        title: isSinglePosition ? `${botChoice} won` : 'Loss',
        className: isSinglePosition ? CHOICE_COLORS[botChoice].textColor : 'text-white-shade'
      };
    }
    default:
      return {
        title: '',
        className: ''
      };
  }
};

const getBorderSize = (
  selectedChoice: Choices,
  botChoice: Choices,
  { bettingResultType, tieBet, isSinglePosition, winnerBet }: BettingResult
): string => {
  switch (bettingResultType) {
    case BettingResultType.TIE: {
      return 'border-2';
    }
    case BettingResultType.WIN: {
      return selectedChoice === winnerBet ? 'border-4' : 'border-2';
    }
    case BettingResultType.LOSS: {
      if (selectedChoice === botChoice && isSinglePosition) {
        return 'border-4';
      }
      return tieBet ? 'border-2' : selectedChoice === botChoice ? 'border-4' : 'border-2';
    }
    default:
      return 'border-2';
  }
};

export { calculateReturn, determineOutcome, resultTitle, getBorderSize };
