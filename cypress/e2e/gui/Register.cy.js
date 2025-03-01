import { generateTestData, formatCPF, formatPhone, formatCEP } from '../../support/utils';

describe('Automated Tests - GUI - Register', () => {
    beforeEach(() => {
        const testData = generateTestData();
        Cypress.env('testData', testData);
        cy.visit('auth/register/natural?redirect=%2F');
    });

    it.skip('register on the page', () => {
        const { email, nome, senha, phone, CEP, cpf } = Cypress.env('testData');

        cy.get('#name')
          .type(nome)
          .should('have.value',nome)
        cy.get('#lastName')
          .type('teste')
          .should('have.value','teste')
        cy.get('#dayOfBirth')
          .select('01')
          .should('have.value', '01');
        cy.get('#monthOfBirth')
          .select('Janeiro')
          .invoke('text')
          .should('contain', 'Janeiro');
        cy.get('#yearOfBirth')
          .select('2001')
          .should('have.value', '2001');
        cy.get('#cpf')
          .type(cpf,{log:false})
          .should('have.value', formatCPF(cpf),{log:false})
        cy.get('#homePhone')
          .type(phone)
          .should('have.value',formatPhone(phone),{log:false})
        cy.get('#zipCode')
          .type(CEP)
          .should('have.value',formatCEP(CEP))
        cy.get('#streetType')
          .wait(1000)     // tem um bug do HTML se não usar o  cy.wait para o elemento carregar ele fica em branco.   
          .select('Rua')  // o correto é usar .should(be.visible)
          .should('have.value', 'Rua');
        cy.get('#streetName')
          .type('do comércio')
          .should('have.value','do comércio')
        cy.get('#streetNumber')
          .type('1222')
          .should('have.value','1222')
        cy.get('#neighborhood')
          .type('centro')
          .should('have.value','centro')
        cy.get('#state')
          .select(16)
          .invoke('text')
          .should('contain','Paraná')
        cy.get('#city')
          .type('dois vizinhos')
          .should('have.value','dois vizinhos')
        cy.get('#email')
          .type(email,{log:false})
          .should('have.value',email)
        cy.get('#password')
          .type(senha,{log:false})
        cy.get('#emailNewsletter')
          .check()
        cy.get('#privacy')
          .check()
        cy.get('[qa-auto="gift-wrapping-select-button"]')
          .should('be.visible')
          .click()
        cy.get('.user__content', { timeout: 5000 })
          .should('contain', `Olá,`);      
    });


  it('validate error messages on the registration page', () => {
    cy.get('#name')
      .focus()
      .blur() 
    cy.get('.errorMessage')
      .contains('O campo “Nome“ é obrigatório')
      .should('be.visible');
    cy.get('#lastName')
      .focus()
      .blur() 
    cy.get('.errorMessage')
      .contains('O campo “Sobrenome“ é obrigatório')
      .should('be.visible')
    cy.get('#dayOfBirth')
      .focus()
      .blur()
    cy.get('.errorMessage')
      .contains('O campo “Dia“ é obrigatório')
      .should('be.visible')   
    cy.get('#monthOfBirth')
      .focus()
      .blur()
    cy.get('.errorMessage')
      .contains('O campo “Mês“ é obrigatório')
      .should('be.visible')  
    cy.get('#yearOfBirth')
      .focus()
      .blur() 
    cy.get('.errorMessage')
      .contains('O campo “Ano“ é obrigatório')
      .should('be.visible')
    cy.get('#cpf')
      .focus()
      .blur() 
    cy.get('.errorMessage')
      .contains('O campo “CPF“ é obrigatório')
      .should('be.visible')          
    cy.get('#homePhone')
      .focus()
      .blur()
    cy.get('.errorMessage')
      .contains('O campo “DDD e número de celular“ é obrigatório')
      .should('be.visible') 
    cy.get('#zipCode')
      .focus()
      .blur()
    cy.get('.errorMessage')
      .contains('O campo “CEP“ é obrigatório')
      .should('be.visible') 
    cy.get('#streetType')
      .focus()
      .blur()
    cy.get('.errorMessage')
      .contains('O campo “Tipo de Endereço“ é obrigatório')
      .should('be.visible') 
    cy.get('#streetName')
      .focus()
      .blur() 
    cy.get('.errorMessage')
      .contains('O campo “Endereço“ é obrigatório')
      .should('be.visible')
    cy.get('#streetNumber')
      .focus()
      .blur() 
    cy.get('.errorMessage')
      .contains('O campo “Número“ é obrigatório')
      .should('be.visible')
    cy.get('#neighborhood')
      .focus()
      .blur()
    cy.get('.errorMessage')
      .contains('O campo “Bairro“ é obrigatório')
      .should('be.visible')
    cy.get('#state')
      .focus()
      .blur() 
    cy.get('.errorMessage')
      .contains('O campo “Estado“ é obrigatório')
      .should('be.visible')
    cy.get('#city')
      .focus()
      .blur() 
    cy.get('.errorMessage')
      .contains('O campo “Cidade“ é obrigatório')
      .should('be.visible')
    cy.get('#email')
      .focus()
      .blur() 
    cy.get('.errorMessage')
      .contains('O campo “Seu e-mail“ é obrigatório')
      .should('be.visible')
    cy.get('#password')
      .focus()
      .blur()
    cy.get('.errorMessage')
      .contains('O campo “Senha“ é obrigatório')
      .should('be.visible') 

    // cy.get('#emailNewsletter')
    // cy.get('#privacy')

    
    // cy.get('[qa-auto="gift-wrapping-select-button"]')
    //   .should('be.visible')
    //   .click()
    



    
  });

  it.skip('You must add a product to the cart and check the subtotal', () => {
      
  });

  it.skip('You must complete an order using PIX', () => {
      
  });
})

