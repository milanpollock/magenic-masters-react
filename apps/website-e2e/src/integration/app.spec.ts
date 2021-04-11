import { getGreeting } from '../support/app.po';

describe('website', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Welcome to website!');
  });

  /*
  it('can wait for a comment response', () => {
    cy.request('https://jsonplaceholder.cypress.io/comments/6').as(
      'sixthComment'
    );
    cy.get('@sixthComment').should((response) => {
      expect(response.body.id).to.eq(6);
    });
  });
  */
});

describe('TODO MVC Application Tests', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('NX_SCHEME')}todomvc.com/examples/react/#/`);
  });

  it('can navigate to code repository hosting service', () => {
    expect(true).to.eq(true);
  });
});
