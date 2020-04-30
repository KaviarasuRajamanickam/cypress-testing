describe('End to end test the student form', () => {
    beforeEach(() => {
        cy.visit('/example3');
        cy.get('input[name="name"]').as('name')
        cy.get('input[name="class"]').as('class')
        cy.get('select[name="section"]').as('section')
        cy.get('select[name="gender"]').as('gender')
        cy.get('[data-cy="add-student"]').as('addBtn')
        cy.get('[data-cy="cancel-student"]').as('cancelBtn')
        
    })

    it('Check the data entered are updated to the table correctly', () => {

        cy.get('.studentForm form > .form-input').should('not.have.class', 'error')

        cy.get('@name').type('Test name')
        cy.get('@class').type('Test class')
        cy.get('@section').select('C')
        cy.get('@gender').select('Male')

        cy.get('.error').should('not.be', 'visible')

        cy.get('@addBtn').click()

        cy.get('.no-record').should('not.be','visible')

        cy.get('.records table tr:nth-child(1) > td.name')
            .invoke('text')
            .should('be', 'Test name')
        cy.get('.records table tr:nth-child(1) > td.class')
            .invoke('text')
            .should('be', 'Test class')
        cy.get('.records table tr:nth-child(1) > td.section')
            .invoke('text')
            .should('be', 'C')
        cy.get('.records table tr:nth-child(1) > td.gender')
            .invoke('text')
            .should('be', 'Male')

    })
    it('Check the data entered are cleared when clicking the clear button', () => {

        cy.get('@name').type('Test name')
        cy.get('@class').type('Test class')
        cy.get('@section').select('C')
        cy.get('@gender').select('Male')

        cy.get('@cancelBtn').click()

        cy.get('@name').should('have.value','')
        cy.get('@class').should('have.value','')
        cy.get('@section').should('have.value', null)
        cy.get('@gender').should('have.value', null)

        cy.get('.error').should('not.be', 'visible')

    })
    it('Should not allowed to add student until all the fields are entered', () => {

        cy.get('@name').type('Test name')
        cy.get('@addBtn').click()
        cy.get('.error').should('be', 'visible')
        cy.get('.no-record').invoke('text').should('be','visible').should('be','No record found')

        cy.get('@class').type('Test class')
        cy.get('@addBtn').click()
        cy.get('.error').should('be', 'visible')
        cy.get('.no-record').invoke('text').should('be','visible').should('be','No record found')

        cy.get('@section').select('C')
        cy.get('@addBtn').click()
        cy.get('.error').should('be', 'visible')
        cy.get('.no-record').invoke('text').should('be','visible').should('be','No record found')

        cy.get('@gender').select('Male')
        cy.get('@addBtn').click()
        cy.get('.error').should('not.be', 'visible')
        cy.get('.no-record').should('not.be','visible')

    })
    it('Should allowed to edit the datas when edit button is clicked', () => {

        cy.get('@name').type('Test name1')
        cy.get('@class').type('Test class1')
        cy.get('@section').select('C')
        cy.get('@gender').select('Male')

        cy.get('@addBtn').click()

        cy.get('@name').type('Test name2')
        cy.get('@class').type('Test class2')
        cy.get('@section').select('B')
        cy.get('@gender').select('Female')

        cy.get('@addBtn').click()

        cy.get('.records table tr:nth-child(2) [data-cy="editbtn"]').click()

        cy.get('.records table tr:nth-child(2) [data-cy="editbtn"]').should('not.be','visible')        
        cy.get('.records table tr:nth-child(2) [data-cy="deletebtn"]').should('not.be','visible')

        cy.get('.records table tr:nth-child(2) [data-cy="updatebtn"]').should('be','visible')
        cy.get('.records table tr:nth-child(2) [data-cy="cancelbtn"]').should('be','visible')

        cy.get('.records table tr:nth-child(2) td.name input').type(' edited')
        cy.get('.records table tr:nth-child(2) td.gender select').select('Male')

        cy.get('.records table tr:nth-child(2) [data-cy="cancelbtn"]').click()

        cy.get('.records table tr:nth-child(2) > td.name')
            .invoke('text')
            .should('be', 'Test name2')
        cy.get('.records table tr:nth-child(2) > td.gender')
            .invoke('text')
            .should('be', 'Female')

        cy.get('.records table tr:nth-child(2) [data-cy="editbtn"]').click()

        cy.get('.records table tr:nth-child(2) td.name input').type(' edited')
        cy.get('.records table tr:nth-child(2) td.gender select').select('Male')

        cy.get('.records table tr:nth-child(2) [data-cy="updatebtn"]').click()

        cy.get('.records table tr:nth-child(2) > td.name')
            .invoke('text')
            .should('be', 'Test name2 edited')
        cy.get('.records table tr:nth-child(2) > td.gender')
            .invoke('text')
            .should('be', 'Male')
        
    })

    it('Delete the appropriate record when clicking the delete button ', () => {

        cy.get('@name').type('Test name1')
        cy.get('@class').type('Test class1')
        cy.get('@section').select('C')
        cy.get('@gender').select('Male')

        cy.get('@addBtn').click()

        cy.get('@name').type('Test name2')
        cy.get('@class').type('Test class2')
        cy.get('@section').select('B')
        cy.get('@gender').select('Female')

        cy.get('@addBtn').click()

        cy.get('.records table tr:nth-child(2) [data-cy="deletebtn"]').click()

        cy.get('.modal').should('be','visible')

        cy.get('[data-cy="deleteCancelbtn"]').click()
        cy.get('.records table tbody tr:nth-child(2)').should('be','visible')
        cy.get('.records table tbody tr').should('have.length',2)

        cy.get('.records table tr:nth-child(2) [data-cy="deletebtn"]').click()

        cy.get('.modal').should('be','visible')

        cy.get('[data-cy="deleteConfirmbtn"]').click()
        cy.get('.records table tbody tr:nth-child(2)').should('not.be','visible')
        cy.get('.records table tbody tr').should('have.length',1)

    })

})