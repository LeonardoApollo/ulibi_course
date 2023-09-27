import { Suspense, lazy } from 'react';

import { Skeleton } from '@/shared/ui/Skeleton';

import { ProfileRatingProps } from './ProfileRating';

const ArticleRatingLazy = lazy(() => import('./ProfileRating'));

export const ProfileRatingAsync = (props: ProfileRatingProps) => (
    <Suspense fallback={<Skeleton width="100%" height={120} />}>
        <ArticleRatingLazy {...props} />
    </Suspense>
);
