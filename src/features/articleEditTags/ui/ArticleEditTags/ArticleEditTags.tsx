import { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleType } from '@/entities/Article';

import { classNames } from '@/shared/libs/classNames/classNames';
import { Button } from '@/shared/ui/redesigned/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import cls from './ArticleEditTags.module.scss';

interface ArticleEditTagsProps {
    className?: string;
    initialTags?: ArticleType[];
    onClick: (tags: ArticleType[] | undefined) => void;
}

let selectedTags: ArticleType[] = [];

export const ArticleEditTags = memo((props: ArticleEditTagsProps) => {
    const { t } = useTranslation();
    const { className, initialTags, onClick } = props;
    const [isSelected, setIsSelected] = useState({
        IT: initialTags?.includes(ArticleType.IT) ?? false,
        ECONOMIC: initialTags?.includes(ArticleType.ECONOMIC) ?? false,
        SCIENCE: initialTags?.includes(ArticleType.SCIENCE) ?? false,
    });

    const onHandleClick = useCallback(
        (e: any) => {
            if (selectedTags.includes(e.target.id)) {
                selectedTags = selectedTags.filter((el) => el !== e.target.id);
                switch (e.target.id) {
                    case 'IT':
                        setIsSelected({ ...isSelected, IT: false });
                        break;
                    case 'ECONOMIC':
                        setIsSelected({ ...isSelected, ECONOMIC: false });
                        break;
                    case 'SCIENCE':
                        setIsSelected({ ...isSelected, SCIENCE: false });
                        break;
                    default:
                        break;
                }
                onClick(selectedTags);
            } else {
                selectedTags.push(e.target.id);
                switch (e.target.id) {
                    case 'IT':
                        setIsSelected({ ...isSelected, IT: true });
                        break;
                    case 'ECONOMIC':
                        setIsSelected({ ...isSelected, ECONOMIC: true });
                        break;
                    case 'SCIENCE':
                        setIsSelected({ ...isSelected, SCIENCE: true });
                        break;
                    default:
                        break;
                }
                onClick(selectedTags);
            }
        },
        [isSelected, onClick],
    );

    useEffect(() => {
        if (initialTags) {
            selectedTags = [];
            selectedTags = selectedTags.concat(initialTags);
            onClick(selectedTags);
        }
        // eslint-disable-next-line
    }, [initialTags]);

    return (
        <HStack
            max
            gap="16"
            className={classNames(cls.ArticleEditTags, {}, [className])}
        >
            <Text text={t('Тэги')} />
            <Button
                id={ArticleType.IT}
                className={classNames('', {
                    [cls.isSelected]: isSelected.IT,
                })}
                onClick={onHandleClick}
            >
                {t('IT')}
            </Button>
            <Button
                id={ArticleType.ECONOMIC}
                className={classNames('', {
                    [cls.isSelected]: isSelected.ECONOMIC,
                })}
                onClick={onHandleClick}
            >
                {t('Наука')}
            </Button>
            <Button
                id={ArticleType.SCIENCE}
                className={classNames('', {
                    [cls.isSelected]: isSelected.SCIENCE,
                })}
                onClick={onHandleClick}
            >
                {t('Экономика')}
            </Button>
        </HStack>
    );
});
