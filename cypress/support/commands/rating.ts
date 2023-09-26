export const setRating = (rating: number, feedback?: string) => {
    cy.getbyTestId(`StarRating.${rating}`).click();
    if (feedback) {
        cy.getbyTestId('RatingCard.Input').type(feedback);
        cy.getbyTestId('RatingCard.Send').click();
    } else {
        cy.getbyTestId('RatingCard.Close').click();
    }
};

declare global {
    namespace Cypress {
        interface Chainable {
            setRating(rating: number, feedback?: string): Chainable<void>;
        }
    }
}
