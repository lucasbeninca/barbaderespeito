import { generateTestData, formatCPF, formatPhone, formatCEP } from '../../support/utils';
import { selectors } from '../../support/selectors';

describe('Automated Tests - GUI - Register', () => {
    beforeEach(() => {
        const testData = generateTestData();
        Cypress.env('testData', testData);
        cy.visit('auth/register/natural?redirect=%2F');
    });

  it('validate error messages on the registration page with blank', () => {
    cy.get(selectors.name)
      .focus()
      .blur() 
    cy.get(selectors.messageErrorClass)
      .contains('O campo “Nome“ é obrigatório')
      .should('be.visible');
    cy.get(selectors.lastName)
      .focus()
      .blur() 
    cy.get(selectors.messageErrorClass)
      .contains('O campo “Sobrenome“ é obrigatório')
      .should('be.visible')
    cy.get(selectors.dayOfBirth)
      .focus()
      .blur()
    cy.get(selectors.messageErrorClass)
      .contains('O campo “Dia“ é obrigatório')
      .should('be.visible')   
    cy.get(selectors.monthOfBirth)
      .focus()
      .blur()
    cy.get(selectors.messageErrorClass)
      .contains('O campo “Mês“ é obrigatório')
      .should('be.visible')  
    cy.get(selectors.yearOfBirth)
      .focus()
      .blur() 
    cy.get(selectors.messageErrorClass)
      .contains('O campo “Ano“ é obrigatório')
      .should('be.visible')
    cy.get(selectors.cpf)
      .focus()
      .blur() 
    cy.get(selectors.messageErrorClass)
      .contains('O campo “CPF“ é obrigatório')
      .should('be.visible')          
    cy.get(selectors.homePhone)
      .focus()
      .blur()
    cy.get(selectors.messageErrorClass)
      .contains('O campo “DDD e número de celular“ é obrigatório')
      .should('be.visible') 
    cy.get(selectors.zipCode)
      .focus()
      .blur()
    cy.get(selectors.messageErrorClass)
      .contains('O campo “CEP“ é obrigatório')
      .should('be.visible') 
    cy.get(selectors.streetType)
      .focus()
      .blur()
    cy.get(selectors.messageErrorClass)
      .contains('O campo “Tipo de Endereço“ é obrigatório')
      .should('be.visible') 
    cy.get(selectors.streetName)
      .focus()
      .blur() 
    cy.get(selectors.messageErrorClass)
      .contains('O campo “Endereço“ é obrigatório')
      .should('be.visible')
    cy.get(selectors.streetNumber)
      .focus()
      .blur() 
    cy.get(selectors.messageErrorClass)
      .contains('O campo “Número“ é obrigatório')
      .should('be.visible')
    cy.get(selectors.neighborhood)
      .focus()
      .blur()
    cy.get(selectors.messageErrorClass)
      .contains('O campo “Bairro“ é obrigatório')
      .should('be.visible')
    cy.get(selectors.state)
      .focus()
      .blur() 
    cy.get(selectors.messageErrorClass)
      .contains('O campo “Estado“ é obrigatório')
      .should('be.visible')
    cy.get(selectors.city)
      .focus()
      .blur() 
    cy.get(selectors.messageErrorClass)
      .contains('O campo “Cidade“ é obrigatório')
      .should('be.visible')
    cy.get(selectors.email)
      .focus()
      .blur() 
    cy.get(selectors.messageErrorClass)
      .contains('O campo “Seu e-mail“ é obrigatório')
      .should('be.visible')
    cy.get(selectors.passwordInput)
      .focus()
      .blur()
    cy.get(selectors.messageErrorClass)
      .contains('O campo “Senha“ é obrigatório')
      .should('be.visible')     
  });

  it('register on the page', () => {
    const { email, nome, senha, phone, CEP, cpf } = Cypress.env('testData');

    cy.get(selectors.name)
      .type(nome)
      .should('have.value',nome)
    cy.get(selectors.lastName)
      .type('teste')
      .should('have.value','teste')
    cy.get(selectors.dayOfBirth)
      .select('01')
      .should('have.value', '01');
    cy.get(selectors.monthOfBirth)
      .select('Janeiro')
      .invoke('text')
      .should('contain', 'Janeiro');
    cy.get(selectors.yearOfBirth)
      .select('2001')
      .should('have.value', '2001');
    cy.get(selectors.cpf)
      .type(cpf,{log:false})
      .should('have.value', formatCPF(cpf),{log:false})
    cy.get(selectors.homePhone)
      .type(phone)
      .should('have.value',formatPhone(phone),{log:false})
    cy.get(selectors.zipCode)
      .type(CEP)
      .should('have.value',formatCEP(CEP))
    cy.get(selectors.streetType)
      .wait(1000)     // tem um bug do HTML se não usar o  cy.wait para o elemento carregar ele fica em branco.   
      .select('Rua')  // o correto é usar .should(be.visible)
      .should('have.value', 'Rua');
    cy.get(selectors.streetName)
      .type('do comércio')
      .should('have.value','do comércio')
    cy.get(selectors.streetNumber)
      .type('1222')
      .should('have.value','1222')
    cy.get(selectors.neighborhood)
      .type('centro')
      .should('have.value','centro')
    cy.get(selectors.state)
      .select(16)
      .invoke('text')
      .should('contain','Paraná')
    cy.get(selectors.city)
      .type('dois vizinhos')
      .should('have.value','dois vizinhos')
    cy.get(selectors.email)
      .type(email,{log:false})
      .should('have.value',email)
    cy.get(selectors.passwordInput)
      .type(senha,{log:false})
    cy.get(selectors.emailNewsletter)
      .check()
    cy.get(selectors.privacy)
      .check()
    cy.get(selectors.buttonRegister)
      .should('be.visible')
      .click()
    cy.get(selectors.validateLoginSussefull, { timeout: 5000 })
      .should('contain', `Olá,`);      
});
})

