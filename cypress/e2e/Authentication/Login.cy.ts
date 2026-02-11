describe('Login spec', () => {
  beforeEach(function () {
    cy.fixture('user').as('userData')
  })

  it('Login with valid credentials', function () {
    cy.visit('/')
    // Example usage:
    // cy.get('input[name="email"]').type(this.userData.validUser.email)
    // cy.get('input[name="password"]').type(this.userData.validUser.password)
  })
})