import { INCREMENT_COUNTER, DECREMENT_COUNTER } from './types';

export const handleIncrement = () => {
  return {
    type: INCREMENT_COUNTER
  };
};

export const handleDecrement = () => {
  return {
    type: DECREMENT_COUNTER
  };
};
