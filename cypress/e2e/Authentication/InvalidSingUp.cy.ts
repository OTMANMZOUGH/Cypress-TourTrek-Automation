describe('User Sign Up Flow - Tour Trek', () => {

  beforeEach(function () {
    cy.visit('/');
    cy.fixture('user').as('userData')
  });

})