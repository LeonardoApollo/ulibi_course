import { memo } from 'react';
import { classNames } from 'shared/libs/classNames/classNames';
import { ArticleView } from 'entities/Article/model/types/article';
import ListIcon from 'shared/assets/icons/Articles_List.svg';
import GridIcon from 'shared/assets/icons/Articles_Grid.svg';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { fetchArticlesList } from 'pages/ArticlesPage/model/services/fetchArticlesList';
import { articlesPageSliceActions } from 'pages/ArticlesPage/model/slices/articlePageSlice';
import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView,
    onViewClick?: (view: ArticleView) => void;
}

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
    const dispatch = useAppDispatch();
    const onClick = (newView: ArticleView) => () => {
        if (__PROJECT__ !== 'storybook') {
            if (view !== newView) {
                dispatch(articlesPageSliceActions.setPage(1));
                dispatch(articlesPageSliceActions.setLimit(newView === ArticleView.GRID ? 9 : 4));
                dispatch(fetchArticlesList({ replace: true }));
            }
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
