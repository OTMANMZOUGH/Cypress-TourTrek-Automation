import Filter from "../support/PageObjects/Filter";

describe('Filter and Search Functionality', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('1. Verify that the user can apply the filter using only country', () => {
        Filter.openFilters();
        // 1.2 Select Morocco
        Filter.selectCountry('Morocco');

        // Skip through other steps without selecting (if the app allows)
        Filter.clickNext(); // Date step
        Filter.clickNext(); // Info step
        Filter.clickSearch();

        // 1.1 Assert results match selected country
        cy.get('.group').should('contain.text', 'Morocco');
    });

    it('2. Filter Without Selecting Country', () => {
        Filter.openFilters();
        // 2.2 Do not select country, click Next
        Filter.clickNext();
        Filter.selectDates();
        Filter.clickNext();
        Filter.clickSearch();
    });

    it('3. Filter Using All Information (Country + Date + More Info)', () => {
        Filter.openFilters();
        // 3.2 Select Country
        Filter.selectCountry('Morocco');
        Filter.clickNext();

        // 3.3 Select valid date
        Filter.selectDates();
        Filter.clickNext();

        // 3.4 Select valid information
        Filter.selectGuests();
        Filter.clickSearch();

        // 3.1 Assertion: Results match criteria
        cy.get('.group').should('be.visible');
        cy.url().should('include', 'locationValue=MA');
    });

    it('4. Verify reservation is allowed within the maximum day limit', () => {
        Filter.openFilters();
        Filter.selectCountry('Morocco');
        Filter.clickNext();

        // 4.3 Select a Date Range of 40 Days
        Filter.selectLongDateRange();

        // 4.1 Assertion: System rejects or blocks the search
        // Adjust this based on how your app shows errors (Toast, text, or disabled button)
        cy.contains('exceeds maximum allowed duration').should('be.visible');
        Filter.clickSearch();
        cy.url().should('not.include', 'startDate');
    });
});