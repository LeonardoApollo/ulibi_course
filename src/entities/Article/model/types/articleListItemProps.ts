import { HTMLAttributeAnchorTarget } from 'react';

import { ArticleView } from '../consts/consts';
import { Article } from './article';

export interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
    target: HTMLAttributeAnchorTarget;
}
