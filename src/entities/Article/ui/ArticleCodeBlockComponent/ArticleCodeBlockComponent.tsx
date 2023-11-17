import { memo } from 'react';

import { classNames } from '@/shared/libs/classNames/classNames';
import { ToggleFeatures } from '@/shared/libs/features';
import { Code as CodeDeprecated } from '@/shared/ui/deprecated/Code';
import { Code } from '@/shared/ui/redesigned/Code';

import { ArticleCodeBlock } from '../../model/types/article';
import cls from './ArticleCodeBlockComponent.module.scss';

interface ArticleCodeBlockComponentProps {
    className?: string;
    block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo(
    ({ className, block }: ArticleCodeBlockComponentProps) => (
        <div
            className={classNames(cls.ArticleCodeBlockComponent, {}, [
                className,
            ])}
        >
            <ToggleFeatures
                feature="isAppRedesigned"
                off={<CodeDeprecated text={block.code} />}
                on={<Code text={block.code} />}
            />
        </div>
    ),
);
