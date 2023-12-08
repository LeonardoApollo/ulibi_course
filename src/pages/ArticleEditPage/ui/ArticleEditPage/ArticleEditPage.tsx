import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Page } from '@/widgets/Page';

import { ArticleEditTags } from '@/features/articleEditTags';

import { ArticleType } from '@/entities/Article';
import { UserRole, getUserAuthData } from '@/entities/User';

import {
    getRouteArticleDetails,
    getRouteForbidden,
} from '@/shared/const/router';
import { classNames } from '@/shared/libs/classNames/classNames';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { useArticleEditApi, useUpdateArticle } from '../../api/articleEditApi';
import cls from './ArticleEditPage.module.scss';

interface ArticleEditPageProps {
    className?: string;
}

const ArticleEditPage = ({ className }: ArticleEditPageProps) => {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const timeStampRef = useRef(Date.now()).current;
    const navigate = useNavigate();
    const userData = useSelector(getUserAuthData);

    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [img, setImg] = useState('');
    const [tags, setTags] = useState<ArticleType[]>([]);

    const [isExitModalOpen, setIsExitModalOpen] = useState(false);
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const onChangeTitle = useCallback((value: string) => {
        setTitle(value);
    }, []);

    const onChangeSubtitle = useCallback((value: string) => {
        setSubtitle(value);
    }, []);

    const onChangeImg = useCallback((value: string) => {
        setImg(value);
    }, []);

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

    if (id) {
        // eslint-disable-next-line
        const { data, isLoading, error } = useArticleEditApi(id, {
            refetchOnReconnect: true,
        });

        if (
            data?.user.id !== userData?.id &&
            !userData?.roles?.includes(UserRole.ADMIN)
        ) {
            navigate(getRouteForbidden());
        }

        // eslint-disable-next-line
        const [updateArticle] = useUpdateArticle();

        // eslint-disable-next-line
        const onExitModalCloseAccept = useCallback(() => {
            setIsExitModalOpen(false);
            navigate(getRouteArticleDetails(id));
        }, [navigate, id]);

        // eslint-disable-next-line
        const onArticleSave = useCallback(() => {
            if (data) {
                try {
                    updateArticle({
                        id: data.id,
                        title,
                        subtitle,
                        img,
                        createdAt: data.createdAt,
                        user: data.user,
                        views: data.views,
                        type: tags,
                        blocks: data.blocks,
                    });
                    setIsSaveModalOpen(false);
                    navigate(getRouteArticleDetails(id));
                } catch (e) {
                    console.log(e);
                }
            }
        }, [data, id, img, navigate, subtitle, title, updateArticle, tags]);

        // eslint-disable-next-line
        useEffect(() => {
            if (data && !isLoading) {
                setTitle(data.title);
                setSubtitle(data.subtitle);
                setImg(data.img);
            }
        }, [isLoading, data]);

        if (isLoading) {
            return null;
        }

        return (
            <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
                <VStack max gap="16" align="center">
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
                    {img && (
                        <AppImage
                            className={cls.img}
                            fallback={<Skeleton width={300} height={150} />}
                            src={img}
                        />
                    )}
                    <Input
                        label={t('Иллюстрация')}
                        value={img}
                        onChange={onChangeImg}
                    />
                    <ArticleEditTags
                        initialTags={data?.type}
                        tags={tags}
                        setTags={setTags}
                    />
                    <HStack max justify="between" className={cls.Btns}>
                        <Button colorType="success" onClick={onSaveModalOpen}>
                            {t('Сохранить')}
                        </Button>
                        <Button colorType="error" onClick={onExitModalOpen}>
                            {t('Отмена')}
                        </Button>
                    </HStack>
                </VStack>
                {isSaveModalOpen && (
                    <Modal isOpen={isSaveModalOpen} onClose={onSaveModalClose}>
                        <VStack gap="16" max>
                            <Text title={t('Сохранить изменения?')} />
                            <HStack max justify="between">
                                <Button
                                    colorType="success"
                                    onClick={onArticleSave}
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
            </Page>
        );
    }

    return (
        <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
            <Input label={t('Название')} />
            <Input label={t('Описание')} />
            <Input label={t('Изображдение')} />
        </Page>
    );
};

export default memo(ArticleEditPage);
