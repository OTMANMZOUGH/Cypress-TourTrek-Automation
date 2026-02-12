import Login from "../../support/PageObjects/Login";

describe('Login Test Suite', () => {

  let validEmail: string;
  let validPassword: string;

  beforeEach(function () {

    cy.fixture('user').then((data) => {
      validPassword = data.validUser.password;
    });

    validEmail = Cypress.env('lastCreatedUserEmail') || 'test@example.com';

    cy.visit('/');
    Login.openModal();
  });

  it('1. Login with valid email and password', () => {
    Login.login(validEmail, validPassword);
    Login.verifyHome();
  });

  it('2. Verify Password masking', () => {
    cy.get('#password').type('Secret123');
    cy.get('#password').should('have.attr', 'type', 'password');
  });

  it('3. Verify Login using Enter key', () => {
    Login.loginWithEnter(validEmail, validPassword);
    Login.verifyHome();
  });

  it('4. Login with invalid email format', () => {
      Login.login('invalid-format.com', validPassword);
      Login.verifyErrorMessage('Invalid credentials');
      cy.url().should('not.include', '/dashboard');
  });

  it('5. Login with empty fields', () => {
      cy.get('button').contains('Login').click();
      Login.verifyFillederror();
  });

  it('6. SQL injection attempt', () => {
      const sqlInjection = "' OR '1'='1";
      Login.login(sqlInjection, sqlInjection);
      Login.verifyErrorMessage('Invalid credentials');
  });

});