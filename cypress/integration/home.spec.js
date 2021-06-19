import axeTerminalLog from '../support/axeTerminalLog';

describe('Home page', () => {
  it('Page renders', () => {
    cy.visit('/');
    cy.contains('This is Quidditch');

    // check accessibility with Axe
    cy.injectAxe();
    cy.checkA11y(null, null, axeTerminalLog);
  });
});
