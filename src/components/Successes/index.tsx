"use client";
import cn from 'classnames';
import styles from './styles.module.scss';
import { Button } from '@/shared/ui/Button';
import { useState } from 'react';
export const Successes = () => {
    const [selectorActive, setSelectorActive] = useState(false);
    return (
        <section className={styles.successes}>
            <div className="container">
                <div className={styles.successes__inner}>
                    <div className={styles.successes__header}>
                        <h1 className={styles.successes__title}>
                            Ваши успехи
                        </h1>

                        <div className={cn(styles.selector, selectorActive && styles.active)}>
                            <div className={styles.selector__header}>
                                <span>Неделя</span>
                                <button className={cn("btn-reset", styles.selector__btn)} onClick={() => setSelectorActive(prev => !prev)}>
                                    <svg width="14" height="9" viewBox="0 0 14 9" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13 1L7 7L1 0.999999" stroke="#303030" strokeWidth="1.5" />
                                    </svg>
                                </button>
                            </div>
                            <div className={styles.selector__body}>
                                <ul className={cn("list-reset", styles.selector__list)}>
                                    <li className={styles.selector__list_item}>
                                        <span>Test1</span>
                                    </li>
                                    <li className={styles.selector__list_item}>
                                        <span>Test1</span>
                                    </li>
                                    <li className={styles.selector__list_item}>
                                        <span>Test1</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={styles.successes__body}>
                        <div className={styles.chart}>
                            <div className={styles.chart__header}>
                                <h4 className={styles.chart__title}>
                                    Ежедневная активность
                                </h4>
                                <div className={styles.chart__navigation}>
                                    <Button variant="iconThird" size="iconBig">
                                        <svg width="9" height="14" viewBox="0 0 9 14" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 1L2 7L8 13" stroke="#303030" strokeWidth="1.5" />
                                        </svg>
                                    </Button>
                                    <Button variant="iconThird" size="iconBig">
                                        <svg width="9" height="14" viewBox="0 0 9 14" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 13L7 7L1 1" stroke="#303030" strokeWidth="1.5" />
                                        </svg>
                                    </Button>
                                </div>
                            </div>
                            <div className={styles.chart__body}>
                                <div className={styles.chart__points}>
                                    <ul className={cn("list-reset", styles.chart__points_list)}>
                                        <li className={styles.chart__points_item}>
                                            150 бал
                                        </li>
                                        <li className={styles.chart__points_item}>
                                            100 бал
                                        </li>
                                        <li className={styles.chart__points_item}>
                                            50 бал
                                        </li>
                                    </ul>
                                </div>
                                <div className={styles.chart__lines}>
                                    <div className={styles.chart__line}>
                                        <div className={styles.chart__line_candle}></div>
                                        <span className={styles.chart__line_title}>test</span>
                                    </div>
                                    <div className={styles.chart__line}>
                                        <div className={styles.chart__line_candle}></div>
                                        <span className={styles.chart__line_title}>test</span>
                                    </div>
                                    <div className={styles.chart__line}>
                                        <div className={styles.chart__line_candle}></div>
                                        <span className={styles.chart__line_title}>test</span>
                                    </div>
                                    <div className={styles.chart__line}>
                                        <div className={styles.chart__line_candle}></div>
                                        <span className={styles.chart__line_title}>test</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.successes__footer}>
                        <div className={styles.successes__results}>
                            <div className={styles.resultsCard}>
                                <h6 className={styles.resultsCard__title}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 12.6413L10.6027 15L16 10" stroke="#303030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="12" cy="12" r="8" stroke="#303030" strokeWidth="2" />
                                    </svg>
                                    Баллов набрано
                                </h6>
                                <div className={styles.resultsCard__info}>
                                    <span>182</span>
                                    <div className={styles.resultsCard__percent}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.29289 16.1924C5.90237 16.5829 5.90237 17.2161 6.29289 17.6066C6.68342 17.9971 7.31658 17.9971 7.70711 17.6066L6.29289 16.1924ZM17.8995 6.99998C17.8995 6.4477 17.4518 5.99998 16.8995 5.99998L7.89949 5.99998C7.34721 5.99998 6.89949 6.4477 6.89949 6.99998C6.89949 7.55227 7.34721 7.99998 7.89949 7.99998L15.8995 7.99998L15.8995 16C15.8995 16.5523 16.3472 17 16.8995 17C17.4518 17 17.8995 16.5523 17.8995 16L17.8995 6.99998ZM7.70711 17.6066L17.6066 7.70709L16.1924 6.29287L6.29289 16.1924L7.70711 17.6066Z"
                                                fill="#1BAA7D" />
                                        </svg>
                                        <span>
                                            +25%
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.resultsCard__summary}>
                                    <span className={styles.resultsCard__summary_value}>150</span>
                                    <span className={styles.resultsCard__summary_period}>в прошлые 7 дней</span>
                                </div>
                            </div>
                            <div className={styles.resultsCard}>
                                <h6 className={styles.resultsCard__title}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 12.6413L10.6027 15L16 10" stroke="#303030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="12" cy="12" r="8" stroke="#303030" strokeWidth="2" />
                                    </svg>
                                    Баллов набрано
                                </h6>
                                <div className={styles.resultsCard__info}>
                                    <span>182</span>
                                    <div className={styles.resultsCard__percent}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.29289 16.1924C5.90237 16.5829 5.90237 17.2161 6.29289 17.6066C6.68342 17.9971 7.31658 17.9971 7.70711 17.6066L6.29289 16.1924ZM17.8995 6.99998C17.8995 6.4477 17.4518 5.99998 16.8995 5.99998L7.89949 5.99998C7.34721 5.99998 6.89949 6.4477 6.89949 6.99998C6.89949 7.55227 7.34721 7.99998 7.89949 7.99998L15.8995 7.99998L15.8995 16C15.8995 16.5523 16.3472 17 16.8995 17C17.4518 17 17.8995 16.5523 17.8995 16L17.8995 6.99998ZM7.70711 17.6066L17.6066 7.70709L16.1924 6.29287L6.29289 16.1924L7.70711 17.6066Z"
                                                fill="#1BAA7D" />
                                        </svg>
                                        <span>
                                            +25%
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.resultsCard__summary}>
                                    <span className={styles.resultsCard__summary_value}>150</span>
                                    <span className={styles.resultsCard__summary_period}>в прошлые 7 дней</span>
                                </div>
                            </div>
                            <div className={styles.resultsCard}>
                                <h6 className={styles.resultsCard__title}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 12.6413L10.6027 15L16 10" stroke="#303030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="12" cy="12" r="8" stroke="#303030" strokeWidth="2" />
                                    </svg>
                                    Баллов набрано
                                </h6>
                                <div className={styles.resultsCard__info}>
                                    <span>182</span>
                                    <div className={styles.resultsCard__percent}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.29289 16.1924C5.90237 16.5829 5.90237 17.2161 6.29289 17.6066C6.68342 17.9971 7.31658 17.9971 7.70711 17.6066L6.29289 16.1924ZM17.8995 6.99998C17.8995 6.4477 17.4518 5.99998 16.8995 5.99998L7.89949 5.99998C7.34721 5.99998 6.89949 6.4477 6.89949 6.99998C6.89949 7.55227 7.34721 7.99998 7.89949 7.99998L15.8995 7.99998L15.8995 16C15.8995 16.5523 16.3472 17 16.8995 17C17.4518 17 17.8995 16.5523 17.8995 16L17.8995 6.99998ZM7.70711 17.6066L17.6066 7.70709L16.1924 6.29287L6.29289 16.1924L7.70711 17.6066Z"
                                                fill="#1BAA7D" />
                                        </svg>
                                        <span>
                                            +25%
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.resultsCard__summary}>
                                    <span className={styles.resultsCard__summary_value}>150</span>
                                    <span className={styles.resultsCard__summary_period}>в прошлые 7 дней</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}