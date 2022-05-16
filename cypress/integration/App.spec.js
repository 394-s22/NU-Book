/* globals cy */
    
describe ('Test App', () => {

    it ('launches', () => {
      cy.visit ('/');
    });

    it ('opens with textbooks', () => {
      cy.visit('/');
      cy.get('[data-cy=book]').should('contain', 'textbook-entry');
    });
  
  });