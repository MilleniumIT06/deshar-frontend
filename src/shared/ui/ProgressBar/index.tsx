import styles from './styles.module.scss';
interface ProgressBarProps 
    {   counter:boolean;
        maxLessons:number;
        doneLessons:number;
        processLessons:number;
    }

export const ProgressBar = ({
    maxLessons=12,
    doneLessons=4,
    processLessons=2,
    counter=false
}:ProgressBarProps) => {
    const percentDone = Math.floor((doneLessons/maxLessons)*100);
    const percentProcess = Math.floor(((doneLessons+processLessons)/maxLessons)*100);
    return (
        <div className={styles.ProgressBar}>
          {  counter&&<div className={styles.ProgressBar__info}>
                <span className={styles.ProgressBar__done_count}>{doneLessons}</span>
                /
                <span className={styles.ProgressBar__max_count}>{maxLessons}</span>
            </div>}
            <div className={styles.ProgressBar__line}>
                <div className={styles.ProgressBar__done} style={{width:`${percentDone}%`}}></div>
                <div className={styles.ProgressBar__process} style={{width:`${percentProcess}%`}}></div>
            </div>
        </div>
    )
}