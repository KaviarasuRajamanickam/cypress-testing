describe('Test the input with characters remaining', () => {
    beforeEach(() => {
        cy.visit('/example1');
        cy.get('[data-cy=charCount] > em').as('charLeft');
        cy.get('[data-cy=charInput]').as('charInput');
    })

    it('Check the remaining characters of the input', () => {
        cy.get('@charLeft')
            .invoke('text')
            .should('equal', '15');

        cy.get('@charInput')
            .should('be.visible')
            .and('be.enabled')
            .type('Welcome');

        cy.get('@charLeft')
            .invoke('text').should('equal', '8');

        cy.get('@charInput')
            .should('be.visible')
            .and('be.enabled')
            .type(' Friend');

        cy.get('@charLeft')
            .invoke('text')
            .should('equal', '1');
    })

    it('Prevents typing more characters if the limit exceeded', () => {
        cy.get('@charInput')
            .should('be.visible')
            .and('be.enabled')
            .type('abcdefghijklmnopqrst');

        cy.get('@charInput')
            .should('have.attr', 'value', 'abcdefghijklmno');

        cy.get('@charLeft')
            .invoke('text')
            .should('equal', '0');
    })
})