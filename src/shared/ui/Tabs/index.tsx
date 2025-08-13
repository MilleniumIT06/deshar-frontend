import cn from 'classnames';

import styles from './styles.module.scss';

interface TabsProps {
    tabs: { id: number; name: string; }[];
    activeTab: number;
    handleTab: (id: number) => void;
    maxWidth?: boolean;
}
export const Tabs = ({
    tabs,
    activeTab,
    handleTab,
    maxWidth
}: TabsProps) => {
    return (
        <div
            className={cn(styles.tabs, maxWidth && styles.maxWidth)}
            role="tablist"
            aria-label="Навигация по разделам">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={cn(styles.tab, tab.id === activeTab && styles.active)}
                    onClick={() => handleTab(tab.id)}
                    role="tab"
                    aria-selected={tab.id === activeTab}
                    aria-controls={`tabpanel-${tab.id}`}
                    tabIndex={tab.id === activeTab ? -1 : 0}>

                    <span>{tab.name}</span>
                </button>
            ))}
        </div >
    )
}