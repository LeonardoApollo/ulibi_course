import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { User } from '@/entities/User';

import { getRouteArticleDetails } from '@/shared/const/router';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useInitialEffect } from '@/shared/hooks/useInitialEffect';
import { classNames } from '@/shared/libs/classNames/classNames';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import {
    getArticleEditCreatedAt,
    getArticleEditError,
    getArticleEditImg,
    getArticleEditSubtitle,
    getArticleEditTitle,
    getArticleEditViews,
    getArticleEditisLoading,
} from '../../model/selectors/getArticleEditFormData';
import { updateArticleData } from '../../model/services/updateArticles';
import { articleEditFormSliceActions } from '../../model/slice/articleEditFormSlice';
import { ArticleEditBlocks } from '../ArticleEditBlocks/ArticleEditBlocks';
import { ArticleEditTags } from '../ArticleEditTags/ArticleEditTagsRedux';
import cls from './ArticleEditForm.module.scss';

interface ArticleEditFormProps {
    className?: string;
    id?: string;
    user?: User;
}

export const ArticleEditForm = memo((props: ArticleEditFormProps) => {
    const { className, id, user } = props;
    const { t } = useTranslation('articleForm');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const title = useSelector(getArticleEditTitle);
    const subtitle = useSelector(getArticleEditSubtitle);
    const image = useSelector(getArticleEditImg);
    const isLoading = useSelector(getArticleEditisLoading);
    // Будут нужны при создании статьи и валидации
    const error = useSelector(getArticleEditError);
    const views = useSelector(getArticleEditViews);
    const createdAt = useSelector(getArticleEditCreatedAt);

    const [isExitModalOpen, setIsExitModalOpen] = useState(false);
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

    const onUpdateArticle = useCallback(async () => {
        if (id) {
            setIsSaveModalOpen(false);
            await dispatch(updateArticleData(id));
            navigate(getRouteArticleDetails(id));
        }
    }, [id, dispatch, navigate]);

    const onExitModalCloseAccept = useCallback(() => {
        if (id) {
            setIsExitModalOpen(false);
            navigate(getRouteArticleDetails(id));
        }
    }, [navigate, id]);

    const onSaveModalClose = useCallback(() => {
        setIsSaveModalOpen(false);
    }, []);

    const onExitModalClose = useCallback(() => {
        setIsExitModalOpen(false);
    }, []);

    const onSaveModalOpen = useCallback(() => {
        setIsSaveModalOpen(true);
    }, []);

    const onExitModalOpen = useCallback(() => {
        setIsExitModalOpen(true);
    }, []);

    const onChangeTitle = useCallback(
        (value: string) => {
            dispatch(articleEditFormSliceActions.setTitle(value));
        },
        [dispatch],
    );

    const onChangeSubtitle = useCallback(
        (value: string) => {
            dispatch(articleEditFormSliceActions.setSubtitle(value));
        },
        [dispatch],
    );

    const onChangeImage = useCallback(
        (value: string) => {
            dispatch(articleEditFormSliceActions.setImage(value));
        },
        [dispatch],
    );

    useInitialEffect(() => {
        if (user) {
            dispatch(articleEditFormSliceActions.setUser(user));
        }
    }, [user]);

    if (isLoading) {
        return null;
    }

    return (
        <VStack
            max
            gap="16"
            align="center"
            className={classNames(cls.ArticleEditForm, {}, [className])}
        >
            <Text title={t('Редактирование статьи')} />
            <Input
                label={t('Заголовок')}
                value={title}
                onChange={onChangeTitle}
            />
            <Input
                label={t('Подзаголовок')}
                value={subtitle}
                onChange={onChangeSubtitle}
            />
            {image && (
                <AppImage
                    className={cls.img}
                    fallback={<Skeleton width={300} height={150} />}
                    errorFallback={
                        <Text
                            align="center"
                            variant="error"
                            text={t('Ошибка загрузки изображения')}
                            className={cls.Error}
                        />
                    }
                    src={image}
                />
            )}
            <Input
                label={t('Иллюстрация')}
                value={image}
                onChange={onChangeImage}
            />
            <ArticleEditTags />
            <ArticleEditBlocks />
            <HStack max justify="between" className={cls.Btns}>
                <Button colorType="success" onClick={onSaveModalOpen}>
                    {t('Сохранить')}
                </Button>
                <Button colorType="error" onClick={onExitModalOpen}>
                    {t('Отмена')}
                </Button>
            </HStack>
            {isSaveModalOpen && (
                <Modal isOpen={isSaveModalOpen} onClose={onSaveModalClose}>
                    <VStack gap="16" max>
                        <Text title={t('Сохранить изменения?')} />
                        <HStack max justify="between">
                            <Button
                                colorType="success"
                                onClick={onUpdateArticle}
                            >
                                {t('Да')}
                            </Button>
                            <Button
                                colorType="error"
                                onClick={onSaveModalClose}
                            >
                                {t('Нет')}
                            </Button>
                        </HStack>
                    </VStack>
                </Modal>
            )}
            {isExitModalOpen && (
                <Modal isOpen={isExitModalOpen} onClose={onExitModalClose}>
                    <VStack gap="16" max>
                        <Text title={t('Вы действительно хотите выйти?')} />
                        <Text text={t('Изменения не будут сохранены')} />
                        <HStack max justify="between">
                            <Button
                                colorType="success"
                                onClick={onExitModalCloseAccept}
                            >
                                {t('Да')}
                            </Button>
                            <Button
                                colorType="error"
                                onClick={onExitModalClose}
                            >
                                {t('Нет')}
                            </Button>
                        </HStack>
                    </VStack>
                </Modal>
            )}
        </VStack>
    );
});
