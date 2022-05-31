/* globals cy */
    
describe ('Test App', () => {

    it ('launches', () => {
      cy.visit ('/');
    });

    it ('opens with textbooks', () => {
      cy.visit('/');
      cy.get('[data-cy=book]').should('contain', 'textbook-entry');
    });
  
    it ('check buttons', () => {
      cy.visit ('/');
      cy.get('[data-cy=buttons]').should('contain', 'List a Book');
      
      cy.get('[data-cy=buttons]').should('contain', 'Search Books');
    });

  });