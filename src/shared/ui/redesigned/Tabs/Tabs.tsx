import { ReactNode, memo, useCallback } from 'react';

import { classNames } from '@/shared/libs/classNames/classNames';

import { Card } from '../Card/Card';
import { Flex, FlexDirection, FlexGap } from '../Stack/Flex/Flex';
import cls from './Tabs.module.scss';

export interface TabItem {
    value: string;
    content: ReactNode;
}

export interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabClick: (tab: TabItem) => void;
    'data-testid'?: string;
    direction?: FlexDirection;
    gap?: FlexGap;
}

export const Tabs = memo((props: TabsProps) => {
    const {
        className,
        tabs,
        value,
        onTabClick,
        direction = 'row',
        gap,
    } = props;

    const clickHandle = useCallback(
        (tab: TabItem) => () => {
            onTabClick(tab);
        },
        [onTabClick],
    );

    return (
        <Flex
            direction={direction}
            gap={gap}
            align="start"
            className={classNames(cls.Tabs, {}, [className])}
        >
            {tabs.map((tab) => {
                const isSelected = tab.value === value;
                return (
                    <Card
                        variant={isSelected ? 'light' : 'normal'}
                        className={classNames(cls.tab, {
                            [cls.selected]: isSelected,
                        })}
                        key={tab.value}
                        onClick={clickHandle(tab)}
                        data-testid={`${props['data-testid']}.${tab.value}`}
                        borderRadius="round"
                    >
                        {tab.content}
                    </Card>
                );
            })}
        </Flex>
    );
});
