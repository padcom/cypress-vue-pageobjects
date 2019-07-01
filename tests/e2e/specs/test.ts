/// <reference types="cypress"/>
// https://docs.cypress.io/api/introduction/api.html

interface Scenario<I extends Page, O extends Page> {
  run (entry: I): O
}

class Page {
  run<I extends Page, O extends Page>(scenario: Scenario<I, O>): O {
    // @ts-ignore
    return scenario.run(this)
  }
}

class Component {
  root: any

  constructor (root: any) {
    this.root = root
  }
}

class BasePage extends Page {
  goToHomePage () {
    return new HomePage()
  }
  goToAboutPage () {
    return new AboutPage()
  }
  goToLoginPage () {
    return new LoginPage()
  }
}

class HomePage extends BasePage {
  constructor () {
    super()
    cy.visit('/#/')
  }

  assertContainsPageTitle () {
    cy.contains('h1', 'Welcome to Your Vue.js App')
    return this
  }
}

class AboutPage extends BasePage {
  constructor () {
    super()
    cy.visit('/#/about')
  }

  assertContainsPageTitle () {
    const about = new AboutComponent(cy.get('div.about'))
    about.assertContainsProperHeader()
    return this
  }
}

class LoginPage extends BasePage {
  constructor () {
    super()
    cy.visit('/#/login')
  }

  enterCredentials (username: string, password: string) {
    cy.get('input[name="username"]').type(username)
    cy.get('input[name="password"]').type(password)
    return this
  }

  clickLogin () {
    cy.get('button[name="login"]').click()
    return new HomePage()
  }
}

class AboutComponent extends Component {
  assertContainsProperHeader () {
    this.root.contains('h1', 'This is an about page')
  }
}

class ValidateMainPagesScenario implements Scenario<BasePage, AboutPage> {
  run (entry: BasePage) {
    return entry
      .goToHomePage()
      .assertContainsPageTitle()
      .goToAboutPage()
      .assertContainsPageTitle()
  }
}

class LoginScenario implements Scenario<BasePage, HomePage> {
  private username: string
  private password: string

  constructor () {
    this.username = 'johndoe'
    this.password = 'secret123'
  }

  withUsername (username: string) {
    this.username = username
    return this
  }

  withPassword (password: string) {
    this.password = password
    return this
  }

  run (entry: BasePage) {
    return entry
      .goToLoginPage()
      .enterCredentials(this.username, this.password)
      .clickLogin()
      .assertContainsPageTitle()
  }
}

describe('My First Test', () => {
  it('Validate main pages', () => {
    new HomePage()
      .run(new ValidateMainPagesScenario())
      .run(new LoginScenario().withUsername('janesmith').withPassword('janesecret6645'))
  })
})
