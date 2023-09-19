import { memo } from 'react';

import { ArticleCodeBlock } from '../../model/types/article';

import { classNames } from '@/shared/libs/classNames/classNames';
import { Code } from '@/shared/ui/Code';

import cls from './ArticleCodeBlockComponent.module.scss';

interface ArticleCodeBlockComponentProps {
    className?: string;
    block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo(({ className, block }: ArticleCodeBlockComponentProps) => (
    <div className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}>
        <Code text={block.code} />
    </div>
));
