import { memo } from 'react';
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
import { VStack } from '@/shared/ui/redesigned/Stack';

import cls from './ArticleEditPage.module.scss';

interface ArticleEditPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleEditForm: articleEditFormSliceReducer,
};

const ArticleEditPage = ({ className }: ArticleEditPageProps) => {
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
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
                <VStack max gap="16" align="center">
                    <ArticleEditForm user={userData} />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleEditPage);
