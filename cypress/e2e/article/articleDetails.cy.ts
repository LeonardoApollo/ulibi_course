let currentArticeId = '';
describe('User enters ArticleDetailsPage', () => {
    beforeEach(() => {
        cy.login('Cypress', '000');
        cy.createArticle().then((article) => {
            currentArticeId = article.id;
            cy.visit(`articles/${article.id}`);
        });
    });
    afterEach(() => {
        cy.removeArticle(currentArticeId);
    });
    it('ArticleDetailsPage is loaded', () => {
        cy.getbyTestId('ArticleDetailsPage').should('exist');
        cy.getbyTestId('ArticleDetails.Info').should('exist');
    });
    it('ArticleRecommendationList is loaded', () => {
        cy.getbyTestId('ArticleDetails.Rec').should('exist');
    });
    it('User adds new comment', () => {
        cy.getbyTestId('ArticleDetails.Info').should('exist');
        cy.getbyTestId('ArticleDetails.CommentForm').scrollIntoView();
        cy.addComment('text');
        cy.getbyTestId('ArticleDetails.Comment.text').should('exist');
    });
    // Пример пропуска теста
    it.skip('User rate article', () => {
        cy.getbyTestId('ArticleDetails.Info').should('exist');
        cy.getbyTestId('ArticleDetails.RatingCard').scrollIntoView();
        cy.setRating(5);
        cy.get('[data-selected=true]').should('have.length', 5);
    });
    // Пример использования фикстуры
    it('User rate article', () => {
        cy.intercept('GET', '**/articles/*', { fixture: 'articleDetails.json' });
        cy.getbyTestId('ArticleDetails.Info').should('exist');
        cy.getbyTestId('ArticleDetails.RatingCard').scrollIntoView();
        cy.setRating(5);
        cy.get('[data-selected=true]').should('have.length', 5);
    });
});
