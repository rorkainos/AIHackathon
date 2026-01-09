import { useState, useEffect } from 'react';
import { CountdownTime } from '../types';
import { calculateCountdown } from '../utils/countdownUtils';

export const useCountdown = (dueDateTime: string): CountdownTime => {
  const [countdown, setCountdown] = useState<CountdownTime>(calculateCountdown(dueDateTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(dueDateTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [dueDateTime]);

  return countdown;
};
