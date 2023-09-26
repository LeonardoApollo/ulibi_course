import { selectByTestId } from 'cypress/helpers/selectByTestId';

import { User } from '../../../src/entities/User';
import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localestorage';

export const login = (username: string, password: string) => cy.request({
    method: 'POST',
    url: 'http://localhost:8000/login',
    body: {
        username,
        password,
    },
}).then(({ body }) => {
    window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body));
    return body;
});

export const getbyTestId = (testId: string) => cy.get(selectByTestId(testId));

declare global {
    namespace Cypress {
        interface Chainable {
            login(username: string, password: string): Chainable<User>;
            getbyTestId(testId: string): Chainable<JQuery<HTMLElement>>;
        }
    }
}
