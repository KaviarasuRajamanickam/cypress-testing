describe('Test the title of the page', () => {
    it('Check the title have the correct text', () => {
        cy.visit('/');
        cy.get('[data-cy=page-title]')
            .invoke('text')
            .should('equal', 'Cypress Test Application');
    })
})