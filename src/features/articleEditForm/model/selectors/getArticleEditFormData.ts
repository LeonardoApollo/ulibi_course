import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleEditData = (state: StateSchema) =>
    state?.articleEditForm;

export const getArticleEditUser = (state: StateSchema) =>
    state?.articleEditForm?.user;

export const getArticleEditisLoading = (state: StateSchema) =>
    state?.articleEditForm?.isLoading ?? false;

export const getArticleEditTitle = (state: StateSchema) =>
    state?.articleEditForm?.title ?? '';

export const getArticleEditSubtitle = (state: StateSchema) =>
    state?.articleEditForm?.subtitle ?? '';

export const getArticleEditImg = (state: StateSchema) =>
    state?.articleEditForm?.img ?? '';

export const getArticleEditCreatedAt = (state: StateSchema) =>
    state?.articleEditForm?.createdAt ?? '';

export const getArticleEditViews = (state: StateSchema) =>
    state?.articleEditForm?.views ?? 0;

export const getArticleEditType = (state: StateSchema) =>
    state?.articleEditForm?.type;

export const getArticleEditBlocks = (state: StateSchema) =>
    state?.articleEditForm?.blocks;

export const getArticleEditError = (state: StateSchema) =>
    state?.articleEditForm?.error;
