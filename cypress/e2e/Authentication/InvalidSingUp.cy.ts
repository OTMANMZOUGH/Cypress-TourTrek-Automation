describe('User Sign Up Flow - Tour Trek', () => {

  beforeEach(() => {
    cy.visit('/');
  });
  it('1. Validate sign up with valid email address', () => {
    cy.get('#user-menu').click();
    cy.contains('Sign up').click();
    cy.get('.rounded-t').should('have.text', 'Register');

  });
})