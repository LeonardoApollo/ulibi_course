import { memo, useState } from 'react';

import { classNames } from '@/shared/libs/classNames/classNames';
import { ToggleFeatures, toggleFeatures } from '@/shared/libs/features';

import StarIcon from '../../../assets/icons/Star.svg';
import { Icon as IconDeprecated } from '../../deprecated/Icon/Icon';
import { Icon } from '../Icon';
import cls from './StarRating.module.scss';

interface StarRatingProps {
    className?: string;
    onSelect?: (starsCount: number) => void;
    size?: number;
    selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
    const { className, onSelect, size = 30, selectedStars = 0 } = props;

    const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const onHover = (starsCount: number) => () => {
        if (!isSelected) {
            setCurrentStarsCount(starsCount);
        }
    };

    const onLeave = () => {
        if (!isSelected) {
            setCurrentStarsCount(0);
        }
    };

    const onClick = (starsCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starsCount);
            setCurrentStarsCount(starsCount);
            setIsSelected(true);
        }
    };

    return (
        <div
            className={classNames(
                toggleFeatures({
                    name: 'isAppRedesigned',
                    on: () => cls.StarRatingRedesgined,
                    off: () => cls.StarRaiting,
                }),
                {},
                [className],
            )}
        >
            {stars.map((star) => {
                const commonProps = {
                    className: classNames(
                        cls.starIcon,
                        { [cls.isSelected]: isSelected },
                        [currentStarsCount >= star ? cls.hovered : cls.normal],
                    ),
                    Svg: StarIcon,
                    key: star,
                    width: size,
                    height: size,
                    onMouseLeave: onLeave,
                    onMouseEnter: onHover(star),
                    onClick: onClick(star),
                    'data-testid': `StarRating.${star}`,
                    'data-selected': currentStarsCount >= star,
                };

                return (
                    <ToggleFeatures
                        feature="isAppRedesigned"
                        key={star}
                        on={<Icon clickable={!isSelected} {...commonProps} />}
                        off={<IconDeprecated {...commonProps} />}
                    />
                );
            })}
        </div>
    );
});
