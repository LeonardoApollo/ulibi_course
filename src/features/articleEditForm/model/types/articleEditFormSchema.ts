import { Article } from '@/entities/Article';
import { User } from '@/entities/User';

export interface ArticleEditFormSchema extends Omit<Article, 'id' | 'user'> {
    id?: string;
    user?: Omit<User, 'token'>;
    isLoading: boolean;
    error?: string;
}
