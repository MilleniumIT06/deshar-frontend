'use client';
import { useState } from 'react';

import cn from 'classnames';

import { exampleSelectData } from '@/mocks/data';

import { SelectBox } from '../SelectBox';

import styles from './styles.module.scss';

export const SelectAnswerQuizContent = () => {
    const [data, setData] = useState(exampleSelectData);
    const [selected, setSelected] = useState<number[]>([]);
    const onSelect = (id: number) => {
        setSelected(prev => {
            if (prev.includes(id)) {
                return prev.filter(item => item !== id);
            }
            else {
                return [...prev, id];
            }
        });
    }
    const checkSelected = (id: number) => {

        return selected.includes(id) ? true : false
    }
    return (
        <div>
            <ul className={cn('list-reset', styles.list)}>
                {/* <SelectBox title='Скачок, скачка' selected={false} handleSelect={onSelect} />
                <SelectBox title='Сбор, соберу' selected={true} handleSelect={onSelect} />
                <SelectBox title='Дружок, дружочек' selected={false} handleSelect={onSelect} />
                <SelectBox title='Срывать, сорвать' selected={false} handleSelect={onSelect} /> */}
                {data.map((item) => (
                    <SelectBox title={item.content} handleSelect={() => onSelect(item.id)} selected={checkSelected(item.id)} key={item.id} />
                ))}
            </ul>
        </div>
    )
}