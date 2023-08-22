import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { articleDetailsReducer } from 'entities/Article/model/slice/ArticleDetailsSlice';
import { profileReducer } from 'entities/Profile';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { addNewCommentFormReducer } from 'features/addNewComment/model/slices/addNewCommentSlice';
import { articleDetailsCommentsReducer } from 'pages/ArticleDetailsPage/modal/slices/ArticleDetailsCommentsSlice';
import { articlesPageSliceReducer } from 'pages/ArticlesPage/model/slices/articlePageSlice';
import { ReducersList } from 'shared/libs/components/DynamicModuleLoader';

const defaultAsyncReducers: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    addNewCommentForm: addNewCommentFormReducer,
    articleDetailsComments: articleDetailsCommentsReducer,
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
