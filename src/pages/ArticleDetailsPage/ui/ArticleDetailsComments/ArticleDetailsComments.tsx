import { Suspense, memo, useCallback } from 'react';
import { classNames } from 'shared/libs/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { AddNewCommentForm } from 'features/addNewComment';
import { CommentList } from 'entities/Comment';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/hooks/useInitialEffect';
import { VStack } from 'shared/ui/Stack';
import { Loader } from 'shared/ui/Loader/Loader';
import { getArticleComments } from '../../modal/slices/ArticleDetailsCommentsSlice';
import { getArticleCommentsIsLoading } from '../../modal/selectors/getComments/getComments';
import { addCommentForArticle } from '../../modal/services/addCommentFormArticle/addNewCommentForAricle';
import { fetchCommentsByArticleId } from '../../modal/services/fetchCommentsByArticleId/fetchCommentsByArticleId';

interface ArticleDetailsCommentsProps {
    className?: string;
    id: string;
}

export const ArticleDetailsComments = memo(({ className, id }: ArticleDetailsCommentsProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const commnets = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    }, [id]);

    return (
        <VStack max className={classNames('', {}, [className])}>
            <Suspense fallback={<Loader />}>
                <AddNewCommentForm onSendComment={onSendComment} />
            </Suspense>
            <CommentList
                isLoading={commentsIsLoading}
                comments={commnets}
            />
        </VStack>
    );
});
