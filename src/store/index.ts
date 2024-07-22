import { create, StoreApi } from 'zustand';
import { devtools } from 'zustand/middleware';
import { BettingState, InitialState, Actions, Bet } from 'types';
import { initialState } from './initialState';

const createState = (
  set: StoreApi<InitialState & Actions>['setState']
): InitialState & Actions => ({
  ...initialState,
  choiceBet: (bet) => {
    set((state) => ({
      bets: [...state.bets, bet]
    }));
  },
  removeBet: (bets: Bet[]) => {
    set(() => ({
      bets: [...bets]
    }));
  },
  choiceBotBet: (botBet) => {
    set(() => ({
      botBet
    }));
  },
  updateBalance: (type: 'increase' | 'decrease', amount: number) => {
    set((state) => ({
      balance: state.balance + (type === 'increase' ? amount : -amount)
    }));
  },
  setBettingResult: (bettingResult) => {
    set(() => ({
      bettingResult
    }));
  },
  setWinAmount: (winAmount) => {
    set(() => ({
      winAmount
    }));
  },
  toggleBetOutComeVisibility: () => {
    set((state) => ({
      showBetOutCome: !state.showBetOutCome
    }));
  },
  toggleSelectedBetsVisibility: () => {
    set((state) => ({
      showSelectedBets: !state.showSelectedBets
    }));
  },
  setBettingState: (bettingState) => {
    set(() => ({
      bettingState
    }));
  },
  finishBetting: () => {
    set(() => ({
      isBettingFinished: true
    }));
  },
  newBet: () => {
    set(() => ({
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
    }));
  }
});

export const useBettingStore = create(devtools(createState));
