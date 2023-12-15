import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Page } from '@/widgets/Page';

import {
    ArticleEditForm,
    articleEditFormSliceReducer,
    fetchEditArticleData,
    getArticleEditUser,
} from '@/features/articleEditForm';

import { UserRole, getUserAuthData } from '@/entities/User';

import { getRouteForbidden } from '@/shared/const/router';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useInitialEffect } from '@/shared/hooks/useInitialEffect';
import { classNames } from '@/shared/libs/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/libs/components/DynamicModuleLoader/DynamicModuleLoader';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';

import cls from './ArticleEditPage.module.scss';

interface ArticleEditPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleEditForm: articleEditFormSliceReducer,
};

const ArticleEditPage = ({ className }: ArticleEditPageProps) => {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const userData = useSelector(getUserAuthData);
    const articleUser = useSelector(getArticleEditUser);
    const dispatch = useAppDispatch();

    if (id) {
        // eslint-disable-next-line
        useInitialEffect(() => {
            dispatch(fetchEditArticleData(id));
        }, [dispatch]);

        if (
            articleUser?.id !== userData?.id &&
            !userData?.roles?.includes(UserRole.ADMIN)
        ) {
            navigate(getRouteForbidden());
        }

        return (
            <DynamicModuleLoader reducers={reducers}>
                <Page
                    className={classNames(cls.ArticleEditPage, {}, [className])}
                >
                    <VStack max gap="16" align="center">
                        <ArticleEditForm id={id} />
                    </VStack>
                </Page>
            </DynamicModuleLoader>
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
