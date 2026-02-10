import { faker } from '@faker-js/faker';

describe('Valid Sign Up spec with Faker', () => {

  beforeEach(function () {
    cy.visit('/')
    // On charge toujours la fixture au cas où on en a besoin pour le mot de passe
    cy.fixture('user').as('userData')
  })

  it('Sign up with random credentials using Faker', function () {
    // Génération des données aléatoires
    const randomName = faker.person.fullName();
    const randomEmail = faker.internet.email();
    const securePassword = this.userData.validUser.password; // On garde le MDP de la fixture

    cy.get('#user-menu').click();
    cy.contains('Sign up').click();
    cy.get('.rounded-t').should('have.text', 'Register');
    cy.get('#email').type(randomEmail);
    cy.get('#name').type(randomName);
    cy.get('#password').type(securePassword);
    cy.get('button').contains('Sign up').click();
    cy.get('.rounded-t').should('have.text', 'Login');

  })
})