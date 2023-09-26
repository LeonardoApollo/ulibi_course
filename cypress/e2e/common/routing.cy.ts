import { selectByTestId } from 'cypress/helpers/selectByTestId';

describe('Routing', () => {
    describe('User is NOT Authorized', () => {
        it('To MainPage', () => {
            cy.visit('/');
            cy.get(selectByTestId('MainPage')).should('exist');
        });
        it('To ProfilePage', () => {
            cy.visit('/profile/1');
            cy.get(selectByTestId('MainPage')).should('exist');
        });
        it('To NotFoundPage', () => {
            cy.visit('/loremIpsum');
            cy.get(selectByTestId('NotFoundPage')).should('exist');
        });
    });
    describe('User IS Authorized', () => {
        beforeEach(() => {
            cy.login('Cypress', '000');
        });
        it('To ProfilePage', () => {
            cy.visit('/profile/1');
            cy.get(selectByTestId('ProfilePage')).should('exist');
        });
        it('To ArticlesPage', () => {
            cy.visit('/articles');
            cy.get(selectByTestId('ArticlesPage')).should('exist');
        });
    });
});
