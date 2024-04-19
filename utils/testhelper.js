import { faker } from '@faker-js/faker/locale/en';
import app from '../app.js';
const createUser = () => {
    const user = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
    return user;
};
const createBlog = () => {
    return {
        title: faker.commerce.productName(),
        body: faker.lorem.paragraphs(2),
        tags: faker.lorem.words(5),
        description: faker.lorem.sentence(),
    };
};

const mockServer = app.listen(3300);

export { createUser, mockServer, createBlog };
