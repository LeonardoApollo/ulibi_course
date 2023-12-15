import { Article } from '@/entities/Article';
import { User } from '@/entities/User';

export interface ArticleEditFormSchema extends Omit<Article, 'id' | 'user'> {
    id?: string;
    user?: User;
    isLoading: boolean;
    error?: string;
}
