import { useMemo } from 'react';

import cn from 'classnames';

import styles from './styles.module.scss';

interface ProgressBarProps {
  counter?: boolean;
  maxLessons: number;
  doneLessons: number;
  processLessons: number;
  showPercentage?: boolean;
  ariaLabel?: string;
  className?:string;
}

export const ProgressBar = ({
  maxLessons = 12,
  doneLessons = 4,
  processLessons = 2,
  counter = false,
  showPercentage = false,
  ariaLabel = "Прогресс прохождения уроков",
  className
}: ProgressBarProps) => {
  const validatedValues = useMemo(() => {
    const max = Math.max(1, maxLessons);
    const done = Math.max(0, Math.min(doneLessons, max));
    const process = Math.max(0, Math.min(processLessons, max - done));
    
    return {
      maxLessons: max,
      doneLessons: done,
      processLessons: process
    };
  }, [maxLessons, doneLessons, processLessons]);

  const { maxLessons: max, doneLessons: done, processLessons: process } = validatedValues;


  const percentDone = Math.floor((done / max) * 100);
  const percentProcess = Math.floor(((done + process) / max) * 100);

 
  const formatPercentage = (value: number) => `${value}%`;

  return (
    <div 
      className={cn(styles.ProgressBar,className)}
      role="progressbar"
      aria-valuenow={done}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaLabel}
    >
      {counter && (
        <div className={styles.ProgressBar__info}>
          <span className={styles.ProgressBar__done_count}>{done}</span>
          /
          <span className={styles.ProgressBar__max_count}>{max}</span>
          
          {showPercentage && (
            <span className={styles.ProgressBar__percentage}>
              {formatPercentage(percentDone)}
            </span>
          )}
        </div>
      )}
      
      <div className={styles.ProgressBar__line}>
        <div 
          className={styles.ProgressBar__done} 
          style={{ width: `${percentDone}%` }}
          aria-hidden="true"
        />
        <div 
          className={styles.ProgressBar__process} 
          style={{ width: `${percentProcess}%` }}
          aria-hidden="true"
        />
      </div>
      
      {!counter && showPercentage && (
        <div className={styles.ProgressBar__info_bottom}>
          <span>{formatPercentage(percentDone)} завершено</span>
        </div>
      )}
    </div>
  );
};