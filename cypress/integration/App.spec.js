/* globals cy */
    
describe ('Test App', () => {

    it ('launches', () => {
      cy.visit ('/');
    });

    // it ('opens with textbooks', () => {
    //   cy.visit('/');
    //   cy.get('[data-cy=textbook-entry]').should('contain', 'textbook-entry');
    // });
  
    it ('check buttons', () => {
      cy.visit ('/');
      cy.get('[data-cy=buttons]').should('contain', 'List a Book');
      
      cy.get('[data-cy=buttons]').should('contain', 'Search Books');
    });

    it('shows submit button when search books button is clicked', () => {
      cy.visit ('/');
      cy.get('Button[arialabel=search]').click({force: true});
      cy.get('Button[arialabel=submit]').should('contain' ,'Submit');
    });


  });