import { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleType } from '@/entities/Article';

import { classNames } from '@/shared/libs/classNames/classNames';
import { Button } from '@/shared/ui/redesigned/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import cls from './ArticleEditTags.module.scss';

interface ArticleEditTagsProps {
    className?: string;
    initialTags?: ArticleType[];
    tags: ArticleType[];
    setTags: (tags: ArticleType[]) => void;
}

export const ArticleEditTags = memo((props: ArticleEditTagsProps) => {
    const { t } = useTranslation();
    const { className, initialTags, tags, setTags } = props;

    const onClickHandle = useCallback(
        (e: any) => {
            if (!tags.includes(e.target.id)) {
                setTags([...tags, e.target.id]);
            } else {
                setTags(tags.filter((tag) => tag !== e.target.id));
            }
        },
        [setTags, tags],
    );

    useEffect(() => {
        if (initialTags) {
            setTags([...initialTags]);
        }
    }, [initialTags, setTags]);

    return (
        <HStack
            max
            gap="16"
            className={classNames(cls.ArticleEditTags, {}, [className])}
        >
            <Text text={t('Тэги')} />
            <Button
                id={ArticleType.IT}
                className={classNames('', {
                    [cls.isSelected]: tags.includes(ArticleType.IT),
                })}
                onClick={onClickHandle}
            >
                {t('IT')}
            </Button>
            <Button
                id={ArticleType.ECONOMIC}
                className={classNames('', {
                    [cls.isSelected]: tags.includes(ArticleType.ECONOMIC),
                })}
                onClick={onClickHandle}
            >
                {t('Наука')}
            </Button>
            <Button
                id={ArticleType.SCIENCE}
                className={classNames('', {
                    [cls.isSelected]: tags.includes(ArticleType.SCIENCE),
                })}
                onClick={onClickHandle}
            >
                {t('Экономика')}
            </Button>
        </HStack>
    );
});
