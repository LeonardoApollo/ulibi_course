import { Suspense, lazy } from 'react';

import { ProfileRatingProps } from './ProfileRating';

import { Skeleton } from '@/shared/ui/Skeleton';

const ArticleRatingLazy = lazy(() => import('./ProfileRating'));

export const ProfileRatingAsync = (props: ProfileRatingProps) => (
    <Suspense fallback={<Skeleton width="100%" height={120} />}>
        <ArticleRatingLazy {...props} />
    </Suspense>
);
