class Login {
    static openModal() {
        cy.get('#user-menu').click();
        cy.contains('Login').click();
    }

    static login(email: string, password: string) {
        if (email) cy.get('#email').type(email);
        if (password) cy.get('#password').type(password);
        cy.get('button').contains('Login').click();
    }

    static loginWithEnter(email: string, pass: string) {
        cy.get('#email').type(email);
        cy.get('#password').type(pass + '{enter}');
    }

    static verifyHome() {
        cy.url().should('include', '/');
        cy.get('.rounded-full').should('be.visible');
    }

    static verifyErrorMessage(msg: string) {
        cy.contains(msg).should('be.visible');
    }
    static verifyFillederror() {
            cy.get('#email').should('have.class', 'border-rose-500');
            cy.get('#password').should('have.class', 'border-rose-500');
    }
}
export default Login;