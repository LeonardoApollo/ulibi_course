export const addComment = (comment: string) => {
    cy.getbyTestId('ArticleDetails.CommentForm.Input').type(comment);
    cy.getbyTestId('ArticleDetails.CommentForm.Send').click();
};

declare global {
    namespace Cypress {
        interface Chainable {
            addComment(comment: string): Chainable<void>;
        }
    }
}
