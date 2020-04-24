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

## Built With

- [cypress.io](https://www.cypress.io/) framework used

## Licence

This project is licensed under the MIT License.
