Cypress.Commands.add('login', (username, password) => {
  cy.visit('https://parabank.parasoft.com/parabank/index.htm');
  cy.get('[name="username"]').type(username);
  cy.get('[name="password"]').type(password);
  cy.get('input[value="Log In"]').click();
  cy.get('#leftPanel .smallText')
    .should('contain.text', 'Welcome')
    .and('contain.text', ' John Smith');
});
