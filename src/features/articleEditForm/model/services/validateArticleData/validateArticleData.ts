import { Article, ArticleBlockType } from '@/entities/Article';
import { User } from '@/entities/User';

import { ValidateArticleError } from '../../consts/consts';

interface ArticleData extends Omit<Article, 'id' | 'user'> {
    id?: string;
    user?: Omit<User, 'token'>;
}

export const validateArticleData = (article?: ArticleData) => {
    if (!article) {
        return [ValidateArticleError.NO_DATA];
    }

    const { title, subtitle, blocks, type } = article;

    const errors: ValidateArticleError[] = [];

    if (!title || title.length < 3) {
        errors.push(ValidateArticleError.INCORRECT_TITLE);
    }

    if (!subtitle || subtitle.length < 3) {
        errors.push(ValidateArticleError.INCORRECT_SUBTITLE);
    }

    if (!blocks.length) {
        errors.push(ValidateArticleError.INCORRECT_BLOCKS);
    } else if (blocks[0].type !== ArticleBlockType.TEXT) {
        errors.push(ValidateArticleError.INCORRECT_FIRST_BLOCK);
    }

    blocks.forEach((block) => {
        if (!errors.includes(ValidateArticleError.INCORRECT_BLOCK)) {
            if (Object.values(block).includes('')) {
                errors.push(ValidateArticleError.INCORRECT_BLOCK);
            }
        }
    });

    if (!type.length) {
        errors.push(ValidateArticleError.INCORRECT_TAGS);
    }

    return errors;
};
