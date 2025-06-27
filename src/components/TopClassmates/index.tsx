"use client";
import { useState } from 'react';

import { Tabs } from '@/shared/ui/Tabs';

import styles from './styles.module.scss';
import { Table } from './Table';

const testClasmates = [
    { id: 1, type: "classmates", class: '7 "Б"', name: "Дзауров Ахмед1", doneModules: 18, placeNumber: 1, points: 120, time: "2ч 37м" },
    { id: 2, type: "classmates", class: '7 "Б"', name: "Дзауров Ахмед2", doneModules: 28, placeNumber: 2, points: 120, time: "2ч 37м" },
    { id: 3, type: "classmates", class: '7 "Б"', name: "Дзауров Ахмед3", doneModules: 38, placeNumber: 3, points: 120, time: "2ч 37м" },
    { id: 4, type: "classmates", class: '7 "Б"', name: "Дзауров Ахмед4", doneModules: 48, placeNumber: 4, points: 120, time: "2ч 37м" }
];
const testParralel = [
    { id: 1, type: "parallel", class: '7 "Б"', name: "Дзауров Ахмед1", doneModules: 18, placeNumber: 1, points: 120, time: "2ч 37м" },
    { id: 2, type: "parallel", class: '8 "Б"', name: "Дзауров Ахмед2", doneModules: 28, placeNumber: 2, points: 120, time: "2ч 37м" },
    { id: 3, type: "parallel", class: '9 "Б"', name: "Дзауров Ахмед3", doneModules: 38, placeNumber: 3, points: 120, time: "2ч 37м" },
    { id: 4, type: "parallel", class: '11 "Б"', name: "Дзауров Ахмед4", doneModules: 48, placeNumber: 4, points: 120, time: "2ч 37м" }
]
export const TopClassmates = () => {
    const [activeTab, setActiveTab] = useState(0);
    const tabs = [{ id: 0, name: "Одноклассники" }, { id: 1, name: "Вся параллель" }];
    return (
        <section className={styles.topClassmates}>
            <div className="container">
                <div className={styles.topClassmates__inner}>
                    <h2 className="section__title">Самые активные одноклассники</h2>
                    <Tabs activeTab={activeTab} handleTab={setActiveTab} tabs={tabs} />
                    <Table data={activeTab === 0 ? { id: 1, type: "classmates", students: testClasmates } : { id: 2, type: "parallel", students: testParralel }} />
                </div>
            </div>
        </section >
    )
}