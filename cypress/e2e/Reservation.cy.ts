import Login from '../support/PageObjects/Login';
import Reservation from "../support/PageObjects/Reservation";

describe('Reservation and Favorites Suite', () => {

    context('Prereq: User is logged in', () => {
        beforeEach(() => {
            cy.visit('/');
            // Log in using environment variables from previous steps
            Login.openModal();
            Login.login(Cypress.env('lastCreatedUserEmail'), 'Password123!');
            // Open the first available listing
           cy.wait(4000);
        });


        it('1, 2, 3. Verify successful reservation and redirection', () => {
            Reservation.selectDates();
            Reservation.clickReserve();
            cy.contains('Listing reserved!').should('be.visible');
        });

        it('Verify reservation price for a 2-night stay', () => {

            Reservation.selectDates();
            Reservation.verifyCalculatedTotal();
            Reservation.clickReserve();
        });

        it('Test Case 5: Verify past dates cannot be selected', () => {
            Reservation.verifyPastDatesBlocked();
        });

        it('8, 9, 10. Verify Favorites functionality and persistence', () => {
            // 8.2 Click Heart
            Reservation.toggleFavorite();
            cy.get('svg').should('have.class', 'fill-rose-500'); // Assuming red when active

            // 10.1 Refresh page
            cy.reload();
            cy.get('svg').should('have.class', 'fill-rose-500');

            // 9.2 Click Heart again to remove
            Reservation.toggleFavorite();
            cy.get('svg').should('have.class', 'fill-neutral-500/70');
        });

        it('12. Verify favorite listing appears in Favorites page', () => {
            Reservation.toggleFavorite();
            Reservation.navigateTo('My favorites');
            cy.get('.listing-card').should('have.length.at.least', 1);
        });
    });

    context('Prereq: User is not logged in', () => {
        beforeEach(() => {
            cy.visit('/');
            cy.get('.listing-card').first().click();
        });

        it('6. Verify login is required for reservation', () => {
            // 6.2 Click Reserve while logged out
            Reservation.clickReserve();
            // Assertion: Login modal pops up
            cy.contains('Login').should('be.visible');
        });

        it('7. Verify login is required to add favorites', () => {
            // 7.2 Click Heart
            Reservation.toggleFavorite();
            // Assertion: Redirected or Modal shown
            cy.contains('Login').should('be.visible');
        });
    });
});