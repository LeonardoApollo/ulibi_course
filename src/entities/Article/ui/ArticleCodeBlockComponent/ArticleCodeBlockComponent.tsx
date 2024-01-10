import { CSSProperties, memo } from 'react';

import { useSideBar } from '@/shared/hooks/useSideBar';
import { useTrackInnerWidth } from '@/shared/hooks/useTrackWindowWidth';
import { classNames } from '@/shared/libs/classNames/classNames';
import { ToggleFeatures } from '@/shared/libs/features';
import { Code as CodeDeprecated } from '@/shared/ui/deprecated/Code';
import { Code } from '@/shared/ui/redesigned/Code';

import { ArticleCodeBlock } from '../../model/types/article';
import cls from './ArticleCodeBlockComponent.module.scss';

interface ArticleCodeBlockComponentProps {
    className?: string;
    block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo(
    ({ className, block }: ArticleCodeBlockComponentProps) => {
        const { SideBarState } = useSideBar();
        const width = useTrackInnerWidth();
        const closeSideBarWidth =
            // eslint-disable-next-line
            width - 595 > 831 ? 809 : width - 595 < 240 ? 192 : width - 620;
        const openSideBarWidth =
            // eslint-disable-next-line
            width - 756 > 839 ? 790 : width - 756 < 240 ? 192 : width - 805;
        const currWidth =
            SideBarState === 'open' ? openSideBarWidth : closeSideBarWidth;
        const style: CSSProperties = {
            width: currWidth,
        };
        return (
            <div
                style={style}
                className={classNames(cls.ArticleCodeBlockComponent, {}, [
                    className,
                ])}
            >
                <ToggleFeatures
                    feature="isAppRedesigned"
                    off={<CodeDeprecated text={block.code} />}
                    on={<Code text={block.code} />}
                />
            </div>
        );
    },
);
