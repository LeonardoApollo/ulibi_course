import { Article } from '@/entities/Article';
import { User } from '@/entities/User';

import { ValidateArticleError } from '../consts/consts';

export interface ArticleEditFormSchema extends Omit<Article, 'id' | 'user'> {
    id?: string;
    user?: Omit<User, 'token'>;
    isLoading: boolean;
    error?: ValidateArticleError[];
}

export interface ChangeBlockPosition {
    from: number;
    to: number;
}
