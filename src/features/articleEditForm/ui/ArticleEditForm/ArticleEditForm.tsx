import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { User } from '@/entities/User';

import {
    getRouteArticleDetails,
    getRouteArticles,
} from '@/shared/const/router';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { classNames } from '@/shared/libs/classNames/classNames';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import {
    getArticleEditError,
    getArticleEditImg,
    getArticleEditSubtitle,
    getArticleEditTitle,
    getArticleEditisLoading,
} from '../../model/selectors/getArticleEditFormData';
import { createArticle } from '../../model/services/createArticle';
import { deleteArticle } from '../../model/services/deleteArticle';
import { updateArticleData } from '../../model/services/updateArticles';
import { articleEditFormSliceActions } from '../../model/slice/articleEditFormSlice';
import { ArticleEditBlocks } from '../ArticleEditBlocks/ArticleEditBlocks';
import {
    ArticleEditDeleteModal,
    ArticleEditExitModal,
    ArticleEditSaveModal,
} from '../ArticleEditModals';
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
    // Будут нужен при создании статьи и валидации
    const error = useSelector(getArticleEditError);

    const [isExitModalOpen, setIsExitModalOpen] = useState<boolean>(false);
    const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

    const onUpdateArticle = useCallback(async () => {
        if (id) {
            setIsSaveModalOpen(false);
            await dispatch(updateArticleData(id));
            navigate(getRouteArticleDetails(id));
        }
    }, [id, dispatch, navigate]);

    const onExit = useCallback(() => {
        if (id) {
            setIsExitModalOpen(false);
            navigate(getRouteArticleDetails(id));
        } else {
            setIsExitModalOpen(false);
            window.history.length > 2 ? window.history.back() : navigate('/');
        }
    }, [navigate, id]);

    const onDeleteArticle = useCallback(async () => {
        if (id) {
            setIsDeleteModalOpen(false);
            await dispatch(deleteArticle(id));
            navigate(getRouteArticles());
        }
    }, [id, dispatch, navigate]);

    const onCreateArticle = useCallback(async () => {
        if (user) {
            dispatch(articleEditFormSliceActions.setUser(user));
            dispatch(
                articleEditFormSliceActions.setCreatedAt(
                    new Date().toLocaleDateString('en-GB').replace(/\//g, '.'),
                ),
            );
            await dispatch(createArticle(user.id));
            navigate(getRouteArticles());
        }
    }, [navigate, dispatch, user]);

    const onSaveModalClose = useCallback(() => {
        setIsSaveModalOpen(false);
    }, []);

    const onExitModalClose = useCallback(() => {
        setIsExitModalOpen(false);
    }, []);

    const onDeleteModalClose = useCallback(() => {
        setIsDeleteModalOpen(false);
    }, []);

    const onSaveModalOpen = useCallback(() => {
        setIsSaveModalOpen(true);
    }, []);

    const onExitModalOpen = useCallback(() => {
        setIsExitModalOpen(true);
    }, []);

    const onDeleteModalOpen = useCallback(() => {
        setIsDeleteModalOpen(true);
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
            <Text
                title={id ? t('Редактирование статьи') : t('Создание статьи')}
            />
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
                    {id ? t('Сохранить') : t('Создать')}
                </Button>
                <Button colorType="error" onClick={onDeleteModalOpen}>
                    {t('Удалить')}
                </Button>
                <Button colorType="error" onClick={onExitModalOpen}>
                    {t('Отмена')}
                </Button>
            </HStack>
            {isSaveModalOpen && (
                <ArticleEditSaveModal
                    isSaveModalOpen={isSaveModalOpen}
                    onSaveModalClose={onSaveModalClose}
                    onChangeArticle={id ? onUpdateArticle : onCreateArticle}
                    type={id ? 'update' : 'create'}
                />
            )}
            {isExitModalOpen && (
                <ArticleEditExitModal
                    isExitModalOpen={isExitModalOpen}
                    onExitModalClose={onExitModalClose}
                    onExit={onExit}
                />
            )}
            {isDeleteModalOpen && (
                <ArticleEditDeleteModal
                    isDeleteModalOpen={isDeleteModalOpen}
                    onDeleteModalClose={onDeleteModalClose}
                    onDeleteArticle={onDeleteArticle}
                />
            )}
        </VStack>
    );
});
