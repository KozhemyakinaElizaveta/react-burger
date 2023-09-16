Cypress.config("defaultCommandTimeout", 40000);

const BASE_URL = 'http://localhost:3000'

describe('template spec', () => {

    beforeEach(function () {
        cy.visit(BASE_URL);
    });

    it('should open and then close modal', () => {
        cy.get('.buns > div').first().click()
        cy.contains('Детали ингредиента')
        cy.contains('Краторная булка N-200i')
        cy.get('.calories').should('have.text', '420');
        cy.get('.proteins').should('have.text', '80');
        cy.get('.fat').should('have.text', '24');
        cy.get('.carbohydrates').should('have.text', '53');

        cy.get('[class^=modal_icon]').click()
        cy.contains('Детали ингредиента').should('not.exist')


    })

    it('placing an order', () => {
        cy.visit(`${BASE_URL}/login`);
        cy.get('*[class^="login_wrapper"] > div > div > div > input').eq(0).type('898@gmail.com')
        cy.get('*[class^="login_wrapper"] > div > div > div > input').eq(1).type('abcd1234')
        cy.get('button').click()

        cy.get('.buns > div').should("exist");
        cy.get('.buns > div').eq(0).trigger("dragstart");
        cy.get(testIds.constructorContainer).should("exist");
        cy.get(testIds.constructorContainer).trigger("drop");

        cy.get('.buns > div').eq(3).trigger("dragstart");
        cy.get(testIds.constructorContainer).trigger("drop");

        cy.get('.buns > div').eq(6).trigger("dragstart");
        cy.get(testIds.constructorContainer).trigger("drop");

        cy.get('.buns > div').eq(10).trigger("dragstart");
        cy.get(testIds.constructorContainer).trigger("drop");

        cy.get('.order_button').click()
        cy.get('[class^=modal_modal_content]').should("be.visible");
        cy.contains('идентификатор заказа')
        cy.get('[class^=modal_icon]').click()
        cy.contains('идентификатор заказа').should('not.exist')

    });
})

const testIds = {
    constructorContainer: '[class^=burger-constructor_final]',
}