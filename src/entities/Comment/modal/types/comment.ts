import { User } from '@/entities/User';

export interface Comment {
    id: string;
    user: Omit<User, 'token'>;
    text: string;
}
