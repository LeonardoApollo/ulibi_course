import { memo } from 'react';
import { classNames } from 'shared/libs/classNames/classNames';
import { ArticleView } from 'entities/Article/model/types/article';
import ListIcon from 'shared/assets/icons/Articles_List.svg';
import GridIcon from 'shared/assets/icons/Articles_Grid.svg';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { ReducersList } from 'shared/libs/components/DynamicModuleLoader';
import { articlesPageSliceReducer } from 'pages/ArticlesPage/model/slices/articlePageSlice';
import { useStore } from 'react-redux';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { StateShchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView,
    onViewClick?: (view: ArticleView) => void;
}

const reducers: ReducersList = {
    articlesPage: articlesPageSliceReducer,
};

const viewTypes = [
    {
        view: ArticleView.LIST,
        icon: ListIcon,
    },
    {
        view: ArticleView.GRID,
        icon: GridIcon,
    },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { className, view, onViewClick } = props;
    const store = useStore() as ReduxStoreWithManager;
    const onClick = (newView: ArticleView) => () => {
        if (view !== newView) {
            Object.entries(reducers).forEach(([name]) => {
                store.reducerManager.remove(name as StateShchemaKey);
            });
            Object.entries(reducers).forEach(([name, reducer]) => {
                store.reducerManager.add(name as StateShchemaKey, reducer);
            });
        }
        onViewClick?.(newView);
    };

    return (
        <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
            {viewTypes.map((viewType) => (
                <Button
                    key={viewType.view}
                    theme={ThemeButton.CLEAR}
                    onClick={onClick(viewType.view)}
                >
                    <Icon
                        Svg={viewType.icon}
                        className={classNames('', { [cls.notSelected]: viewType.view !== view })}
                    />
                </Button>
            ))}
        </div>
    );
});
