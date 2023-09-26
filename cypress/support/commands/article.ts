import { Article } from '../../../src/entities/Article';

const testArticle = {
    id: '99',
    title: 'Test Article',
    subtitle: 'For e2e tests',
    img: '',
    views: 100500,
    createdAt: '20.07.2077',
    userId: '1',
    type: ['SCIENCE'],
    blocks: [],
};

export const createArticle = (article?: Article) => cy.request({
    method: 'POST',
    url: 'http://localhost:8000/articles',
    headers: { Authorization: 'any' },
    body: article ?? testArticle,
}).then((resp) => resp.body);

export const removeArticle = (articleId: string) => cy.request({
    method: 'DELETE',
    url: `http://localhost:8000/articles/${articleId}`,
    headers: { Authorization: 'any' },
});

declare global {
    namespace Cypress {
        interface Chainable {
            createArticle(article?: Article): Chainable<Article>;
            removeArticle(articleId: string): Chainable<void>;
        }
    }
}
