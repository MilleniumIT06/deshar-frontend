import { useState, useEffect, useRef } from 'react';

export function useCountdownTimer(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isExpired, setIsExpired] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Функция очистки таймера
  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    // Сбрасываем состояние при изменении initialSeconds
    setSeconds(initialSeconds);
    setIsExpired(false);
    clearTimer();

    if (initialSeconds <= 0) {
      setIsExpired(true);
      return;
    }

    timerRef.current = setInterval(() => {
      setSeconds(prev => {
        const newSeconds = prev - 1;
        
        if (newSeconds <= 0) {
          clearTimer();
          setIsExpired(true);
          return 0;
        }
        
        return newSeconds;
      });
    }, 1000);

    return clearTimer;
  }, [initialSeconds]); // Зависимость только от initialSeconds

  // Форматирование времени
  const formatTime = () => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return {
    time: isExpired ? '00:00' : formatTime(),
    isExpired,
    secondsLeft: seconds,
    reset: () => {
      setSeconds(initialSeconds);
      setIsExpired(false);
    }
  };
}