# Cypress Testing
Learn how to set up a quick, and automatic JavaScript testing using Cypress.io

## Features include

- Writing your first test
- Selecting and aliasing elements
- Triggering actions

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

To test the cypress commands, you need a development application in your local machine.

- Download and use the below application to test the Cypress commands 
https://github.com/KaviarasuRajamanickam/cypress-dev


## Installation

- Hope you have installed `node`. if not, please [Download](https://nodejs.org/en/download/) from here and install

### Clone

- Clone this repo to your local machine using `git clone https://github.com/KaviarasuRajamanickam/cypress-testing`

### Setup

- If you want to run the run the application in your local machine:

> Install the npm package first

```shell
npm install
```

> Run the development application in the other side, once you did the setup in your local machine

```shell
npm start
```

> Change the `baseUrl` in `cypress.json` file depends upon your development application hostname. by default it was

```shell
"baseUrl": "http://localhost:3001/"
```

> To run the application

```shell
npx cypress open
```

- Now you can see the tests listed in the left side.
- To run the test files, simply click the test link to test with cypress

## Running the tests

### My first test
To check the title of the page is correct or not

```shell
cy.get('[data-cy=page-title]')
    .invoke('text')
    .should('equal', 'Cypress Test Application');
```

### Test max char input
- To check the number of characters remaining after typing the text in a textbox
- Used beforeEach hooks and aliasing elements in this test

```shell
beforeEach(() => {
    cy.visit('/example1');
    cy.get('[data-cy=charCount] > em').as('charLeft');
    cy.get('[data-cy=charInput]').as('charInput');
})

it('Check the remaining characters of the input', () => {
    cy.get('@charLeft')
        .invoke('text').should('equal', '8');
})
```

### Interactions
- To check the clicked elements and its visibility
- To Check the count of the checkboxes checked
- To Check the Radio button selected and not selected
- To check the value selected from the select dropdown
- Enable disabled dropdown while selecting a particular value
- To check the mouse over action using trigger

```shell
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
```

### Test student form
- To test CRUD functionalities are working properly in a form

```shell
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
    cy.get('@name').type('Test name')
    cy.get('@class').type('Test class')
    cy.get('@section').select('C')
    cy.get('@gender').select('Male')

    cy.get('.error').should('not.be', 'visible')

    cy.get('@addBtn').click()
})
```

### Test post
- To test CRUD operations in a post form

```shell
beforeEach(() => {
    cy.visit('/example4');
    
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
```

## Built With

- [cypress.io](https://www.cypress.io/) framework used

## Licence

This project is licensed under the MIT License.
