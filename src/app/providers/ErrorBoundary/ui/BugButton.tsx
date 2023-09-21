import { useState, useEffect } from 'react';

import { Button } from '@/shared/ui/Button';

// Компонент для тестирования ErrorBoundary
export const BugButton = () => {
    const [error, setError] = useState(false);

    const onThrow = () => setError(true);

    useEffect(() => {
        if (error) {
            throw new Error();
        }
    }, [error]);

    return (
        // eslint-disable i18next/no-literal-string
        <Button
            onClick={onThrow}
        >
            404
        </Button>
    );
};
