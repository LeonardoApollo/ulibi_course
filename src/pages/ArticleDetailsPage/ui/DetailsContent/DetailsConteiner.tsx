import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { ArticleDetails } from '@/entities/Article';

import { Card } from '@/shared/ui/redesigned/Card';

interface DetailsContentProps {
    className?: string;
}

export const DetailsConteiner = memo((props: DetailsContentProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return null;
    }

    return (
        <Card max borderRadius="round" className={className} padding="24">
            <ArticleDetails id={id} />
        </Card>
    );
});
