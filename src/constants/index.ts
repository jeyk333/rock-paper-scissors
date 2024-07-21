import { Variants } from 'framer-motion';

import { Choices, ChoiceColors } from 'types';

const BET_AMOUNT: number = 500;
const MAX_CHOICE_BET: number = 2;

const WIN_CONDITIONS: Record<Choices, Choices[]> = {
  [Choices.Rock]: [Choices.Scissors],
  [Choices.Paper]: [Choices.Rock],
  [Choices.Scissors]: [Choices.Paper]
};

const CHOICE_COLORS: Record<Choices, ChoiceColors> = {
  [Choices.Rock]: {
    textColor: 'text-light-blue',
    backgroundColor: 'bg-blue',
    borderColor: 'border-light-blue'
  },
  [Choices.Paper]: {
    textColor: 'text-light-green',
    backgroundColor: 'bg-green',
    borderColor: 'border-light-green'
  },
  [Choices.Scissors]: {
    textColor: 'text-light-red',
    backgroundColor: 'bg-red',
    borderColor: 'border-light-red'
  }
};

const fadeInUpAnimation: Variants = {
  initial: { opacity: 0, y: -10, transition: { duration: 0.5 } },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: 10, transition: { duration: 0.5 } }
};

const MESSAGES = {
  0: 'Please place at least one bet to start the game.',
  1: 'You can only make 2 bets per game.',
  2: 'Oops! You balance is low to place a bet.'
};

export { BET_AMOUNT, MAX_CHOICE_BET, CHOICE_COLORS, fadeInUpAnimation, WIN_CONDITIONS, MESSAGES };
