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
        // Type and move to next field using Tab
        cy.get('#email').type(email).tab();
        // Verify focus moved correctly, type, and Tab again
        cy.focused().should('have.attr', 'id', 'name').type(name).tab();
        // Type password and submit form using Enter key
        cy.focused().should('have.attr', 'id', 'password').type(password + '{enter}');
    }

    /**
     * Assertion to verify the Registration modal transitioned to Login modal
     */
    static verifyRedirectToLogin() {
        cy.get('.rounded-t').should('have.text', 'Login');
    }
}

export default SingUp;