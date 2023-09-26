let profileId = '';

describe('User enters ProfilePage', () => {
    beforeEach(() => {
        cy.visit('');
        cy.login('Cypress', '000').then((data) => {
            profileId = data.id;
            cy.visit(`profile/${data.id}`);
        });
    });
    afterEach(() => {
        cy.resetProfile(profileId);
    });
    it('ProfilePage is loaded', () => {
        cy.getbyTestId('ProfileCard.firstname').should('have.value', 'Cypress');
    });
    it('Editing ProfileCard', () => {
        cy.updateProfile('new firstname', 'new lastname');
        cy.getbyTestId('ProfileCard.firstname').should('have.value', 'new firstname');
        cy.getbyTestId('ProfileCard.lastname').should('have.value', 'new lastname');
    });
});
