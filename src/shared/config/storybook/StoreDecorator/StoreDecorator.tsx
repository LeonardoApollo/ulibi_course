import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { articleDetailsReducer } from 'entities/Article/model/slice/ArticleDetailsSlice';
import { profileReducer } from 'features/editableProfileCard';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
import { addNewCommentFormReducer } from 'features/addNewComment/model/slices/addNewCommentSlice';
import { articleDetailsPageReducer } from 'pages/ArticleDetailsPage/modal/slices';
import { articlesPageSliceReducer } from 'pages/ArticlesPage/model/slices/articlePageSlice';
import { ReducersList } from 'shared/libs/components/DynamicModuleLoader/DynamicModuleLoader';

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
