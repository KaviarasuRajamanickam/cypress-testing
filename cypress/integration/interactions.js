/// <reference types="Cypress" />

describe('Different types of page interactions', () => {
    beforeEach(() => {
        cy.visit('/example2');
    })

    it('Set the header text to item\'s text when clicked', () => {
        cy.get('[data-cy=clickedList] > :nth-child(2)').click()

        cy.get('[data-cy=click-value]')
            .invoke('text')
            .should('equal', 'Option two');

        cy.get('[data-cy=clickedList] > :nth-child(3)').click()

        cy.get('[data-cy=click-value]')
            .invoke('text')
            .should('equal', 'Option three');

    }) 

    it('Check the count of the checkbox checked', () => {
        cy.get('[data-cy=checkboxList] > :nth-child(2) input')
        .should('be.visible')
        .and('not.be.checked');

        cy.get('[data-cy=checkboxList] > :nth-child(2) input').check();

        cy.get('[data-cy=check-value]')
            .invoke('text')
            .should('equal', '1');

        cy.get('[data-cy=checkboxList] > :nth-child(4) input').check();

        cy.get('[data-cy=check-value]')
            .invoke('text')
            .should('equal', '2');
    })

    it('Set the header text to the radio item selected', () => {
        cy.get('[data-cy=radioboxList] > :nth-child(3) input').check();

        cy.get('[data-cy=radio-value]')
            .invoke('text')
            .should('equal', 'Option three');

        cy.get('[data-cy=radioboxList] > :nth-child(2) input').check();

        cy.get('[data-cy=radio-value]')
            .invoke('text')
            .should('equal', 'Option two');

        cy.get('[data-cy=radioboxList] > :nth-child(3) input')
            .should('be.visible')
            .and('not.be.checked');
    })

    it('Display the name of the selected option', () => {
        cy.get('[data-cy=selectDropdown]')
            .should('be.visible')
            .and('be.enabled')
            .select('Option three');

        cy.get('[data-cy=select-value]')
            .invoke('text')
            .should('equal','Option three')
    })

    it('Check the select dropdown enabled only if option two is selected', () => {
        cy.get('[data-cy=selectDropdownDisabled]')
            .should('be.visible')
            .and('not.be.enabled');

        cy.get('[data-cy=selectDropdown]')
            .select('Option two');

        cy.get('[data-cy=select-value]')
            .invoke('text')
            .should('equal','Option two')

        cy.get('[data-cy=selectDropdownDisabled]')
            .should('be.visible')
            .and('be.enabled');
        
    })

    it('Display the name of the mouse hovered option', () => {
        cy.get('[data-cy=mouseOver] > :nth-child(2)')
            .trigger('mouseover');

        cy.get('[data-cy=trigger-value]')
            .invoke('text')
            .should('equal', 'Option two')
    })
})