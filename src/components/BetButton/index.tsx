import { AnimatePresence, motion } from 'framer-motion';
import { BET_AMOUNT, fadeInUpAnimation } from '../../constants';
import { BetProps } from 'types';

const BetButton = ({
  choice,
  amount,
  showBetAmount,
  textColor,
  backgroundColor,
  borderColor,
  borderWidth,
  onClickReduce,
  onClick
}: BetProps) => {
  return (
    <button
      type="button"
      className={`${backgroundColor} ${borderColor} ${borderWidth} group grid place-items-center content-end gap-2 lg:gap-3 w-5/12 min-h-24 md:w-[10.25rem]  h-32 p-2.5 pb-4 border-solid transition-all duration-300 rounded-md hover:scale-105`}>
      <div className="flex items-center gap-4">
        {' '}
        <span
          onClick={() => onClickReduce({ choice, amount: BET_AMOUNT })}
          className={`text-active-blue border border-active-blue text-xl font-semibold hidden group-hover:block bg-white-shade rounded-full h-6 w-6 !leading-none`}>
          -
        </span>
        <AnimatePresence>
          {showBetAmount && (
            <motion.div {...fadeInUpAnimation}>
              <span
                className={`grid place-items-center rounded-full aspect-square truncate w-12 font-bold text-sm bg-white-shade border-4 border-solid border-active-blue transition-all`}>
                {amount}
              </span>
            </motion.div>
          )}
          {!showBetAmount && (
            <span
              className={`place-items-center group-hover:grid hidden rounded-full aspect-square truncate w-12 font-bold text-sm bg-white-shade border-4 border-solid border-active-blue transition-all`}>
              0
            </span>
          )}
        </AnimatePresence>
        <span
          onClick={() => onClick({ choice, amount: BET_AMOUNT })}
          className={`text-active-blue border-active-blue border hidden group-hover:block font-semibold text-xl  bg-white-shade rounded-full w-6 h-6 !leading-none`}>
          +
        </span>
      </div>
      <div className={`${textColor} uppercase text-2xl font-semibold`}> {choice} </div>
    </button>
  );
};

export default BetButton;
