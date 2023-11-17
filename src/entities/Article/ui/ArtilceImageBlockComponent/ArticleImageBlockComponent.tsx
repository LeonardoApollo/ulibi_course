import { memo } from 'react';

import { classNames } from '@/shared/libs/classNames/classNames';
import { ToggleFeatures } from '@/shared/libs/features';
import { TextAlign, Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';

import { ArticleImageBlock } from '../../model/types/article';
import cls from './ArticleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentProps {
    className?: string;
    block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
    ({ className, block }: ArticleImageBlockComponentProps) => (
        <div
            className={classNames(cls.ArticleImageBlockComponent, {}, [
                className,
            ])}
        >
            <img src={block.src} alt={block.title} className={cls.img} />
            {block.title && (
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={<Text text={block.title} align="center" />}
                    off={
                        <TextDeprecated
                            text={block.title}
                            align={TextAlign.CENTER}
                        />
                    }
                />
            )}
        </div>
    ),
);
