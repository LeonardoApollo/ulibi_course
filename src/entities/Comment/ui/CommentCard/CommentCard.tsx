import { memo } from 'react';

import { getRouteProfile } from '@/shared/const/router';
import { classNames } from '@/shared/libs/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink';
import { Avatar } from '@/shared/ui/Avatar';
import { Skeleton } from '@/shared/ui/Skeleton';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import { Comment } from '../../modal/types/comment';
import cls from './CommentCard.module.scss';

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
    'data-testid'?: string;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, isLoading, comment } = props;

    if (isLoading) {
        return (
            <VStack
                gap="8"
                max
                className={classNames(cls.CommentCard, {}, [
                    className,
                    cls.loading,
                ])}
            >
                <div className={cls.header}>
                    <Skeleton width={30} height={30} border="50%" />
                    <Skeleton height={16} width={100} />
                </div>
                <Skeleton width="100%" height={50} />
            </VStack>
        );
    }

    if (!comment) {
        return null;
    }

    return (
        <VStack
            data-testid={props['data-testid']}
            gap="8"
            max
            className={classNames(cls.CommentCard, {}, [className])}
        >
            <AppLink
                to={getRouteProfile(comment.user.id)}
                className={cls.header}
            >
                {comment.user.avatar ? (
                    <Avatar size={30} src={comment.user.avatar} />
                ) : null}
                <Text title={comment.user.username} />
            </AppLink>
            <Text text={comment?.text} />
        </VStack>
    );
});
