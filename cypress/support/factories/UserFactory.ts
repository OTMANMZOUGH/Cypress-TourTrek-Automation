import { faker } from '@faker-js/faker';

export default class UserFactory {

    /**
     * 1. Basic User: Standard email and full name
     */
    static generateSimpleUser() {
        return {
            email: faker.internet.email().toLowerCase(),
            name: faker.person.fullName()
        };
    }

    /**
     * 2. Complex User: Email formatted with dots and plus signs
     */
    static generateComplexUser() {
        const firstName = faker.person.firstName().toLowerCase();
        const lastName = faker.person.lastName().toLowerCase();
        return {
            email: `${firstName}.${lastName}+test${faker.number.int()}@gmail.com`,
            name: `${firstName} ${lastName}`
        };
    }

    /**
     * 3. Accented User: Specifically testing international character support
     */
    static generateAccentedUser() {
        return {
            email: faker.internet.email().toLowerCase(),
            name: "José Álvarez"
        };
    }

    /**
     * 4. Short Name User: Testing minimum character length constraints
     */
    static generateShortNameUser() {
        return {
            email: faker.internet.email().toLowerCase(),
            name: "Yu"
        };
    }
}