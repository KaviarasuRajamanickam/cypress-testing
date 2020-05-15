describe('End to end test the post datas', () => {
    beforeEach(() => {
        cy.visit('/example4')
    })

    it('Should not allowed to add new post, if the all fields are empty', () => {
        
        cy.get('[data-cy="add-post"]').click();        
        cy.get('[data-cy="post-error"]').should('be', 'visible');

        cy.get('[data-cy="post-title"]').type('Post title1');        
        cy.get('[data-cy="add-post"]').click();
        cy.get('[data-cy="post-error"]').should('be', 'visible');

        cy.get('[data-cy="post-title"]').clear();
        cy.get('[data-cy="post-desc"]').type('Post description1');
        cy.get('[data-cy="add-post"]').click();
        cy.get('[data-cy="post-error"]').should('be', 'visible');

    })

    it('Should add new post, if the all fields are filled', () => {

        cy.get('[data-cy="post-title"]').type('Post title1');
        cy.get('[data-cy="post-desc"]').type('Post description1');

        cy.get('[data-cy="add-post"]').click();
        cy.get('[data-cy="post-error"]').should('not.be', 'visible');

        cy.get('[data-cy="post-title"]')
            .invoke('text')
            .should('be', '');
        cy.get('[data-cy="post-desc"]')
            .invoke('text')
            .should('be', '');

        cy.get('.postWrapper').eq(0).get('h3')
            .invoke('text')
            .should('be','Post title1');

        cy.get('.postWrapper').eq(0).get('p')
            .invoke('text')
            .should('be','Post description1');

    })

    it('Should update the post after it gets edited', () => {

        cy.get('[data-cy="post-title"]').type('Post title1');
        cy.get('[data-cy="post-desc"]').type('Post description1');

        cy.get('[data-cy="add-post"]').click();
        cy.get('[data-cy="post-error"]').should('not.be', 'visible');

        cy.get('[data-cy="post-title"]').type('Post title2');
        cy.get('[data-cy="post-desc"]').type('Post description2');

        cy.get('[data-cy="add-post"]').click();
        cy.get('[data-cy="post-error"]').should('not.be', 'visible');

        cy.get('[data-cy="post-title"]').type('Post title3');
        cy.get('[data-cy="post-desc"]').type('Post description3');

        cy.get('[data-cy="add-post"]').click();
        cy.get('[data-cy="post-error"]').should('not.be', 'visible');

        cy.get('.postWrapper').eq(1).find('[data-cy=edit-post]').click()

        cy.get('.modal').should('be', 'visible');

        cy.get('[data-cy="edit-title"]').type(' edited');

        cy.get('[data-cy="update-post"]').click();

        cy.get('.postWrapper').eq(1).find('h3')
            .invoke('text')
            .should('be', 'Post title1 edited');
    })

})