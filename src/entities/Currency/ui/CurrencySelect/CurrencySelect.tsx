import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/libs/classNames/classNames';
import { ToggleFeatures } from '@/shared/libs/features';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { ListBox } from '@/shared/ui/redesigned/Popups';

import { Currency } from '../../model/consts/currency';

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}

const options = [
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = memo(
    ({ className, value, onChange, readonly }: CurrencySelectProps) => {
        const { t } = useTranslation('profile');

        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as Currency);
            },
            [onChange],
        );

        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <ListBox
                        className={classNames('', {}, [className])}
                        label={t('Валюта')}
                        value={value}
                        defaultValue={t('Валюта')}
                        items={options}
                        onChange={onChangeHandler}
                        readonly={readonly}
                        direction="topRight"
                    />
                }
                off={
                    <ListBoxDeprecated
                        className={classNames('', {}, [className])}
                        label={t('Валюта')}
                        value={value}
                        defaultValue={t('Валюта')}
                        items={options}
                        onChange={onChangeHandler}
                        readonly={readonly}
                        direction="topRight"
                    />
                }
            />
        );

        // Старый дропдаун
        // return (
        //     <Select
        //         className={classNames('', {}, [className])}
        //         label={t('Валюта')}
        //         options={options}
        //         value={value}
        //         onChange={onChangeHandler}
        //         readonly={readonly}
        //     />
        // );
    },
);
