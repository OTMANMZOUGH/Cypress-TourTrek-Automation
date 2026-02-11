import 'cypress';

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Enables the .tab() command
             */
            tab(options?: { shift: boolean }): Chainable<Element>;
        }
    }
}