class Filter {
    // Helper to get day number from a date object
    private static getDayNumber(date: Date): string {
        return date.getDate().toString();
    }

    static openFilters() {
        cy.get('.cursor-pointer').contains('Anywhere').click();
    }

    static selectCountry(country: string) {
        cy.contains('Where do you wanna go?').should('be.visible');

        // 1. Click the placeholder. Use {force: true} because react-select
        // often has an invisible input overlaying the text.
        cy.get('#react-select-2-placeholder').click({ force: true });

        // 2. Type the country. React-select usually puts the focus
        // into the correct internal input automatically after the click.
        // If it doesn't, we target the input directly.
        cy.get('input').filter(':visible').first().type(country, { delay: 100 });

        // 3. Select the result from the dropdown list.
        // Using a generic 'option' search or finding the specific text.
        cy.get('[id^="react-select-2-option"]').contains(country).click();
    }

    static clickNext() {
        cy.contains('button', 'Next').click();
    }

    static clickSearch() {
        cy.contains('button', 'Search').click();
    }

    static selectDates() {
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);
        // Select Today
        cy.get('.rdrDay').contains(this.getDayNumber(today)).click();
        // Select 7 days from now
        cy.get('.rdrDay').contains(this.getDayNumber(nextWeek)).click();
    }

    static selectLongDateRange() {
        cy.get('.rdrDayToday').click();
        cy.get('rdrNextButton').last().click();
        cy.get('.rdrDay').contains('25').click();
    }

    static selectGuests() {
        // Selects the first "+" button on the page
        cy.get('.rounded-full').eq(1).click();
    }
}

export default Filter;