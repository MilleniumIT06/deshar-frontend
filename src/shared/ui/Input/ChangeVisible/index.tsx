"use client";
import styles from './style.module.scss';
export const ChangeVisible = ({ value, onChange }: { value?: boolean; onChange?: any }) => {

    return (
        <div className={styles.index} onClick={onChange}>
            {value === true ? <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12.5C20 16.5 16.4444 19.5 12 19.5C7.55556 19.5 4 16.5 2 12.5C4 8.5 7.55556 5.5 12 5.5C16.4444 5.5 20 8.5 22 12.5Z" stroke="#7D7979" strokeWidth="2" />
                <circle cx="12" cy="12.5" r="3" stroke="#7D7979" strokeWidth="2" />
            </svg> : <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.5 17.7931C15.8976 18.8663 14.0427 19.5 12 19.5C7.55556 19.5 4 16.5 2 12.5C3.10926 10.2815 4.69704 8.37056 6.6496 7.10849M9.5 5.8291C10.296 5.61468 11.131 5.5 12 5.5C16.4444 5.5 20 8.5 22 12.5C21.3987 13.7026 20.6568 14.8148 19.7924 15.7823" stroke="#7D7979" strokeWidth="2" />
                <path d="M14.1213 14.6213C12.9497 15.7929 11.0502 15.7929 9.87866 14.6213C8.70709 13.4497 8.70709 11.5502 9.87866 10.3787" stroke="#7D7979" strokeWidth="2" />
                <path d="M4 4.5L20 20.5" stroke="#7D7979" strokeWidth="2" strokeLinecap="round" />
            </svg>}
        </div>
    )
}