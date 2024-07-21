import { InitialState, BettingState } from 'types';

export const initialState: InitialState = {
  balance: 5000,
  winAmount: 0,
  bets: [],
  botBet: null,
  bettingResult: {
    bettingResultType: null,
    isSinglePosition: false,
    tieBet: null,
    winnerBet: null
  },
  showBetOutCome: false,
  showSelectedBets: true,
  bettingState: BettingState.Started,
  isBettingFinished: false
};
