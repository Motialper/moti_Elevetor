import React from 'react';
import { useTimer } from 'react-timer-hook';

interface TimerProps {
  expiryTimestamp: Date;
}

const TimerDisplay: React.FC<TimerProps> = ({ expiryTimestamp }) => {
  // Destructure timer values and set up expiry handler
  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      console.warn('Timer expired');
      // You can add additional actions here if needed
    }
  });

  return (
    <div className="timer">
      {hours > 0 && <span>{hours.toString().padStart(2, '0')}:</span>}
      <span>{minutes.toString().padStart(2, '0')}:</span>
      <span>{seconds.toString().padStart(2, '0')}</span>
    </div>
  );
};

export default TimerDisplay;
