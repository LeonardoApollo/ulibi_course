export const updateProfile = (firstname?: string, lastname?: string) => {
    cy.getbyTestId('EditableProfileCardHeader.EditButton').click();
    if (firstname) {
        cy.getbyTestId('ProfileCard.firstname').clear().type(firstname);
    }
    if (lastname) {
        cy.getbyTestId('ProfileCard.lastname').clear().type(lastname);
    }
    cy.getbyTestId('EditableProfileCardHeader.SaveButton').click();
};

export const resetProfile = (profileId: string) => cy.request({
    method: 'PUT',
    url: `http://localhost:8000/profile/${profileId}`,
    headers: { Authorization: 'any' },
    body: {
        id: '4',
        firstname: 'Cypress',
        lastname: 'Test',
        age: 100500,
        currency: 'USD',
        country: 'Kazakhstan',
        city: 'Internet',
        username: 'Cypress',
        // eslint-disable-next-line
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa3xJHuQ_yC7x2ia0Mgs02sAeK_i4jwR4ipg&usqp=CAU',
    },
});

declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(firstname?: string, lastname?: string): Chainable<void>;
            resetProfile(profileId: string): Chainable<void>;
        }
    }
}
