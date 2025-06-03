import logindatatest from '../fixtures/logindatatest.json'

describe('Cenário 1 - Transferência entre contas', () => {
  describe('DADO que o usuário está logado no sistema', () => {
    beforeEach(() => {
      cy.login(logindatatest.username, logindatatest.password)
      cy.screenshot('login_test_screenshots/login_sucesso.png')
    })

    context('QUANDO ele realiza a transferência entre contas', () => {
      beforeEach(() => {
        cy.get('#leftPanel ul li:nth-child(3) a').click()
        cy.get('[id=amount]').click().type(logindatatest.value)
        cy.get('[id=fromAccountId]').select(logindatatest.account)
        cy.get('[id=toAccountId]').select(logindatatest.account)
        cy.get('input[type="submit"]').click()
      })

      it('ENTÃO a transferência é realizada com sucesso', () => {
        cy.get('#showResult > h1').should('have.text', 'Transfer Complete!')
        cy.get('[id=accountResult]').should('contain.text',
          `${logindatatest.value} has been transferred from account ${logindatatest.account} to account ${logindatatest.account}.`)
        cy.screenshot('transfer_screenshots/transfer_sucesso.png')
      })
    })
  })
})

describe('Cenário 2 - Transferência inválida entre contas', () => {
  describe('DADO que o usuário está logado no sistema', () => {
    beforeEach(() => {
      cy.login(logindatatest.username, logindatatest.password)
      cy.screenshot('login_test_screenshots/login_sucesso.png')
    })

    context('QUANDO ele realiza a transferência inválida', () => {
      beforeEach(() => {
        cy.get('#leftPanel ul li:nth-child(3) a').click()
        cy.get('[id=amount]').clear()
        cy.get('[id=fromAccountId]').select(logindatatest.account)
        cy.get('[id=toAccountId]').select(logindatatest.account)
        cy.get('input[type="submit"]').click()
      })

      it('ENTÃO a transferência não é realizada com sucesso', () => {
        cy.get('#showError > p').should('contain.text', 'An internal error has occurred and has been logged.')
        cy.screenshot('transfer_screenshots/transfer_sem_sucesso.png')
      })
    })
  })
})

describe('Cenário 3 - Consulta saldo da conta', () => {
  describe('DADO que o usuário está logado no sistema', () => {
    beforeEach(() => {
      cy.login(logindatatest.username, logindatatest.password)
      cy.screenshot('login_test_screenshots/login_sucesso.png')
    })

    context('QUANDO ele acessa o resumo das contas', () => {
      beforeEach(() => {
        cy.get('#leftPanel > h2').should('have.text', 'Account Services')
      })

      it('ENTÃO o extrato deve aparecer na tela', () => {
        cy.get('#showOverview > h1').should('contain.text', 'Accounts Overview')
        cy.get('#accountTable').should('be.visible').contains(logindatatest.account)
        cy.screenshot('account_overview_screenshots/account_overview_sucesso.png')
      })
    })
  })
})
