describe('ReadRoute', () => {
    describe('Subscription Form', () => {
        beforeEach(() => {
            cy.visit('/read');
            cy.get('form[data-cy=subscribe]').as('subscribeForm');
            cy.get('@subscribeForm').scrollIntoView();
        });

        it('should show completion message for valid name & email', () => {
            cy.intercept('POST', '/api/subscribe', {
                statusCode: 201,
                body: {
                    status: 'success'
                }
            }).as('subscribe');
            cy.get('@subscribeForm').within(() => {
                cy.get('input[name=name]').type('Test');
                cy.get('input[name=email]').type('test@test.com');
                cy.get('button[type=submit]').click();
                cy.wait('@subscribe');
            });
            // Assert post subscribe UIs
            cy.get('form').should('not.exist');
            cy.get('[data-cy="post-subscribe-animation"]').should('exist');
            cy.get('[data-cy="post-subscribe-message"]').as('message').should('exist');
            cy.get('@message').should('contain.text', 'Thanks for subscribing!!');
            cy.reload();
            cy.get('form').should('exist');
        });

        it('should show error for empty of blank fields', () => {
            cy.intercept('POST', '/api/subscribe').as('subscribe');
            const data = [
                { name: undefined, email: undefined },
                { name: ' ', email: ' ' },
                { name: 'Test', email: undefined },
                { name: undefined, email: 'test@test.com' }
            ];
            Cypress._.forEach(data, ({ name, email }) => {
                cy.get('@subscribeForm').within(() => {
                    if (name) cy.get('input[name=name]').type(name);
                    if (email) cy.get('input[name=email]').type(email);
                    cy.get('button[type=submit]').click();
                    cy.wait('@subscribe');
                });
                cy.get('form').should('exist');
                // either of name-error or email-error should exist
                cy.get('[data-cy="name-error"], [data-cy="email-error"]').should('exist');
                cy.get('input[name=name]').clear();
                cy.get('input[name=email]').clear();
            });
        });

        it('should show error for invalid email', () => {
            cy.intercept('POST', '/api/subscribe').as('subscribe');
            cy.get('@subscribeForm').within(() => {
                cy.get('input[name=name]').type('Test');
                cy.get('input[name=email]').type('test.com');
                cy.get('button[type=submit]').click();
                cy.wait('@subscribe');
                cy.get('[data-cy="email-error"]').should('exist');
            });
        });

        it('should show form error', () => {
            cy.intercept('POST', '/api/subscribe', {
                statusCode: 400,
                body: {
                    status: 'error',
                    formError: 'Unknown error occurred.'
                }
            }).as('subscribe');
            cy.get('@subscribeForm').within(() => {
                cy.get('input[name=name]').type('Test');
                cy.get('input[name=email]').type('test@test.com');
                cy.get('button[type=submit]').click();
                cy.wait('@subscribe');
                cy.get('[data-cy="form-error"]').should('exist');
                cy.get('[data-cy="form-error"]').should('contain.text', 'Unknown error occurred.');
            });
        });
    });
});
