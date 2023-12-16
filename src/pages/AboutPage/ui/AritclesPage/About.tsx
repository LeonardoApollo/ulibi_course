import React, { memo } from 'react';

import { Page } from '@/widgets/Page';

import { ToggleFeatures } from '@/shared/libs/features';

import { AboutDeprecated } from '../AboutDeprecated/AboutDeprecated';
import { AboutRedesigned } from '../AboutRedesigned/AboutRedesigned';

const About = memo(() => {
    const gitHubLogo: string =
        'https://cdn-icons-png.flaticon.com/512/25/25231.png';

    return (
        <Page>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={<AboutRedesigned githubLogo={gitHubLogo} />}
                off={<AboutDeprecated githubLogo={gitHubLogo} />}
            />
        </Page>
    );
});

export default About;
