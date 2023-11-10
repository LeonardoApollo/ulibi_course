import { memo } from 'react';

import { classNames } from '@/shared/libs/classNames/classNames';
import { ToggleFeatures } from '@/shared/libs/features';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';

import { ArticleTextBlock } from '../../model/types/article';
import cls from './ArticleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
    className?: string;
    block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(
    ({ className, block }: ArticleTextBlockComponentProps) => (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <div
                    className={classNames(cls.ArticleTextBlockComponent, {}, [
                        className,
                    ])}
                >
                    {block.title && (
                        <Text title={block.title} className={cls.title} />
                    )}
                    {block.paragraphs.map((paragraph) => (
                        <Text
                            key={`${paragraph}`}
                            text={paragraph}
                            className={cls.paragraph}
                        />
                    ))}
                </div>
            }
            off={
                <div
                    className={classNames(cls.ArticleTextBlockComponent, {}, [
                        className,
                    ])}
                >
                    {block.title && (
                        <TextDeprecated
                            title={block.title}
                            className={cls.title}
                        />
                    )}
                    {block.paragraphs.map((paragraph) => (
                        <TextDeprecated
                            key={`${paragraph}`}
                            text={paragraph}
                            className={cls.paragraph}
                        />
                    ))}
                </div>
            }
        />
    ),
);
