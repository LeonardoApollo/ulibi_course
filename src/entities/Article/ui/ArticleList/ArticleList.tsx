import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleView } from '../../model/consts/consts';
import { Article } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSceleton } from '../ArticleListItem/ArticleListItemSceleton';

import { classNames } from '@/shared/libs/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/Text';

import cls from './ArticleList.module.scss';

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
    target: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) => (
    new Array(view === ArticleView.GRID ? 9 : 3)
        .fill(0)
        .map((item, index) => (
            // eslint-disable-next-line
            <ArticleListItemSceleton key={index} view={view} className={cls.card} />
        ))
);

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        isLoading,
        view = ArticleView.GRID,
        target,
    } = props;
    const { t } = useTranslation('article');

    const renderArticle = (article: Article) => (
        <ArticleListItem
            article={article}
            view={view}
            className={cls.card}
            key={article.id}
            target={target}
        />
    );

    if (!isLoading && !articles.length) {
        return (
            <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                <Text size={TextSize.L} title={t('Статьи не найдены')} />
            </div>
        );
    }

    return (
        <div
            className={classNames(cls.ArticleList, {}, [className, cls[view]])}
            data-testid="ArticlesList"
        >
            {articles.length
                ? articles.map(renderArticle)
                : null}
            {isLoading && getSkeletons(view)}
        </div>
    );
});

// export const ArticleList = memo((props: ArticleListProps) => {
//     const {
//         className,
//         articles,
//         isLoading,
//         view = ArticleView.GRID,
//         target,
//         virtualized = true,
//     } = props;
//     const { t } = useTranslation('article');

//     const isList = view === ArticleView.LIST;
//     const itemsPerRow = isList ? 1 : 4;
//     const rowCount = isList ? articles.length : Math.ceil(articles.length / itemsPerRow);

//     const rowRender = ({
//         index, isScrolling, key, style,
//     }: ListRowProps) => {
//         const items = [];
//         const fromIndex = index * itemsPerRow;
//         const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);

//         for (let i = fromIndex; i < toIndex; i += 1) {
//             items.push(
//                 <ArticleListItem
//                     article={articles[i]}
//                     view={view}
//                     target={target}
//                     key={`str${i}`}
//                     className={cls.card}
//                 />,
//             );
//         }

//         return (
//             <div
//                 key={key}
//                 style={style}
//                 className={cls.row}
//             >
//                 {items}
//             </div>
//         );
//     };

//     if (!isLoading && !articles.length) {
//         return (
//             <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
//                 <Text size={TextSize.L} title={t('Статьи не найдены')} />
//             </div>
//         );
//     }

//     // return (
//     //     <WindowScroller
//     //         onScroll={() => console.log('scroll')}
//     //         scrollElement={document.getElementById(PAGE_ID) as Element}
//     //     >
//     //         {({
//     //             width,
//     //             height,
//     //             registerChild,
//     //             onChildScroll,
//     //             isScrolling,
//     //             scrollTop,
//     //         }) => (
//     //             <div
//     //                 ref={registerChild}
//     //                 className={classNames(cls.ArticleList, {}, [className, cls[view]])}
//     //             >
//     //                 {virtualized
//     //                     ? (
//     //                         <List
//     //                             height={height ?? 700}
//     //                             rowCount={rowCount}
//     //                             rowHeight={isList ? 700 : 330}
//     //                             rowRenderer={rowRender}
//     //                             width={width ? width - 80 : 700}
//     //                             autoHeight
//     //                             onScroll={onChildScroll}
//     //                             isScrolling={isScrolling}
//     //                             scrollTop={scrollTop}
//     //                         />

//     //                     )
//     //                     : (
//     //                         articles.map((item) => (
//     //                             <ArticleListItem
//     //                                 article={item}
//     //                                 view={view}
//     //                                 target={target}
//     //                                 key={item.id}
//     //                                 className={cls.card}
//     //                             />
//     //                         ))
//     //                     )}
//     //                 {isLoading && getSkeletons(view)}
//     //             </div>
//     //         )}
//     //     </WindowScroller>
//     // );
// });
