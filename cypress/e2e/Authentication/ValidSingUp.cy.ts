import SingUp from "../../support/PageObjects/SingUp";
import UserFactory from "../../support/factories/UserFactory";

describe('Valid Sign Up spec', () => {

  beforeEach(function () {
    cy.visit('/')
    // Loading fixture for static data like the global password
    cy.fixture('user').as('userData')
  })

 it('1. Sign up with random credentials using Faker', function () {
   // Data generation via Factory
   const user = UserFactory.generateSimpleUser();
   const password = this.userData.validUser.password;

   // Save email in Cypress environment for potential reuse in Login tests
   Cypress.env('lastCreatedUserEmail', user.email);

   SingUp.openModal();
   SingUp.singUp(user.email, user.name, password);
   SingUp.verifyRedirectToLogin();
 })

 it('2. Should register with complex email (dots/plus)', function () {
   const user = UserFactory.generateComplexUser();

   SingUp.openModal();
   SingUp.singUp(user.email, user.name, this.userData.validUser.password);
   SingUp.verifyRedirectToLogin();
 });

 it('3. Should register with accented characters', function () {
   const user = UserFactory.generateAccentedUser();

   SingUp.openModal();
   SingUp.singUp(user.email, user.name, this.userData.validUser.password);
   SingUp.verifyRedirectToLogin();
 });

 it('5. Should register with short name (Yu)', function () {
   const user = UserFactory.generateShortNameUser();

   SingUp.openModal();
   SingUp.singUp(user.email, user.name, this.userData.validUser.password);
   SingUp.verifyRedirectToLogin();
 });

 it('6. Validate Sign up using keyboard only', function () {
   const user = UserFactory.generateSimpleUser();

   SingUp.openModal();
   // Use the specialized keyboard method from our Page Object
   SingUp.singUpWithKeyboard(user.email, user.name, this.userData.validUser.password);
   SingUp.verifyRedirectToLogin();
 });

 it('7. Multiple users sign up with different valid emails', function () {
   // Register User A
   const userA = UserFactory.generateSimpleUser();
   SingUp.openModal();
   SingUp.singUp(userA.email, userA.name, this.userData.validUser.password);
   SingUp.verifyRedirectToLogin();

   // Reset or navigate back to start session for User B With email from user A
   cy.visit('/');
   const userB = UserFactory.generateComplexUser();
   SingUp.openModal();
   SingUp.singUp(userA.email, userB.name, this.userData.validUser.password);
   SingUp.verifyNotRegister();
 });

 it('8. Validate Sign up via Sign Up button', function () {
   const user = UserFactory.generateSimpleUser();

   SingUp.openModal();
   SingUp.singUp(user.email, user.name, this.userData.validUser.password);
   SingUp.verifyRedirectToLogin();
 });

})