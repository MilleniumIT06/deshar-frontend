import cn from 'classnames';

import styles from './styles.module.scss';

interface TabsProps {
    tabs: { id: number; name: string; }[];
    activeTab: number;
    handleTab: (id: number) => void;
}
export const Tabs = ({
    tabs,
    activeTab,
    handleTab
}: TabsProps) => {
    return (
        <div className={styles.tabs}>
            {tabs.map((tab) => (
                <div key={tab.id} className={cn(styles.tab, tab.id === activeTab && styles.active)} onClick={() => handleTab(tab.id)}>
                    <span>{tab.name}</span>
                </div>
            ))}
        </div >
    )
}