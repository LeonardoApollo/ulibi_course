import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { classNames } from '@/shared/libs/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/libs/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/libs/features';
import {
    Button as ButtonDeprecated,
    ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { HStack } from '@/shared/ui/redesigned/Stack';

import {
    getAddCommentFormError,
    getAddCommentFormText,
} from '../../model/selectors/addCommentFormSelectors';
import {
    addNewCommentFormActions,
    addNewCommentFormReducer,
} from '../../model/slices/addNewCommentSlice';
import cls from './AddNewCommentForm.module.scss';

interface AddNewCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
    addNewCommentForm: addNewCommentFormReducer,
};

const AddNewCommentForm = memo(
    ({ className, onSendComment }: AddNewCommentFormProps) => {
        const { t } = useTranslation();
        const text = useSelector(getAddCommentFormText);
        const error = useSelector(getAddCommentFormError);
        const dispatch = useAppDispatch();

        const onCommentTextChange = useCallback(
            (value: string) => {
                dispatch(addNewCommentFormActions.setText(value));
            },
            [dispatch],
        );

        const onSendHandler = useCallback(() => {
            onSendComment(text || '');
            onCommentTextChange('');
        }, [onCommentTextChange, onSendComment, text]);

        return (
            <DynamicModuleLoader reducers={reducers}>
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={
                        <Card padding="24" borderRadius="round" max>
                            <HStack
                                gap="16"
                                max
                                className={classNames(
                                    cls.AddNewCommentFormRedesigned,
                                    {},
                                    [className],
                                )}
                                data-testid="ArticleDetails.CommentForm"
                            >
                                <Input
                                    className={cls.input}
                                    placeholder={t('Введите текст комментария')}
                                    value={text}
                                    onChange={onCommentTextChange}
                                    data-testid="ArticleDetails.CommentForm.Input"
                                />
                                <Button
                                    variant="outline"
                                    onClick={onSendHandler}
                                    data-testid="ArticleDetails.CommentForm.Send"
                                >
                                    {t('Отправить')}
                                </Button>
                            </HStack>
                        </Card>
                    }
                    off={
                        <HStack
                            gap="16"
                            max
                            className={classNames(cls.AddNewCommentForm, {}, [
                                className,
                            ])}
                            data-testid="ArticleDetails.CommentForm"
                        >
                            <InputDeprecated
                                className={cls.input}
                                placeholder={t('Введите текст комментария')}
                                value={text}
                                onChange={onCommentTextChange}
                                data-testid="ArticleDetails.CommentForm.Input"
                            />
                            <ButtonDeprecated
                                theme={ThemeButton.OUTLINE}
                                onClick={onSendHandler}
                                data-testid="ArticleDetails.CommentForm.Send"
                            >
                                {t('Отправить')}
                            </ButtonDeprecated>
                        </HStack>
                    }
                />
            </DynamicModuleLoader>
        );
    },
);

export default AddNewCommentForm;
