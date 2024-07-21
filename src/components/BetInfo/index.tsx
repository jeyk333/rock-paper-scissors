import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useBettingStore } from '../../store';
import { BettingState } from '../../types';
import { fadeInUpAnimation } from '../../constants';
import SelectedBets from '../SelectedBets';
import Result from '../Result';

const BetInfo = () => {
  const {
    showSelectedBets,
    winAmount,
    toggleSelectedBetsVisibility,
    setBettingState,
    updateBalance
  } = useBettingStore();
  const winAmountRef = useRef<number>(winAmount);

  useEffect(() => {
    winAmountRef.current = winAmount;
  }, [winAmount]);

  useEffect(() => {
    const hideBetChoicesTimeout = setTimeout(() => {
      toggleSelectedBetsVisibility();
      setBettingState(BettingState.Finished);
      updateBalance('increase', winAmountRef.current);
    }, 2000);

    return () => {
      clearTimeout(hideBetChoicesTimeout);
    };
  }, []);

  return (
    <section className="h-24 grid">
      <AnimatePresence mode="wait">
        {showSelectedBets ? (
          <motion.div key="selectedBets" {...fadeInUpAnimation}>
            <SelectedBets />
          </motion.div>
        ) : (
          <motion.div key="betResult" {...fadeInUpAnimation}>
            <Result />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
export default BetInfo;
