import { Story } from '@storybook/react';

import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { articleDetailsReducer } from '@/entities/Article/testing';
import { loginReducer } from '@/features/AuthByUsername/testing';
import { addNewCommentFormReducer } from '@/features/addNewComment/testing';
import { profileReducer } from '@/features/editableProfileCard/testing';
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage/testing';
import { articlesPageSliceReducer } from '@/pages/ArticlesPage/testing';
import { ReducersList } from '@/shared/libs/components/DynamicModuleLoader/DynamicModuleLoader';

const defaultAsyncReducers: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    addNewCommentForm: addNewCommentFormReducer,
    articleDetailsPage: articleDetailsPageReducer,
    articlesPage: articlesPageSliceReducer,
};

export const StoreDecorator = (
    state: DeepPartial<StateSchema>,
    asyncReducers?: ReducersList,
) => (StoryComponent: Story) => (
    <StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
        <StoryComponent />
    </StoreProvider>
);
