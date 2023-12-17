import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

interface AboutDeprecatedProps {
    className?: string;
    githubLogo: string;
}

export const AboutDeprecated = memo(
    ({ className, githubLogo }: AboutDeprecatedProps) => {
        const { t } = useTranslation('about');

        return (
            <VStack max gap="16" wrap="wrap">
                <Text
                    head="h1"
                    theme={TextTheme.INVERTED}
                    title={t('Важно!')}
                />
                <Text
                    text={t(
                        'В связи с ограничениями json-server, бесплатных версий Vercel и Netlify,',
                    )}
                />
                <Text
                    text={t(
                        'Рекомендуется установить проект локально и запустить используя fork Github репозитория проекта.',
                    )}
                />
                <AppLink
                    theme={AppLinkTheme.SECONDARY}
                    target="_blank"
                    to="https://github.com/LeonardoApollo/webForum"
                >
                    <HStack max gap="8" wrap="wrap">
                        <img
                            style={{ width: 30, height: 30 }}
                            src={githubLogo}
                            alt="GitHubLogo"
                        />
                        <Text theme={TextTheme.ERROR} text={t('Github')} />
                    </HStack>
                </AppLink>
                <Text theme={TextTheme.INVERTED} title={t('Про проект')} />
                <VStack max gap="8" wrap="wrap">
                    <Text
                        text={t(
                            'В основе, это SPA приложение, для обмена статьями на всевозможные темы.',
                        )}
                    />
                    <Text
                        text={t(
                            'Сайт имеет 3 цветовых темы и интернализацию на 2-а языка, английский и русский.',
                        )}
                    />
                    <Text
                        text={t(
                            'Присутствует профиль пользователя, распределение роутов по ролям и 2-е версии интерфейса.',
                        )}
                    />
                    <Text
                        text={t(
                            'Список статей реализован через бесконечный скролл с постоянной подгрузкой новых статей.',
                        )}
                    />
                    <Text
                        text={t(
                            'Реализована комплексная фильтрация статей, как по прямому поиску, так и по параметрам.',
                        )}
                    />
                    <Text
                        text={t(
                            'Статьи можно создавать, редактировать, удалять, оценивать а также писать к ним комментарии.',
                        )}
                    />
                </VStack>
                <Text
                    theme={TextTheme.INVERTED}
                    title={t('Основные технологии проекта и архитектура')}
                />
                <VStack gap="8" max>
                    <HStack gap="8" wrap="wrap">
                        <Text
                            text={t(
                                'Архитектура фронтенда создана следуя методологии:',
                            )}
                        />
                        <AppLink
                            theme={AppLinkTheme.SECONDARY}
                            target="_blank"
                            to="https://feature-sliced.design/"
                        >
                            {t('Feature Slice Design.')}
                        </AppLink>
                    </HStack>
                    <HStack gap="8" wrap="wrap">
                        <Text text={t('Сам фронтенд основан на стэке:')} />
                        <HStack wrap="wrap">
                            <AppLink
                                theme={AppLinkTheme.SECONDARY}
                                target="_blank"
                                to="https://www.typescriptlang.org/"
                            >
                                {t('TypeScript/')}
                            </AppLink>
                            <AppLink
                                theme={AppLinkTheme.SECONDARY}
                                target="_blank"
                                to="https://react.dev/"
                            >
                                {t('React/')}
                            </AppLink>
                            <AppLink
                                theme={AppLinkTheme.SECONDARY}
                                target="_blank"
                                to="https://redux-toolkit.js.org/"
                            >
                                {t('Redux Toolkit.')}
                            </AppLink>
                        </HStack>
                    </HStack>
                    <HStack gap="8" wrap="wrap">
                        <Text text={t('Работа с API происходит используя:')} />
                        <HStack wrap="wrap">
                            <AppLink
                                theme={AppLinkTheme.SECONDARY}
                                target="_blank"
                                to="https://axios-http.com"
                            >
                                {t('axios/')}
                            </AppLink>
                            <AppLink
                                theme={AppLinkTheme.SECONDARY}
                                target="_blank"
                                to="https://redux.js.org/usage/writing-logic-thunks"
                            >
                                {t('Redux Thunk/')}
                            </AppLink>
                            <AppLink
                                theme={AppLinkTheme.SECONDARY}
                                target="_blank"
                                to="https://redux-toolkit.js.org/rtk-query/overview"
                            >
                                {t('RTK Query.')}
                            </AppLink>
                        </HStack>
                    </HStack>
                    <HStack gap="8" wrap="wrap">
                        <Text
                            text={t('Работа со стилями происходит в рамках:')}
                        />
                        <AppLink
                            theme={AppLinkTheme.SECONDARY}
                            target="_blank"
                            to="https://github.com/css-modules/css-modules"
                        >
                            {t('CSS(SCSS) Modules.')}
                        </AppLink>
                    </HStack>
                    <HStack gap="8" wrap="wrap">
                        <HStack gap="8" wrap="wrap">
                            <Text
                                text={t(
                                    'В качестве сборщика, настроенный с нуля',
                                )}
                            />
                            <AppLink
                                theme={AppLinkTheme.SECONDARY}
                                target="_blank"
                                to="https://webpack.js.org/"
                            >
                                {t('Webpack')}
                            </AppLink>
                        </HStack>
                        <HStack gap="8" wrap="wrap">
                            <Text text={t('и небольшая альтернатива в виде')} />
                            <AppLink
                                theme={AppLinkTheme.SECONDARY}
                                target="_blank"
                                to="https://vitejs.dev/"
                            >
                                {t('Vite.')}
                            </AppLink>
                        </HStack>
                    </HStack>
                    <Text
                        text={t(
                            'Финальный бандл разбит на чанки и подгружается страницами асинхронно,',
                        )}
                    />
                    <Text
                        text={t(
                            'тем самым увеличивая скорость первичной загрузки и уменьшая размер главного чанка.',
                        )}
                    />
                    <HStack gap="8" wrap="wrap">
                        <Text
                            text={t(
                                'Для выявления визуальных багов и отслеживания изменений UI используется:',
                            )}
                        />
                        <AppLink
                            theme={AppLinkTheme.SECONDARY}
                            target="_blank"
                            to="https://storybook.js.org/"
                        >
                            {t('Storybook.')}
                        </AppLink>
                    </HStack>
                </VStack>
                <Text
                    theme={TextTheme.INVERTED}
                    title={t('Удобство и стандартизация разработки')}
                />
                <VStack gap="8" max>
                    <HStack gap="8" wrap="wrap">
                        <Text text={t('Применяется')} />
                        <AppLink
                            theme={AppLinkTheme.SECONDARY}
                            target="_blank"
                            to="https://eslint.org/"
                        >
                            {t('eslint')}
                        </AppLink>
                        <Text
                            text={t(
                                'включающий в себя 3 самодельных плагина на проверку следованию правилам архитектуры',
                            )}
                        />
                    </HStack>
                    <HStack gap="8" wrap="wrap">
                        <Text text={t('Применяется')} />
                        <AppLink
                            theme={AppLinkTheme.SECONDARY}
                            target="_blank"
                            to="https://stylelint.io/"
                        >
                            {t('stylelint')}
                        </AppLink>
                        <Text
                            text={t('для проверки написания файлов стилей')}
                        />
                    </HStack>
                    <HStack gap="8" wrap="wrap">
                        <Text text={t('Применяется')} />
                        <AppLink
                            theme={AppLinkTheme.SECONDARY}
                            target="_blank"
                            to="https://prettier.io/"
                        >
                            {t('prettier')}
                        </AppLink>
                        <Text
                            text={t('для автоматического форматирования кода')}
                        />
                    </HStack>
                </VStack>
                <Text theme={TextTheme.INVERTED} title={t('Тестирование')} />
                <VStack gap="8" max>
                    <Text
                        text={t(
                            'Фронтенд приложения покрыт всеми видами тестов:',
                        )}
                    />
                    <HStack gap="8" wrap="wrap">
                        <AppLink
                            theme={AppLinkTheme.SECONDARY}
                            target="_blank"
                            to="https://www.geeksforgeeks.org/unit-testing-software-testing/"
                        >
                            {t('Unit тесты')}
                        </AppLink>
                        <Text text={t('на')} />
                        <AppLink
                            theme={AppLinkTheme.SECONDARY}
                            target="_blank"
                            to="https://jestjs.io/"
                        >
                            {t('Jest')}
                        </AppLink>
                    </HStack>
                    <HStack gap="8" wrap="wrap">
                        <AppLink
                            theme={AppLinkTheme.SECONDARY}
                            target="_blank"
                            to="https://testsigma.com/guides/component-testing/"
                        >
                            {t('Component тесты')}
                        </AppLink>
                        <Text text={t('на')} />
                        <AppLink
                            theme={AppLinkTheme.SECONDARY}
                            target="_blank"
                            to="https://testing-library.com/"
                        >
                            {t('React testing library')}
                        </AppLink>
                    </HStack>
                    <HStack gap="8" wrap="wrap">
                        <AppLink
                            theme={AppLinkTheme.SECONDARY}
                            target="_blank"
                            to="https://www.hotjar.com/ui-design/testing/"
                        >
                            {t('UI тесты')}
                        </AppLink>
                        <Text text={t('на связке')} />
                        <AppLink
                            theme={AppLinkTheme.SECONDARY}
                            target="_blank"
                            to="https://storybook.js.org/"
                        >
                            {t('Storybook')}
                        </AppLink>
                        <Text text={t('и')} />
                        <HStack wrap="wrap">
                            <AppLink
                                theme={AppLinkTheme.SECONDARY}
                                target="_blank"
                                to="https://www.chromatic.com/"
                            >
                                {t('Chromatic/')}
                            </AppLink>
                            <AppLink
                                theme={AppLinkTheme.SECONDARY}
                                target="_blank"
                                to="https://loki.js.org/"
                            >
                                {t('Loki')}
                            </AppLink>
                        </HStack>
                    </HStack>
                    <HStack gap="8" wrap="wrap">
                        <AppLink
                            theme={AppLinkTheme.SECONDARY}
                            target="_blank"
                            to="https://katalon.com/resources-center/blog/end-to-end-e2e-testing"
                        >
                            {t('e2e тесты')}
                        </AppLink>
                        <Text text={t('на')} />
                        <AppLink
                            theme={AppLinkTheme.SECONDARY}
                            target="_blank"
                            to="https://www.cypress.io/"
                        >
                            {t('Cypress')}
                        </AppLink>
                    </HStack>
                </VStack>
                <Text
                    theme={TextTheme.INVERTED}
                    title={t('Библиотека компонентов')}
                />
                <VStack gap="8" max>
                    <HStack gap="8" wrap="wrap">
                        <Text
                            text={t(
                                'Была создана своя библиотека компонентов на основе:',
                            )}
                        />
                        <AppLink
                            theme={AppLinkTheme.SECONDARY}
                            target="_blank"
                            to="https://headlessui.com/"
                        >
                            {t('headlessUi')}
                        </AppLink>
                    </HStack>
                </VStack>
                <Text theme={TextTheme.INVERTED} title={t('Интернализация')} />
                <VStack gap="8" max>
                    <HStack gap="8" wrap="wrap">
                        <Text
                            text={t(
                                'Сайт использует интернализацию, на русский и английский языки используя:',
                            )}
                        />
                        <AppLink
                            theme={AppLinkTheme.SECONDARY}
                            target="_blank"
                            to="https://www.i18next.com/"
                        >
                            {t('i18next')}
                        </AppLink>
                    </HStack>
                </VStack>
                <Text
                    theme={TextTheme.INVERTED}
                    title={t(
                        'Работа с FF или постепенная интеграция новых возможностей',
                    )}
                />
                <VStack gap="8" max>
                    <HStack gap="8" wrap="wrap">
                        <Text
                            text={t(
                                'Для быстрого и удобного обновления приложения, работа с ними происходит по средствам',
                            )}
                        />
                        <AppLink
                            theme={AppLinkTheme.SECONDARY}
                            target="_blank"
                            to="https://habr.com/ru/articles/543420/"
                        >
                            {t('Feature Flags')}
                        </AppLink>
                    </HStack>
                    <HStack gap="8" wrap="wrap">
                        <Text
                            text={t(
                                'Подробнее про работу с ними в данном проекте, можно узнать на',
                            )}
                        />
                        <AppLink
                            theme={AppLinkTheme.SECONDARY}
                            target="_blank"
                            to="https://github.com/LeonardoApollo/webForum"
                        >
                            {t('Github')}
                        </AppLink>
                        <Text
                            text={t(
                                'проекта в теме feature flags документации',
                            )}
                        />
                    </HStack>
                </VStack>
                <Text
                    theme={TextTheme.INVERTED}
                    title={t('Continuous Integration и pre-commit хуки')}
                />
                <VStack max gap="8">
                    <HStack gap="8" wrap="wrap">
                        <Text
                            text={t(
                                'Процесс проверки коммитов и пушей автоматизирован используя',
                            )}
                        />
                        <AppLink
                            theme={AppLinkTheme.SECONDARY}
                            target="_blank"
                            to="https://github.com/features/actions"
                        >
                            {t('GitHub Actions')}
                        </AppLink>
                        <Text text={t('и')} />
                        <AppLink
                            theme={AppLinkTheme.SECONDARY}
                            target="_blank"
                            to="https://www.npmjs.com/package/husky"
                        >
                            {t('husky.')}
                        </AppLink>
                    </HStack>
                </VStack>
            </VStack>
        );
    },
);
