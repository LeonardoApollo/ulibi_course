describe('User enters ArticlesPage', () => {
    beforeEach(() => {
        cy.login('Cypress', '000').then(() => {
            cy.visit('articles');
        });
    });
    // Пример пропуска теста
    it.skip('ArticlesPage is loaded', () => {
        cy.getbyTestId('ArticlesList').should('exist');
        cy.getbyTestId('ArticlesListItem.GRID').should(
            'have.length.greaterThan',
            3,
        );
    });
    // Пример использования стаба(~фикстуры)
    it('ArticlesPage is loaded', () => {
        cy.intercept('GET', '**/articles?*', { fixture: 'articles.json' });
        cy.getbyTestId('ArticlesList').should('exist');
        cy.getbyTestId('ArticlesListItem.GRID').should(
            'have.length.greaterThan',
            3,
        );
    });
    it('Change view to LIST', () => {
        cy.getbyTestId('ArticlesFilter.view.LIST').click();
        cy.getbyTestId('ArticlesListItem.LIST').should(
            'have.length.greaterThan',
            3,
        );
    });
    it('Change tabs to ECONOMIC', () => {
        cy.getbyTestId('ArtilesFilter.tabs.ECONOMIC').click();
        cy.getbyTestId('ArticlesListItem.GRID').should('have.length', 6);
    });
    it('Change tabs to SCIENCE', () => {
        cy.getbyTestId('ArtilesFilter.tabs.SCIENCE').click();
        cy.getbyTestId('ArticlesListItem.GRID').should('have.length', 7);
    });
    it('Change order to desc', () => {
        const expectedUrl =
            'http://localhost:3000/articles?sort=createdAt&order=desc&search=&type=ALL';
        cy.getbyTestId('ArtilesFilter.order').select('desc');
        cy.getbyTestId('ArtilesFilter.order').should('have.value', 'desc');
        cy.location().should((location) => {
            expect(location.href).to.eq(expectedUrl);
        });
    });
    it('Change sort to views', () => {
        const expectedUrl =
            'http://localhost:3000/articles?sort=views&order=asc&search=&type=ALL';
        cy.getbyTestId('ArtilesFilter.sort').select('views');
        cy.getbyTestId('ArtilesFilter.sort').should('have.value', 'views');
        cy.location().should((location) => {
            expect(location.href).to.eq(expectedUrl);
        });
    });
    it('Change search to Rust', () => {
        cy.getbyTestId('ArtilesFilter.search').clear().type('Rust');
        cy.getbyTestId('ArticlesListItem.GRID').should(
            'have.length.at.least',
            1,
        );
    });
});
