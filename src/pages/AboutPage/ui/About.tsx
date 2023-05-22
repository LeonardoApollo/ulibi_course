import React from 'react';
import { useTranslation } from 'react-i18next';

function About() {
    const { t } = useTranslation('about');

    return (
        <div>
            {t('О сайте')}
        </div>
    );
}

export default About;
