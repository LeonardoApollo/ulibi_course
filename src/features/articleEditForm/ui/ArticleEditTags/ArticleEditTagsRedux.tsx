import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ArticleType } from '@/entities/Article';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { classNames } from '@/shared/libs/classNames/classNames';
import { Button } from '@/shared/ui/redesigned/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { getArticleEditType } from '../../model/selectors/getArticleEditFormData';
import { articleEditFormSliceActions } from '../../model/slice/articleEditFormSlice';
import cls from './ArticleEditTagsRedux.module.scss';

interface ArticleEditTagsReduxProps {
    className?: string;
}

export const ArticleEditTags = memo((props: ArticleEditTagsReduxProps) => {
    const { t } = useTranslation('articleForm');
    const { className } = props;
    const dispatch = useAppDispatch();
    const type = useSelector(getArticleEditType);

    const onChangeType = useCallback(
        (e: any) => {
            if (!type) {
                return;
            }
            if (!type.includes(e.target.id)) {
                dispatch(articleEditFormSliceActions.addType(e.target.id));
            } else {
                dispatch(articleEditFormSliceActions.deleteType(e.target.id));
            }
        },
        [dispatch, type],
    );

    if (!type) {
        return null;
    }

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
                    [cls.isSelected]: type.includes(ArticleType.IT),
                })}
                onClick={onChangeType}
            >
                {t('IT')}
            </Button>
            <Button
                id={ArticleType.ECONOMIC}
                className={classNames('', {
                    [cls.isSelected]: type.includes(ArticleType.ECONOMIC),
                })}
                onClick={onChangeType}
            >
                {t('Наука')}
            </Button>
            <Button
                id={ArticleType.SCIENCE}
                className={classNames('', {
                    [cls.isSelected]: type.includes(ArticleType.SCIENCE),
                })}
                onClick={onChangeType}
            >
                {t('Экономика')}
            </Button>
        </HStack>
    );
});
