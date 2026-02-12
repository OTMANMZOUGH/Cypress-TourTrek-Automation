class SingUp {

    /**
     * Navigates to the signup modal from the home page
     */
    static openModal() {
        cy.get('#user-menu').click();
        cy.contains('Sign up').click();
    }

    /**
     * Standard signup flow using direct selection
     */
    static singUp(email: string, name: string, password: string) {
        cy.get('#email').type(email);
        cy.get('#name').type(name);
        cy.get('#password').type(password);
        cy.get('button').contains('Sign up').click();
    }

    /**
     * Keyboard-only signup flow simulating TAB navigation and ENTER submission
     * Requires 'cypress-plugin-tab' installed
     */
    static singUpWithKeyboard(email: string, name: string, password: string) {
        cy.get('#email').type(email).tab();
        cy.focused().should('have.attr', 'id', 'name').type(name).tab();
        cy.focused().should('have.attr', 'id', 'password').type(password + '{enter}');
    }

    /**
     * Assertion to verify the Registration modal transitioned to Login modal
     */
    static verifyRedirectToLogin() {
        cy.get('.rounded-t').should('have.text', 'Login');
    }
    static verifyNotRegister() {
        //cy.get('.rounded-t').should('have.text', 'Register');
        //cy.contains(': a client-side exception has occurred (see the browser console for more information).');
        cy.contains('Application error');
    }
    /**
     * Helper to clear and type or leave empty
     */
    static fillField(selector: string, value: string) {
        if (value === "") {
            cy.get(selector).clear();
        } else {
            cy.get(selector).clear().type(value);
        }
    }

    /**
     * Generic method to fill the form for negative testing
     */
    static fillForm(email: string, name: string, password: string) {
        this.fillField('#email', email);
        this.fillField('#name', name);
        this.fillField('#password', password);
        cy.get('button').contains('Sign up').click();
    }

    /**
     * 1. Validate leaving all fields empty
     * Checks for error messages and highlights
     */
    static verifyEmptyFieldsValidation() {
        cy.get('#email').should('have.class', 'border-rose-500');
        cy.get('#name').should('have.class', 'border-rose-500');
        cy.get('#password').should('have.class', 'border-rose-500');
    }

    /**
     * 2 & 3. Verify Email Validation
     */
    static verifyEmailError() {
        // Check for common error messages
        cy.get('body').then(($body) => {
            if ($body.text().includes('Invalid email')) {
                cy.contains('Invalid email').should('be.visible');
            } else {
                cy.get('#email').should('have.class', 'border-rose-500');
            }
        });
    }

    /**
     * 4. Verify Already registered email
     */
    static verifyExistingEmailError() {
        cy.contains('Email already exists', { timeout: 10000 }).should('be.visible');
    }

    /**
     * 6 & 7. Verify Name/Password validation errors
     */
    static verifyValidationError(message: string) {
        cy.contains(message).should('be.visible');
    }

}
export default SingUp;