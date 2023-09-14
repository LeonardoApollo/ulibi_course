import { memo } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import { Code } from '@/shared/ui/Code/Code';
import cls from './ArticleCodeBlockComponent.module.scss';
import { ArticleCodeBlock } from '../../model/types/article';

interface ArticleCodeBlockComponentProps {
    className?: string;
    block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo(({ className, block }: ArticleCodeBlockComponentProps) => (
    <div className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}>
        <Code text={block.code} />
    </div>
));
