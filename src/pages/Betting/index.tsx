import { useCallback, FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'react-toastify';

import { fadeInUpAnimation } from '../../constants';
import Header from 'components/Header';
import Bets from 'components/Bets';
import Button from 'components/Button';
import BetInfo from 'components/BetInfo';
import { useBettingStore } from 'store';
import { Choices, BettingState } from 'types';
import { MESSAGES } from '../../constants';

const Betting: FC = () => {
  //Handling Play and Clear button actions
  const {
    isBettingFinished,
    bets,
    choiceBotBet,
    bettingState,
    setBettingState,
    finishBetting,
    toggleBetOutComeVisibility,
    showBetOutCome,
    newBet
  } = useBettingStore();
  const hasSelectedBet: boolean = bets.length > 0;
  const isBettingPending: boolean = bettingState === BettingState.Pending;
  const buttonLabel: string = isBettingFinished && !isBettingPending ? 'Clear' : 'Play';

  const handleBotBet = () => {
    const choiceCount: number = Object.keys(Choices).length;
    const selectedRandomChoiceIndex: number = Math.floor(Math.random() * choiceCount);
    const botChoice: Choices = Object.values(Choices)[selectedRandomChoiceIndex];
    choiceBotBet(botChoice);
  };

  const handleButtonClick = (): void => {
    if (bettingState === BettingState.Pending) return;

    if (!hasSelectedBet) {
      toast.warn(MESSAGES[0]);
      return;
    }

    setBettingState(BettingState.Pending);
    toggleBetOutComeVisibility();

    if (!isBettingFinished) {
      finishBetting();
      handleBotBet();
    }
  };

  const onExitComplete = useCallback(() => {
    if (!showBetOutCome) {
      newBet();
    }
  }, [showBetOutCome, newBet]);

  return (
    <div className="w-screen h-screen overflow-y-auto bg-gradient-to-b from-light-grey to-grey">
      <Header />
      <section className="my-auto flex flex-col items-center justify-center h-[calc(100%-32px)] gap-24">
        <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
          {showBetOutCome ? (
            <motion.div key="betResult" {...fadeInUpAnimation}>
              <BetInfo />
            </motion.div>
          ) : (
            <motion.div key="betEmptyOutcome" {...fadeInUpAnimation}>
              <div className="h-24" />
            </motion.div>
          )}
        </AnimatePresence>
        <Bets />
        <Button onClick={handleButtonClick} isPending={isBettingPending} label={buttonLabel} />
      </section>
    </div>
  );
};

export default Betting;
