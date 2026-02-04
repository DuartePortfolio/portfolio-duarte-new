import React, { useEffect, useState } from 'react';
import './CrtShutdownOverlay.css';

const CrtShutdownOverlay = ({ onComplete }) => {
  const [phase, setPhase] = useState('shutdown'); // 'shutdown', 'black', 'poweron', 'complete'

  useEffect(() => {
    // After shutdown animation (1s), enter black screen phase
    const shutdownTimer = setTimeout(() => {
      setPhase('black');
    }, 1000);

    // After 2s black screen, start power-on animation
    const blackTimer = setTimeout(() => {
      setPhase('poweron');
    }, 3000);

    // After power-on animation (1s), complete and remove overlay
    const poweronTimer = setTimeout(() => {
      setPhase('complete');
      if (onComplete) onComplete();
    }, 4000);

    return () => {
      clearTimeout(shutdownTimer);
      clearTimeout(blackTimer);
      clearTimeout(poweronTimer);
    };
  }, [onComplete]);

  if (phase === 'complete') return null;

  return (
    <div className="crt-overlay">
      <div className={`crt-screen ${phase}`}>
        <div className="crt-content"></div>
      </div>
    </div>
  );
};

export default CrtShutdownOverlay;
