import { useTimer } from "react-timer-hook";
import '../building/BuildingDisplay.css';

interface TimerProps {
    expiryTimestamp: Date;
  }
  
 export const Timer: React.FC<TimerProps> = ({ expiryTimestamp }) => {
    const { seconds, minutes, hours, days } = useTimer({ expiryTimestamp, onExpire: () => console.warn('Timer expired') });
  
    return (
      <div>
        <div className='timer'>
          {days > 0 && <span>{days}:</span>}
          {hours > 0 && <span>{hours.toString().padStart(2, '0')}:</span>}
          <span>{minutes.toString().padStart(1, '0')}:</span>
          <span>{seconds.toString().padStart(2, '0')}</span>
        </div>
      </div>
    );
  };
  