import { memo, useState } from 'react';
import { classNames } from '@/shared/libs/classNames/classNames';
import { Icon } from '../Icon/Icon';
import cls from './StarRaiting.module.scss';
import StarIcon from '../../assets/icons/Star.svg';

interface StarRaitingProps {
    className?: string;
    onSelect?: (starsCount: number) => void;
    size?: number;
    selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRaiting = memo((props: StarRaitingProps) => {
    const {
        className,
        onSelect,
        size = 30,
        selectedStars = 0,
    } = props;

    const [currentStarsCount, setCurrentStarsCount] = useState(0);
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
        <div className={classNames(cls.StarRaiting, {}, [className])}>
            {stars.map((star) => (
                <Icon
                    className={classNames(
                        cls.starIcon,
                        { [cls.isSelected]: isSelected },
                        [currentStarsCount >= star ? cls.hovered : cls.normal],
                    )}
                    Svg={StarIcon}
                    key={star}
                    width={size}
                    height={size}
                    onMouseLeave={onLeave}
                    onMouseEnter={onHover(star)}
                    onClick={onClick(star)}
                />
            ))}
        </div>
    );
});
