import {
    CSSProperties,
    ImgHTMLAttributes,
    ReactElement,
    memo,
    useLayoutEffect,
    useMemo,
    useState,
} from 'react';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    src?: string;
    alt?: string;
    fallback?: ReactElement;
    errorFallback?: ReactElement;
    size?: number | string;
    border?: string | number;
}

export const AppImage = memo((props: AppImageProps) => {
    const {
        className,
        src,
        alt,
        fallback,
        errorFallback,
        size,
        border,
        ...otherProps
    } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useLayoutEffect(() => {
        const img = new Image();
        img.src = src ?? '';
        img.onload = () => {
            setIsLoading(false);
        };
        img.onerror = () => {
            setIsLoading(false);
            setHasError(true);
        };
    }, [src]);

    const styles = useMemo<CSSProperties>(
        () => ({
            width: size || '100%',
            height: size || '100%',
            borderRadius: border,
        }),
        [size, border],
    );

    if (isLoading && fallback) {
        return fallback;
    }

    if (hasError && errorFallback) {
        return errorFallback;
    }

    return (
        <img
            className={className}
            style={styles}
            src={src}
            alt={alt}
            {...otherProps}
        />
    );
});
