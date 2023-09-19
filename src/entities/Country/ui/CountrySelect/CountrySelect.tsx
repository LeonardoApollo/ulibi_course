import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/libs/classNames/classNames';
import { ListBox } from '@/shared/ui/Popups';
import { Country } from '../../model/consts/county';

interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?: boolean;
}

const options = [
    { value: Country.Russia, content: Country.Russia },
    { value: Country.Ukraine, content: Country.Ukraine },
    { value: Country.Belaruls, content: Country.Belaruls },
    { value: Country.Armenia, content: Country.Armenia },
    { value: Country.Kazakhstan, content: Country.Kazakhstan },
];

export const CountrySelect = memo(({
    className, value, onChange, readonly,
}: CountrySelectProps) => {
    const { t } = useTranslation('profile');

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Country);
    }, [onChange]);

    return (
        <ListBox
            className={classNames('', {}, [className])}
            label={t('Страна')}
            onChange={onChangeHandler}
            value={value}
            defaultValue={t('Страна')}
            items={options}
            readonly={readonly}
            direction="topRight"
        />
    );

    // Старый дропдаун
    // return (
    //     <Select
    //         className={classNames('', {}, [className])}
    //         label={t('Страна')}
    //         options={options}
    //         value={value}
    //         onChange={onChangeHandler}
    //         readonly={readonly}
    //     />
    // );
});
