import React from 'react';
import { useCountdown } from '../../hooks/useCountdown';
import { formatCountdown, getUrgencyColor } from '../../utils/countdownUtils';

interface CountdownTimerProps {
  dueDateTime: string;
  compact?: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ dueDateTime, compact = false }) => {
  const countdown = useCountdown(dueDateTime);
  const displayText = formatCountdown(countdown);
  const colorClasses = getUrgencyColor(countdown);

  if (compact) {
    return <span className={`text-sm font-semibold ${colorClasses}`}>{displayText}</span>;
  }

  return (
    <div className={`p-2 rounded ${colorClasses} text-center`}>
      <p className="text-sm font-semibold">{displayText}</p>
    </div>
  );
};
