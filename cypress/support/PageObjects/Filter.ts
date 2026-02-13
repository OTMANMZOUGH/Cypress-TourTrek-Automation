class Filter {
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
        // Logic to select a valid date range on the calendar
        // Selecting today and 5 days from now as a default valid range
        cy.get('.rdrDayToday').click();
        cy.get('.rdrDay').contains('25').click();
    }

    static selectLongDateRange() {
        // Logic to select a range exceeding 30-40 days
        // This usually involves clicking the 'Next Month' arrow
        cy.get('[aria-label="Next Month"]').click();
        cy.get('.rdrDay').contains('28').click();
    }

    static selectGuests() {
        // Adding 1 guest/info to satisfy "More Info" step
        cy.get('gap-4').find('button').last().click();
    }
}

export default Filter;