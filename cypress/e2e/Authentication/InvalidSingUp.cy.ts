
import { faker } from '@faker-js/faker';
import SingUp from "../../support/PageObjects/SingUp";

describe('Negative Testing: Invalid Sign Up Scenarios', () => {

  beforeEach(() => {
    cy.visit('/');
    SingUp.openModal();
  });

  it('1. Validate leaving all fields empty', () => {
    // 1.2 Leaving all fields empty and 1.3 submitting
    SingUp.fillForm("", "", "");
    SingUp.verifyEmptyFieldsValidation();
  });

  it('2. Verify adding an Email With Invalid email format', () => {
    // 2.2 Provide invalid email format "user@com"
    SingUp.fillForm("user@com", faker.person.fullName(), "Password123!");
    // 2.1 Assertions
    SingUp.verifyEmailError();
  });

  it('3. Verify providing Email without "@"', () => {
    // 3.2 Provide invalid email without "@"
    SingUp.fillForm("usernocom", faker.person.fullName(), "Password123!");

    // 3.1 Assertions
    SingUp.verifyEmailError();
  });

  it('4. Verify providing Already registered email', () => {
    // 5.2 Use a known email (ensure this exists in your test DB)
    const existingEmail = "test@example.com";
    SingUp.fillForm(existingEmail, faker.person.fullName(), "Password123!");

    // 5.1 Assertion
    SingUp.verifyExistingEmailError();
  });

  it('6. Verify providing Password with only spaces', () => {
    // 6.2 Provide Password with only spaces
    SingUp.fillForm(faker.internet.email(), faker.person.fullName(), "     ");

    // 6.1 Assertion
    SingUp.verifyValidationError("Password invalid");
  });

  it('7.1 Verify providing Name with special characters only', () => {
    // 7.2 Provide Name with special characters only
    SingUp.fillForm(faker.internet.email(), "@#$%^&*", "Password123!");

    // 7.1 Assertion
    SingUp.verifyValidationError("Name validation error");
  });

  it('7.2 Verify providing Name exceeds maximum length', () => {
    // 7.2 Provide Name exceeds maximum length (e.g., 256 chars)
    const longName = "a".repeat(256);
    SingUp.fillForm(faker.internet.email(), longName, "Password123!");

    // 7.1 Assertion
    SingUp.verifyValidationError("Max length validation error");
  });

  it('7.3 Verify providing Name with only numbers', () => {
    // 7.2 Provide Name with only numbers "12345"
    SingUp.fillForm(faker.internet.email(), "12345", "Password123!");

    // 7.1 Assertion
    SingUp.verifyValidationError("Name validation error");
  });
});