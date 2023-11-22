import { memo } from 'react';

import { ArticleView } from '@/entities/Article';

import GridIcon from '@/shared/assets/icons/Articles_Grid.svg';
import ListIcon from '@/shared/assets/icons/Articles_List.svg';
import GridIconRedesigned from '@/shared/assets/icons/GridIconRedesigned.svg';
import ListIconRedesigned from '@/shared/assets/icons/ListIconRedesigned.svg';
import { classNames } from '@/shared/libs/classNames/classNames';
import { ToggleFeatures, toggleFeatures } from '@/shared/libs/features';
import {
    Button as ButtonDeprecated,
    ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { HStack } from '@/shared/ui/redesigned/Stack';

import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
    {
        view: ArticleView.LIST,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => ListIconRedesigned,
            off: () => ListIcon,
        }),
    },
    {
        view: ArticleView.GRID,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => GridIconRedesigned,
            off: () => GridIcon,
        }),
    },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { className, view, onViewClick } = props;
    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card
                    className={classNames(
                        cls.ArticleViewSelectorRedesigned,
                        {},
                        [className],
                    )}
                    borderRadius="round"
                >
                    <HStack gap="32" className={cls.IconContainer}>
                        {viewTypes.map((viewType) => (
                            <Icon
                                Svg={viewType.icon}
                                key={viewType.view}
                                width={18}
                                height={18}
                                clickable
                                onClick={onClick(viewType.view)}
                                className={classNames(cls.ViewIcon, {
                                    [cls.notSelected]: viewType.view !== view,
                                    [cls.selected]: viewType.view === view,
                                })}
                            />
                        ))}
                        <div className={cls.divider} />
                    </HStack>
                </Card>
            }
            off={
                <div
                    className={classNames(cls.ArticleViewSelector, {}, [
                        className,
                    ])}
                >
                    {viewTypes.map((viewType) => (
                        <ButtonDeprecated
                            key={viewType.view}
                            theme={ThemeButton.CLEAR}
                            onClick={onClick(viewType.view)}
                            data-testid={`ArticlesFilter.view.${viewType.view}`}
                        >
                            <IconDeprecated
                                Svg={viewType.icon}
                                width={24}
                                height={24}
                                className={classNames('', {
                                    [cls.notSelected]: viewType.view !== view,
                                })}
                            />
                        </ButtonDeprecated>
                    ))}
                </div>
            }
        />
    );
});
