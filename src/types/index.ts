export enum Choices {
  Rock = 'rock',
  Paper = 'paper',
  Scissors = 'scissors'
}

export enum BettingResultType {
  TIE,
  WIN,
  LOSS
}

export enum BettingState {
  Pending,
  Started,
  Finished
}

export interface InitialState {
  balance: number;
  winAmount: number;
  bets: Bet[];
  botBet: Choices | null;
  bettingResult: BettingResult;
  showBetOutCome: boolean;
  showSelectedBets: boolean;
  bettingState: BettingState;
  isBettingFinished: boolean;
}

export interface Bet {
  choice: Choices;
  amount: number;
}

export interface BettingResult {
  bettingResultType: BettingResultType | null;
  isSinglePosition: boolean;
  tieBet?: Choices | null;
  winnerBet?: Choices | null;
}

export interface BetProps {
  choice: Choices;
  amount: number;
  showBetAmount: boolean;
  textColor: string;
  backgroundColor: string;
  borderColor: string;
  borderWidth: string;
  onClick: (bet: Bet) => void;
  onClickReduce: (bet: Bet) => void;
}

export interface ChoiceColors {
  textColor: string;
  backgroundColor: string;
  borderColor: string;
}

export interface Button {
  isPending?: boolean;
  label: string;
  onClick: () => void;
}

export interface Actions {
  choiceBet: (bet: Bet) => void;
  removeBet: (bet: Bet[]) => void;
  choiceBotBet: (botBet: Choices) => void;
  updateBalance: (type: 'increase' | 'decrease', amount: number) => void;
  setBettingResult: (bettingResult: BettingResult) => void;
  setWinAmount: (winAmount: number) => void;
  toggleBetOutComeVisibility: () => void;
  toggleSelectedBetsVisibility: () => void;
  setBettingState: (bettingState: BettingState) => void;
  finishBetting: () => void;
  newBet: () => void;
}
