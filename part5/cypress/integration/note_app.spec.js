/* eslint-disable no-undef */
describe('Note app', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
    });


    it('front page can be opened', function() {
        cy.contains('Notes');
        cy.contains('Note app, Department of Computer Science, University of Helsinki 2022');
    });

    it('login form can be opened', function() {
        cy.contains('login').click();
        cy.get('#username').type('mluukkai');
        cy.get('#password').type('matti');
        cy.get('#login-button').click();
        //cy.wait(5000);
        cy.contains('Matti Luukkainen logged');
    });
});
//npx cypress verify
//npm run cypress:open


//npx cypress version