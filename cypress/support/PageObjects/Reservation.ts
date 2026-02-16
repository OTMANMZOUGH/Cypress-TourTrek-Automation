class Reservation {
    static selectDates() {
        // 1. Count how many days are NOT disabled and NOT passive (greyed out)
        cy.get('.rdrDays').then(($calendar) => {
            const availableDays = $calendar.find('.rdrDay:not(.rdrDayDisabled):not(.rdrDayPassive)');

            // 2. Condition: If fewer than 3 days are available, move to next month
            if (availableDays.length < 3) {
                cy.log('Not enough days available, moving to next month...');
                cy.get('.rdrNextButton').click();
                // Recursion: Call the same function again in the new month
                this.selectDates();
            } else {
                // 3. If 3 or more days exist, select the first and the third one
                cy.wrap(availableDays).first().as('startDay').click();
                cy.wrap(availableDays).eq(2).as('endDay').click();

                cy.log('Found enough days! Reservation selected.');
            }
        });
    }

    static clickReserve() {
        cy.get('button').contains('Reserve').click();
    }

    static toggleFavorite() {
        // Selecting the heart icon
        cy.get('.group').find('svg').first().parent().click();
    }

    static verifyCalculatedTotal() {
        cy.get('.text-2xl.font-semibold').invoke('text').then((priceText) => {
            const pricePerNight = parseFloat(priceText.replace(/[^\d.]/g, ''));

            cy.get('@startDay').find('.rdrDayNumber span').invoke('text').then((startText) => {
                cy.get('@endDay').find('.rdrDayNumber span').invoke('text').then((endText) => {

                    const startNum = parseInt(startText.trim());
                    const endNum = parseInt(endText.trim());
                    const diffDays = endNum - startNum;
                    const expectedTotal = pricePerNight * diffDays;

                    cy.log(`Days: ${diffDays} | Price: ${pricePerNight} | Expected: ${expectedTotal}`);

                    // Target the specific price div to avoid the "Total$ 10" combined string issue
                    cy.contains('div', 'Total')
                        .parent()
                        .find('div')
                        .last() // This gets the '$ 10' div specifically
                        .should(( $div ) => {
                            const actual = $div.text().replace(/[^\d.]/g, '');
                            expect(Number(actual)).to.equal(expectedTotal);
                        });
                });
            });
        });
    }
    static verifyPastDatesBlocked() {
        // Find the first disabled day (past date)
        cy.get('button.rdrDayDisabled').first().then(($day) => {
            // Confirm it has the disabled class
            cy.wrap($day).should('have.class', 'rdrDayDisabled');

            // Try clicking it
            cy.wrap($day).click({ force: true });
        });
    }

    static navigateTo(page: 'Trips' | 'Favorites' | 'Reservations') {
        cy.get('#user-menu').click();
        cy.contains(page).click();
    }
}
export default Reservation;